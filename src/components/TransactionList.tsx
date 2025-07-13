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
import { FunctionComponent } from "react";

interface Props {}

const TransactionList: FunctionComponent<Props> = (props: Props) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>text</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              onClick={() => {
                console.log("Row clicked ");
              }}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={100} // Replace with actual count of transactions
        rowsPerPage={5}
        page={1} // Replace with actual current page
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Paper>
  );
};

export default TransactionList;
