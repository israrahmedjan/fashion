


const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
export async function productsByFilter(filter) {
   
    try {
console.log("Products by filter", filter)
  const queryString = new URLSearchParams({
       filter: JSON.stringify(filter),
    }).toString();

  const response = await fetch(`/api/category/categoryFilter?${queryString}`);

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
