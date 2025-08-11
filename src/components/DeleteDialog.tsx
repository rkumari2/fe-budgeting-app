import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
      <DialogTitle>Delete Transaction</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the transaction{" "}
          <strong>{transaction?.category}</strong> of £{transaction?.amount}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
