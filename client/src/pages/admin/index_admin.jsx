import { useEffect, useState } from "react";
import checkAuth from "./utils/AuthHelper";
import SideBar from "../../components/admin/SideBar";
import Logincheck from "../../components/admin/Logincheck";

function Index_admin() {
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
        <div className="flex">
          <SideBar index_pass={0} />
          <div className="h-screen flex-1 p-7">
            <div className="bg-white shadow-md rounded-md p-4 w-full">
              {/* You can add your card content here */}
              <div className="flex items-center justify-center">
                <div className="bg-gray-100 shadow-md rounded-md p-4">
                  {/* Card content */}
                  <h2 className="text-xl p-4 font-semibold mb-2">
                    Edit Title in home page
                  </h2>
                  <form>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="input1"
                      >
                        main Text
                      </label>
                      <input
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-400"
                        type="text"
                        id="input1"
                        placeholder="Enter value for input 1"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="input2"
                      >
                        Different colour text
                      </label>
                      <input
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-400"
                        type="text"
                        id="input2"
                        placeholder="Enter value for input 2"
                      />
                    </div>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                      Submit
                    </button>
                  </form>
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

export default Index_admin;
