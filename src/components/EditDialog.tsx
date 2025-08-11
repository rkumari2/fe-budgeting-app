import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import * as React from "react";
import { useDeleteApi, useMutateApi } from "../api/api";
import { Transaction } from "../types/transactions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface Props {
  open: boolean;
  handleClose: () => void;
  transaction: Transaction | null;
}

export default function EditDialog({ open, handleClose, transaction }: Props) {
  const [formData, setFormData] = React.useState<Transaction | null>(
    transaction
  );
  const queryClient = useQueryClient();

  React.useEffect(() => {
    setFormData(transaction);
  }, [transaction]);

  const updateMutation = useMutateApi<Transaction>("transactions");
  const deleteMutation = useDeleteApi("transactions");

  const isSubmitting =
    updateMutation.status === "pending" || deleteMutation.status === "pending";

  const handleChange = (field: keyof Transaction, value: string | number) => {
    if (!formData) return;
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    if (newDate) {
      handleChange("date", newDate.format("YYYY-MM-DD"));
    }
  };

  const handleSave = () => {
    if (formData && transaction) {
      updateMutation.mutate(
        { id: String(transaction.id), data: formData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            handleClose();
          },
        }
      );
    }
  };

  const handleDelete = () => {
    if (
      transaction &&
      window.confirm("Are you sure you want to delete this transaction?")
    ) {
      deleteMutation.mutate(String(transaction.id), {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
          handleClose();
        },
      });
    }
  };

  return (
    <BootstrapDialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        Edit Transaction
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {formData ? (
          <Stack direction="column" gap={3}>
            <TextField
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={(e) =>
                handleChange("amount", parseFloat(e.target.value))
              }
              fullWidth
              disabled={isSubmitting}
            />

            <FormControl fullWidth disabled={isSubmitting}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => handleChange("category", e.target.value)}
              >
                {[
                  "travel",
                  "food",
                  "entertainment",
                  "bills",
                  "shopping",
                  "other",
                ].map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Note"
              value={formData.note}
              onChange={(e) => handleChange("note", e.target.value)}
              fullWidth
              disabled={isSubmitting}
            />

            <FormControl fullWidth disabled={isSubmitting}>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => handleChange("type", e.target.value)}
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>

            <DatePicker
              label="Date"
              value={dayjs(formData.date)}
              onChange={handleDateChange}
              format="YYYY-MM-DD"
              disabled={isSubmitting}
            />
          </Stack>
        ) : (
          <Typography>No transaction selected</Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button color="error" onClick={handleDelete} disabled={isSubmitting}>
          Delete
        </Button>
        <Stack direction="row" gap={1}>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isSubmitting}
          >
            Save changes
          </Button>
        </Stack>
      </DialogActions>
    </BootstrapDialog>
  );
}
