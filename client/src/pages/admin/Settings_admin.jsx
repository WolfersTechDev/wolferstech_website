import { useEffect, useState } from 'react';
import checkAuth from './utils/AuthHelper';
import SideBar from '../../components/admin/SideBar';
import Logincheck from '../../components/admin/Logincheck';

function Settings_admin() {
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
            index_pass={4}
            />
            <div className='h-screen flex-1 p-7'>
              <h1 className='text-2xl'>Settings page for admin</h1>
            </div>
          </div>

        ) : (
          // Redirect or display a message for unauthenticated users
          <Logincheck/>
        )}
      </div>
    );
}

export default Settings_admin