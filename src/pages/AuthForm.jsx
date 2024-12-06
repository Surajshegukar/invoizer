import React, { useState,useEffect } from 'react';
import  { loginUser} from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/userSlice';
// import react-cookies
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  // react-cookies
  const [cookies, setCookie] = useCookies(['user']);
  

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the authentication logic
    console.log(isLogin ? 'Logging in' : 'Signing up', { email, password, name });
    if (isLogin) {
      dispatch(loginUser({ email, password })).then((data) => {
        if (data.payload.success === true) {
          console.log(data.payload);
          // react-cookies
          setCookie('user', data.payload.token, { path: '/' });
          toast.success("User logged in successfully");
          setTimeout(() => {
            window.location.href = '/home';
          }, 2000);
        }
        else {
          console.log(data.payload);
          toast.error(data.payload.message);
        }
      });
    } else {
      dispatch(registerUser({ email, password, name,code })).then((data) => {
        if (data.payload.success === true) {
          
          console.log(data.payload);
          // react-cookies
          setCookie('user', data.payload.token, { path: '/' });
          toast.success("User registered successfully");
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
          
        }
        else {
          console.log(data.payload);
          toast.error(data.payload.message);
        }
      });
    }

  };

  useEffect(() => {
    toast.success("Welcome to Login Page");
  }
  , []);

  return (
    <>
    {/* <Toaster /> */}
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          {/* input for signup code */}
          {!isLogin && (
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AuthForm;

