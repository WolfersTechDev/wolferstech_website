import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login_admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate();

  const HandleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/admin/api/login', {
        username,
        password,
      });

      if (response.status === 200) {
        setMessage('Login successful');
        localStorage.setItem('login_tocken', response.data.token);
        history('/admin');
        // Perform any action on successful login (e.g., redirect to another page)
      } else {
        setMessage('Login failed');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="m-auto p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
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
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
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
            onClick={HandleLogin}
          >
            Login
          </button>
          <p className="mt-2 text-red-500">{message}</p>
        </form>
      </div>
    </div>
  );
}

export default Login_admin;