import React, { useEffect } from 'react';
import 'flowbite';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import logo from '../assets/logo.jpg';
import toast, { Toaster } from 'react-hot-toast';

function NavSideBar() {
  const [cookies, setCookie] = useCookies(['user']);
  const handleLogout = () => {
    setCookie('user', '', { path: '/' });
  }

useEffect(() => {
  if (!cookies.user && window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
}
, [cookies.user]);






  return (
    <>
    
    {window.location.pathname !== '/login' && (
      <nav className='bg-white border-gray-200' >
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} class="h-10 rounded-full" alt="Flowbite Logo " />
          <span class="self-center text-2xl font-semibold whitespace-nowrap ">Invoizer</span>
      </Link>
      <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/>
          </button>
          
          <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow" id="user-dropdown">
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 ">Bonnie Green</span>
              <span class="block text-sm  text-gray-500 truncate ">name@flowbite.com</span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              
              <li>
                <Link to = {'/'} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Settings</Link>
              </li>
              <li>
                <Link to = {'/'} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Select Invoice Templates</Link>
              </li>
              <li>
                <Link to = {'/'} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Edit Profile</Link>
              </li>
              <li>
                <Link to = {'/login'} onClick={handleLogout} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Sign out</Link>
              </li>
            </ul>
          </div>
          <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  " aria-controls="navbar-user" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
          <li>
            <Link to={'/home'} class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Home</Link>
          </li>
         
          <li>
            <Link to={'/add-items'} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0   ">Add Items</Link>
          </li>
          <li>
            <Link to={'/student'} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0   ">Add Student</Link>
          </li>
          <li>
            <Link to={'/add-invoice'} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  ">Add Invoice</Link>
          </li>
          <li>
            <Link to={'/show-invoices'} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0    ">Invoices</Link>
          </li>
          <li>
            <Link to={'/student-profile'} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0    ">Profiles</Link>
          </li>
          <li>
            <Link to={'/statements'} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0    ">Statements</Link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
    )}

    <Toaster position='top-right' reverseOrder={false} duration={4000} />

    

    </>
  )
}

export default NavSideBar