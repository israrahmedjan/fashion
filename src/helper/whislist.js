import { removeWishListItemSlice } from "@/redux/slices/userSlice";

const addToWishlist = (product) => {
    // Get existing wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  
    // Check if product is already in wishlist
    const isAlreadyInWishlist = wishlist.some((item) => item.productId === product.productId);
  
    if (!isAlreadyInWishlist) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to wishlist!");
    } else {
      alert("Product is already in wishlist.");
    }
  };
  
  const getWishlist = () => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem("wishlist");
        return data ? JSON.parse(data) : [];
      }
      return [];
  };
  const removeFromWishlist = (dispatch,productId) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter((item) => item.productId !== productId);
    console.log(wishlist);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
   dispatch(removeWishListItemSlice(productId))
    alert("Removed from wishlist!");
  };
export { getWishlist,addToWishlist,removeFromWishlist}  