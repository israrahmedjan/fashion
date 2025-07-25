const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;

export async function userSignUp( data ) {
  try {
    console.log("Data is", data);

    const response = await fetch(`${domain}/api/user/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Response:', result);
    return result;
    
  } catch (error) {
    console.error('Error during user signup:', error.message);
  }
}



export async function userSignIn( data ) {
  try {
   // console.log("Data is", data);

    const response = await fetch(`${domain}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('User login:', result);
    return result;
    
  } catch (error) {
    console.error('Error during user signup:', error.message);
  }
}


export async function isUserLogin() {
  try {
   // console.log("Data is", data);

  const response = await fetch(`${domain}/api/user/me`, {
      method: 'POST',
      // credentials: 'include', // if using cookies/session auth
      // headers: {
      //   'Content-Type': 'application/json',
      //   // 'Authorization': `Bearer ${token}`  // if using token-based auth
      // }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('User login:', result);
    return result;
    
  } catch (error) {
    console.error('Error during user signup:', error.message);
  }
}


export async function userLogout() {
  try {
   // console.log("Data is", data);

  const response = await fetch(`${domain}/api/user/logout`, {
      method: 'GET',
      // credentials: 'include', // if using cookies/session auth
      // headers: {
      //   'Content-Type': 'application/json',
      //   // 'Authorization': `Bearer ${token}`  // if using token-based auth
      // }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('User login:', result);
    return result;
    
  } catch (error) {
    console.error('Error during user signup:', error.message);
  }
}


// Add Customer Data 

export async function addCustomer( data ) {
  try {
    console.log("Data is", data);

    const response = await fetch(`${domain}/api/user/addcustomer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Customer data:', result);
    return result;
    
  } catch (error) {
    console.error('Error during user signup:', error.message);
  }
}


export async function myOrdersAPI(email) {
  try {
    console.log("Data is", email);

    const response = await fetch(`${domain}/api/user/myOrders?email=${encodeURIComponent(email)}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('my orders data:', result.data);
    return result.data;

  } catch (error) {
   // console.error('Error during fetching orders:', error.message);
    //return data[0];
  }
}
