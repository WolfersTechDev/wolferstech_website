import { useEffect, useState } from "react";
import checkAuth from "./utils/AuthHelper";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";
import axios from 'axios';
import Logincheck from "../../components/admin/Logincheck";

function Create_admin() {
  const [username, setUsername] = useState("");
  const [ID, setId] = useState("")
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const HandleCreate_admin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/admin/api/create_admin', {
        id: ID,
        username,
        password,
      });

      if (response.status === 200) {
        setMessage('Login successful');
        history('/admin');
        // Perform any action on successful login (e.g., redirect to another page)
      } else {
        setMessage('Login failed');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

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
        <div className="flex">
          <SideBar index_pass={2} />
          <div className="h-screen flex-1 p-7">
          <div className="bg-white shadow-md rounded-md p-4 w-full">
            <div className="m-auto p-8 bg-gray-300 rounded shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Create Admin Account</h2>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="ID"
                    className="block font-bold mb-2"
                  >
                    Id
                  </label>
                  <input
                    type="text"
                    id="ID"
                    className="w-full p-2 border rounded"
                    value={ID}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block font-bold mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="w-full p-2 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="bg-blue-500 text-white p-2 rounded w-full"
                  onClick={HandleCreate_admin}
                >
                  Create Admin User
                </button>
                <p className="mt-2 text-red-500">{message}</p>
              </form>
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

export default Create_admin;
