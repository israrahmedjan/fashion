


const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
export async function SingleProductBySlug(slug="blue_dress") {
   
    try {
console.log("Products by filter", slug)
  const queryString = new URLSearchParams({
       slug: slug,
    }).toString();

  const response = await fetch(`${domain}/api/products/singleproduct?${queryString}`);

    //Agar response theek nahi hai (e.g. 404, 500)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

   const data = await response.json();
    console.log('variations:', data);
   return data.data;
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
}

export async function searchProducts(name="Mens",category="cosmetics") {
   
    try {
//console.log("Products by filter", slug)
  const queryString = new URLSearchParams({
       name: name,
       category:category
    }).toString();

  const response = await fetch(`${domain}/api/products/searchproduct?${queryString}`);

    //Agar response theek nahi hai (e.g. 404, 500)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
      
    }

   const data = await response.json();
    console.log('variations:', data);
   return data.data;
  } catch (error) {
    
    return [];
   // console.error('Error fetching posts:', error.message);
  }
}
