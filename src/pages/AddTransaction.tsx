import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { FunctionComponent, useState } from "react";
import { usePostApi } from "../api/api";
import { AddTransactionData } from "../types/transactions";

const getInitialFormData = (): AddTransactionData => ({
  amount: 0,
  category: "other",
  note: "",
  type: "expense",
  date: dayjs().format("YYYY-MM-DD"),
});

const AddTransaction: FunctionComponent = () => {
  const [formData, setFormData] = useState<AddTransactionData>(
    getInitialFormData()
  );

  const mutation = usePostApi<AddTransactionData>("transactions");
  const isSubmitting = mutation.status === "pending";

  const handleChange = (
    field: keyof AddTransactionData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    if (newDate) {
      handleChange("date", newDate.format("YYYY-MM-DD"));
    }
  };

  const handleSubmit = () => {
    mutation.mutate(formData, {
      onSuccess: () => setFormData(getInitialFormData()),
    });
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      width="100%"
      padding={2}
      gap={4}
    >
      <Typography variant="h6">Add Transaction</Typography>

      <TextField
        label="Amount"
        type="number"
        value={formData.amount}
        onChange={(e) => handleChange("amount", parseFloat(e.target.value))}
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

      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        variant="contained"
        color="primary"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>

      {mutation.isError && (
        <Typography color="error">Failed to add transaction.</Typography>
      )}
      {mutation.isSuccess && (
        <Typography color="success.main">Transaction added!</Typography>
      )}
    </Stack>
  );
};

export default AddTransaction;
