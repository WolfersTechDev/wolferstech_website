import { useEffect, useState } from "react";
import checkAuth from "./utils/AuthHelper";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";
import Logincheck from "../../components/admin/Logincheck";
import axios from "axios";

function Add_and_manage_clint() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const history = useNavigate();
  const tocken = localStorage.getItem("login_tocken");

  const handlegotoaddclint = () => {
    history("/add_client");
  };
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
      const response = await axios.get(
        "http://localhost:4000/admin/api/get_clint",
        {
          headers: {
            Authorization: tocken,
          },
        }
      );
      setData(response.data.usersWithImageUrls);
    };
    fetch_index();
  }, [tocken]);

  return (
    <div>
      {isAuthenticated ? (
        <div className="flex">
          <SideBar index_pass={3} />
          <div className="h-screen flex-1 p-7">
            <div className="bg-white shadow-md rounded-md w-full">
              <div className="p-4">
                <header className="bg-gray-800 text-white w-full p-4 text-center">
                  <h1 className="text-2xl font-bold">Add and Remove Client</h1>
                  <button
                    onClick={handlegotoaddclint}
                    className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
                  >
                    Add Client
                  </button>
                </header>
                <div className="mt-1">
                  <table className="w-full border-collapse border">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Domain</th>
                        <th>Email Id</th>
                        <th>Contact Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                  <img
                                    src={item.clint_logo}
                                    alt="Avatar Tailwind CSS Component"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{item.name}</div>
                                <div className="text-sm opacity-50">
                                  Chennai
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{item.Domain}</td>
                          <td>{item.email}</td>
                          <td>{item.contact}</td>
                        </tr>
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

export default Add_and_manage_clint;
