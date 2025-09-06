import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteApi } from "../api/api";
import { Transaction } from "../types/transactions";

interface Props {
  open: boolean;
  handleClose: () => void;
  transaction: Transaction | null;
}

export default function DeleteDialog({
  open,
  handleClose,
  transaction,
}: Props) {
  const deleteMutation = useDeleteApi("transactions");
  const queryClient = useQueryClient();
  const theme = useTheme();

  const isSubmitting = deleteMutation.status === "pending";

  const handleDelete = () => {
    if (!transaction) return;
    deleteMutation.mutate(String(transaction.id), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        handleClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ backgroundColor: theme.palette.background.default }}>
        Delete Transaction
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
      <DialogContent
        dividers
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <DialogContentText
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          Are you sure you want to delete the transaction{" "}
          <strong>{transaction?.category}</strong> of{" "}
          <strong>£{transaction?.amount}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Button
          onClick={handleClose}
          disabled={isSubmitting}
          sx={{ fontWeight: "bold" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          disabled={isSubmitting}
          sx={{
            color: theme.palette.customColors.buttonText,
            fontWeight: "bold",
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
