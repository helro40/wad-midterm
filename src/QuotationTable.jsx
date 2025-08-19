import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  Box,
  TableFooter,
} from "@mui/material";
import { BsFillTrashFill } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";

function QuotationTable({ data, deleteByIndex, clearAll }) {
  if (!data || data.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Quotation
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <CiShoppingCart size={24} />
          <Typography>No items</Typography>
        </Box>
      </Container>
    );
  }

  const totalAmount = data.reduce(
    (acc, v) => acc + v.qty * v.ppu - v.discount,
    0
  );
  const totalDiscount = data.reduce((acc, v) => acc + parseFloat(v.discount || 0), 0);

  const handleDelete = (index) => {
    deleteByIndex(index);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Quotation</Typography>
        <Button variant="outlined" startIcon={<MdClear />} onClick={clearAll}>
          Clear
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell>Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((v, i) => (
              <TableRow key={i}>
                <TableCell align="center">
                  <IconButton color="error" onClick={() => handleDelete(i)}>
                    <BsFillTrashFill />
                  </IconButton>
                </TableCell>
                <TableCell align="center">{v.qty}</TableCell>
                <TableCell>{v.item}</TableCell>
                <TableCell align="center">{v.ppu}</TableCell>
                <TableCell align="center">{v.discount}</TableCell>
                <TableCell align="right">
                  {v.qty * v.ppu - v.discount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <strong>Total Discount</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{totalDiscount}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <strong>Total</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{totalAmount}</strong>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default QuotationTable;
