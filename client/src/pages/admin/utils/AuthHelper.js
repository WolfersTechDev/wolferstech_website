// src/utils/AuthHelper.js

const checkAuth = async () => {
  const tocken = localStorage.getItem('login_tocken')
    try {
      const response = await fetch('http://localhost:4000/admin/api/check-auth', {
        method: 'GET',
        headers: {
          'Authorization': tocken,
        },
      });
  
      if (!response.ok) {
        throw new Error('Not authenticated');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      return { isAuthenticated: false };
    }
  };
  
  export default checkAuth;