import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";

// Child Component
const ProductItem = memo(({ product, removeProduct }) => {
  return (
    <li>
      {product.name} - ₹{product.price}
      <button onClick={() => removeProduct(product.id)}>
        Remove
      </button>
    </li>
  );
});

function ProductSearch() {
  // useState
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mouse", price: 500 },
    { id: 3, name: "Keyboard", price: 1500 },
    { id: 4, name: "Monitor", price: 12000 },
    { id: 5, name: "Headphones", price: 2500 },
  ]);

  const [searchText, setSearchText] = useState("");

  // useRef
  const searchInputRef = useRef(null);

  // useEffect
  useEffect(() => {
    document.title = `Search: ${searchText}`;
  }, [searchText]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [products, searchText]);

  // useMemo - total price of displayed products
  const totalPrice = useMemo(() => {
    console.log("Calculating total price...");
    return filteredProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );
  }, [filteredProducts]);

  // useCallback
  const removeProduct = useCallback((id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  }, []);

  // Focus input field
  const focusSearchInput = () => {
    searchInputRef.current.focus();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Search and Price Calculator</h2>

      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search Product"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <button onClick={focusSearchInput}>
        Focus Search Box
      </button>

      <h3>Total Price of Displayed Products: ₹{totalPrice}</h3>

      <ul>
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            removeProduct={removeProduct}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProductSearch;