import axios from "axios";
import { useEffect, useState } from "react";
import checkAuth from "./utils/AuthHelper";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";
import Logincheck from "../../components/admin/Logincheck";

function Add_blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cover_img, setCover_img] = useState("");
  const history = useNavigate();

  const tocken = localStorage.getItem("login_tocken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authData = await checkAuth();
      setIsAuthenticated(authData.isAuthenticated);
    };

    fetchAuthStatus();
  }, []);

  const handleSubmit = async ( event ) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("contant", content);
    formData.append("blog_cover_imgs", cover_img);
    try {
      const response = await axios.post(
        "http://localhost:4000/admin/api/add_blog",
        formData,
        {
          headers: {
            Authorization: tocken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        history("/admin_blog");
      } else {
        console.log("error in saving data");
      }
    } catch (error) {
      console.log({ error: error });
    }
  };
  return (
    <div>
      {isAuthenticated ? (
        <div className="flex">
          <SideBar index_pass={6} />
          <div className="flex h-screen bg-gray-200">
            <div className="max-w-md mx-auto mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                Create a New Blog Post
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="block font-medium mb-1">
                    Content
                  </label>
                  <textarea
                    id="content"
                    rows="6"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="block font-medium mb-1">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-info w-full max-w-xs"
                    accept="image/*"
                    onChange={(e) => setCover_img(e.target.files[0])}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Create Blog Post
                </button>
              </form>
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

export default Add_blog;
