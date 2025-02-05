'use client';
import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { getCategories } from "@/helper/helper";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery, selectedCategory) => {
      if(!searchQuery) return;
      console.log("Searching for:", selectedCategory);
      try {
        setLoading(true);
        const response = await axios.get('/api/search', {
          params: { search: searchQuery, category: selectedCategory },
        });
        console.log(response.data);
        setProducts(response.data.data);
      } catch (error) {
        setError(error.message || 'Server Error');
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Input change event handler
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value, selectedCategory);
  };

  // Product click event handler
  const handleProductClick = (productName) => {
    setQuery(productName); // Input field ko update karo
    setProducts([]); // Search results ko hide kar do
  };

  // Get Categories setting
  const handelCategory = useCallback(async () => {
    const category = await getCategories();
    setCategory(category);
    console.log("Category List", category);
  }, []);

  useEffect(() => {
    handelCategory();
  }, [handelCategory]);

  // Trigger search when category changes
  useEffect(() => {
    debouncedSearch(query, selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col justify-center">
      <h1>Search Bar</h1>
      {category.length !== 0 && (
        <select
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>Select a category</option>
          {category.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      )}
      {selectedCategory && (
        <p className="text-green-600 mt-2">Selected: {selectedCategory}</p>
      )}

      <input
        type="text"
        placeholder="Search here..."
        value={query}
        onChange={handleInputChange}
        className="border-gray-700 border p-2"
      />
      {error && <div className="text-red-500">{error}</div>}

      {/* Products List */}
      {products.length > 0 && (
        <div className="border border-gray-300 mt-2 rounded-md shadow-md">
          {products.map((prod, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleProductClick(prod.name)}
            >
              {prod.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;