import { useState, useRef } from "react";
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  const addItem = () => {
    const selectedProduct = products.find((v) => itemRef.current.value === v.code);

    const newItem = {
      item: selectedProduct.name,
      ppu: parseFloat(ppuRef.current.value),
      qty: parseInt(qtyRef.current.value),
      discount: parseFloat(discountRef.current.value) || 0,
    };
    const existingItemIndex = dataItems.findIndex(
      (v) => v.item === newItem.item && v.ppu === newItem.ppu
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...dataItems];
      updatedItems[existingItemIndex]={
        ...updatedItems[existingItemIndex],
        qty: updatedItems[existingItemIndex].qty + newItem.qty,
        discount: updatedItems[existingItemIndex].discount + newItem.discount,
      };
      setDataItems(updatedItems);
    } else {
      setDataItems([...dataItems, newItem]);
    }
  };



  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const productChange = () => {
    const item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  const clearAll = () => {
    setDataItems([]);
    setPpu(products[0].price);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} sx={{ backgroundColor: "#e4e4e4", p: 2, borderRadius: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Item</InputLabel>
            <Select
              defaultValue={products[0].code}
              inputRef={itemRef}
              label="Item"
              onChange={productChange}
            >
              {products.map((p) => (
                <MenuItem key={p.code} value={p.code}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Price Per Unit"
            type="number"
            inputRef={ppuRef}
            value={ppu}
            onChange={() => setPpu(ppuRef.current.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Quantity"
            type="number"
            inputRef={qtyRef}
            defaultValue={1}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Discount"
            type="number"
            inputRef={discountRef}
            defaultValue={0}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2 }} />

          <Button variant="contained" fullWidth onClick={addItem}>
            Add
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <QuotationTable 
          data={dataItems} 
          deleteByIndex={deleteByIndex}
          clearAll={clearAll} 
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
