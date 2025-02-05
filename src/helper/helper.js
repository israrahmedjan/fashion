import React from 'react'
import axios from 'axios';
async function getCategories() {

  const response = await axios.get('/api/categories');
  return response.data.data;
}




  export {getCategories}