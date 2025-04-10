import { addcartItems,removeCartItemSlice } from "@/redux/slices/cartSlice";


const addToCart = (dispatch,product) => {
    // Get existing Cart from localStorage
    let Cart = JSON.parse(localStorage.getItem("Cart")) || [];
  
    // Check if product is already in Cart
    const isAlreadyInCart = Cart.some((item) => item.productId === product.productId);
  
    if (!isAlreadyInCart) {
      Cart.push(product);
      localStorage.setItem("Cart", JSON.stringify(Cart));

      alert("Added to Cart!");
      dispatch(addcartItems(product));
    } else {
      alert("Product is already in Cart.");
    }
  };
  
  const getCart = () => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem("Cart");
        return data ? JSON.parse(data) : [];
      }
      return [];
  };
  const removeFromCart = (dispatch,productId) => {
    let Cart = JSON.parse(localStorage.getItem("Cart")) || [];
    Cart = Cart.filter((item) => item.productId !== productId);
    console.log(Cart);
    localStorage.setItem("Cart", JSON.stringify(Cart));
   dispatch(removeCartItemSlice(productId))
    alert("Removed from Cart!");
  };



export { getCart,addToCart,removeFromCart}  