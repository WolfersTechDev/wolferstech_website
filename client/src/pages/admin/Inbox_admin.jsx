/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import checkAuth from "./utils/AuthHelper";
import SideBar from "../../components/admin/SideBar";
import Logincheck from "../../components/admin/Logincheck";
import axios from 'axios';
import Admin_Tablecomponent from "../../components/admin/admin_tablecomponent";

function Inbox_admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const tocken = localStorage.getItem('login_tocken')

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authData = await checkAuth();
      setIsAuthenticated(authData.isAuthenticated);
    };

    fetchAuthStatus();
  }, []);

  useEffect(() => {
    // Fetch data from your API
    const fetch_index = async () => {
      const response = await axios.get('http://localhost:4000/admin/api/inbox_get', {
        headers: {
          'Authorization': tocken,
        },
      },
      );
      setData(response.data.All_inbox)
    };
    fetch_index()
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div className="flex">
          <SideBar index_pass={1} />
          <div className="h-screen flex-1 p-7">
            <div className="bg-white shadow-md rounded-md p-4 w-full">
              <div className="flex items-center justify-center mt-8">
                <div className="w-full lg:w-3/4">
                  <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Mobile Number</th>
                        <th className="px-4 py-2 text-left">Email Id</th>
                        <th className="px-4 py-2 text-left">Contant</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <Admin_Tablecomponent key={index} item={item} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Redirect or display a message for unauthenticated users
        <Logincheck />
      )}
    </div>
  );
}

export default Inbox_admin;
