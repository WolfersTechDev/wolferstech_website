import { useEffect, useState } from "react";
import checkAuth from "./utils/AuthHelper";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";
import Logincheck from "../../components/admin/Logincheck";
import axios from "axios";

function Write_blog_admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const history = useNavigate();
  const tocken = localStorage.getItem("login_tocken");

  const handlegotoaddclint = () => {
    history("/add_blog");
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
        "http://localhost:4000/admin/api/get_blog",
        {}
      );
      setData(response.data.usersWithImageUrls);
    };
    fetch_index();
  }, [tocken]);

  return (
    <div>
      {isAuthenticated ? (
        <div className="flex">
          <SideBar index_pass={6} />
          <div className="h-screen flex-1 p-7">
            <div className="p-4">
              <header className="bg-gray-800 text-white p-4 text-center">
                <h1 className="text-2xl font-bold">Add Blog</h1>
                <button
                  onClick={handlegotoaddclint}
                  className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
                >
                  Add Blog
                </button>
              </header>
              <div className="container mx-auto">
                <table className=" min-w-full border-collapse border">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                         Cover Image
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        Content
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <img
                            src={item.blog_cover_imgs}
                            alt={`Image for ${item.title}`}
                            className="h-28 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {item.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-600">
                            {item.contant}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default Write_blog_admin;
