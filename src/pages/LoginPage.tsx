/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

// Login Page Component
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/users/login', {
        username,
        pin
      });

      localStorage.setItem('userToken', response.data.token);
      navigate(`/profile/${username}`);
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="absolute top-4 left-4">
        <Button 
          onClick={() => navigate('/')}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Back to Home
        </Button>
      </div>
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full border border-red-400">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-400">Connect to Tradition</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">PIN</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <p className="text-gray-400 text-sm mt-4 text-center">
          Join 200+ collectors preserving Assamese cultural heritage
        </p>
      </div>
    </div>
  );
};

export default LoginPage;