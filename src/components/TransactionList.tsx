import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { FunctionComponent, useMemo, useState } from "react";
import { Transaction } from "../types/transactions";
import SearchBar from "./SearchBar";

interface Props {
  transactionData: Transaction[] | undefined;
}

const TransactionList: FunctionComponent<Props> = ({ transactionData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredTransactions = useMemo(() => {
    if (!transactionData) return [];
    const lower = searchValue.toLowerCase();

    return transactionData.filter((t) =>
      [
        t.category,
        t.note,
        t.amount.toString(),
        t.type,
        new Date(t.date).toLocaleDateString(),
      ]
        .join(" ")
        .toLowerCase()
        .includes(lower)
    );
  }, [transactionData, searchValue]);

  const pagedTransactions = useMemo(() => {
    return filteredTransactions.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredTransactions, page, rowsPerPage]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <SearchBar
        placeholder="Search transactions"
        value={searchValue}
        onChange={(val) => {
          setSearchValue(val);
          setPage(0);
        }}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="transaction table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                onClick={() => {
                  console.log("Row clicked", transaction);
                }}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {transaction.type === "income" ? "+" : "-"}£
                  {transaction.amount}
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={filteredTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TransactionList;
