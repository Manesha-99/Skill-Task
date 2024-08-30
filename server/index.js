import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT;

//--------HardCoded Data-----------------

const products = [
  { id: 1, name: "Product ex_1", category: "Category_1" },
  { id: 2, name: "Product ex_2", category: "Category_1" },
  { id: 3, name: "Product ex_3", category: "Category_2" },
  { id: 4, name: "Product ex_4", category: "Category_2" },
  { id: 5, name: "Product ex_5", category: "Category_3" },
  { id: 6, name: "Product ex_6", category: "Category_3" },
  { id: 7, name: "Product ex_7", category: "Category_4" },
  { id: 8, name: "Product ex_8", category: "Category_4" },
];

const categories = ["Category_1", "Category_2", "Category_3", "Category_4"];

//------------------------End Points-------------------------

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/api/categories", (req, res) => {
  res.status(200).json(categories);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
