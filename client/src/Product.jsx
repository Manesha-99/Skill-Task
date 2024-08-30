import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const [productsResponse, categoryResponse] = await Promise.all([
          axios.get("http://localhost:3001/api/products"),
          axios.get("http://localhost:3001/api/categories"),
        ]);
        setProducts(productsResponse.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchItem(event.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="bg-slate-300 min-h-screen">
      <div className="flex flex-col justify-center">
        <div className="bg-slate-600 p-4 rounded-lg max-w-[600px] w-full mx-auto m-4">
          <h1 className="text-white text-center text-[30px] p-4">
            Shopping Cart
          </h1>
        </div>
        <div className="bg-slate-600 p-4 rounded-lg max-w-[600px] w-full mx-auto m-4 ">
          <input
            type="text"
            placeholder="Search Products...."
            className="rounded-lg p-4 max-w-[250px] w-full text-center "
            value={searchItem}
            onChange={handleSearchChange}
          />
          <select
            className="rounded-lg max-w-[250px] w-full p-4 ml-[60px] text-center cursor-pointer"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option className="bg-slate-300" value="">
              All Categories
            </option>
            {categories.map((category, index) => (
              <option className="bg-slate-300" key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                className="bg-slate-500 p-2 rounded-lg max-w-[600px] w-full mx-auto m-4 text-center text-white"
                key={product.id}
              >
                <h2 className="text-[30px]">{product.name}</h2>
                <p className="text-[20px]">Category: {product.category}</p>
                <p className="text-[18px] mt-2">Price: ${product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-[25px] text-red-700 text-center mt-4">
              No Products Found..
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
