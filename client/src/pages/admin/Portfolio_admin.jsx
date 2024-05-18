import { useEffect, useState } from 'react';
import checkAuth from './utils/AuthHelper';
import SideBar from '../../components/admin/SideBar';
import Logincheck from '../../components/admin/Logincheck';

function Portfolio_admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const fetchAuthStatus = async () => {
        const authData = await checkAuth();
        setIsAuthenticated(authData.isAuthenticated);
      };
  
      fetchAuthStatus();
    }, []);
  
    return (
      <div>
        {isAuthenticated ? (
          <div className='flex'>
            <SideBar
            index_pass={5}
            />
            <div className='h-screen flex-1 p-7'>
              <h1 className='text-2xl'>Add Portfilio for admin</h1>
            </div>
          </div>

        ) : (
          // Redirect or display a message for unauthenticated users
          <Logincheck/>
        )}
      </div>
    );
}

export default Portfolio_admin