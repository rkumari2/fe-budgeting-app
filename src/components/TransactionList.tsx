import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  ButtonGroup,
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
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import SearchBar from "./SearchBar";

interface Props {
  transactionData: Transaction[] | undefined;
}

const TransactionList: FunctionComponent<Props> = ({ transactionData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

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

  const handleClickOpen = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedTransaction(null);
  };

  const handleDeleteClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <SearchBar
          placeholder="Search transactions"
          value={searchValue}
          onChange={(val) => {
            setSearchValue(val);
            setPage(0);
          }}
        />
        <TableContainer sx={{ height: 230, overflow: "auto" }}>
          <Table stickyHeader aria-label="transaction table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Note</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {transaction.type === "income" ? "+" : "-"}£
                    {transaction.amount}
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.note}</TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Button
                        variant="outlined"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClickOpen(transaction);
                        }}
                        size="small"
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteClick(transaction)}
                        size="small"
                      >
                        <DeleteIcon />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
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
      </Box>

      <EditDialog
        open={open}
        handleClose={handleClose}
        transaction={selectedTransaction}
      />

      <DeleteDialog
        open={deleteOpen}
        handleClose={handleDeleteClose}
        transaction={selectedTransaction}
      />
    </>
  );
};

export default TransactionList;
