import React, { useState } from 'react';
import NavbarWithMegaMenu from './navbar';
import "./componentcss.css";
import { useContext } from "react";
import {AuthContext} from "../context/AuthContext";
import { useNavigate} from "react-router-dom";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
    
const navigate=useNavigate(); 
    const { loading, error, dispatch, login } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
      });
        const handleChange = (e) => {
          setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        };
  const [type, setType] = useState(false);

  

  const handleClick=async (e)=> {
    e.preventDefault();
    console.log(credentials);
   

    dispatch({ type: "LOGIN_START" });
    setIsLoading(true);
    try {
        const res=await axios.post('http://localhost:3001/auth/login',{username:credentials.username,password:credentials.password});
        console.log(res);
      toast.success("Login Successfull", {
        position: toast.POSITION.TOP_CENTER
    });
    // const {token, details}=res.data;
    // login(token, details);
    localStorage.setItem('jwtToken', res.data.token);

    if (res.data.isCouncellor || !res.data.isCouncellor) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.doc });
      toast.success('Login Successful', { position: toast.POSITION.TOP_CENTER });
      
      // Delay navigation by 1 second to show loader
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1000);
    }  else {
       
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
          
        });
      
      }
    } catch (err) {
      toast.error("User not found , Please try again", {
        position: toast.POSITION.TOP_CENTER
    });
    console.log(err);
      dispatch({ type: "LOGIN_FAILURE", payload: err.res.data });
      setIsLoading(false);
    
    }








  }

  return (
    <>
      <ToastContainer />

      {isLoading ? (
       <div class="loader"></div>
      ) : (
        <>
    <div>
      {/* <NavbarWithMegaMenu/> */}


<section class="bg-white dark:bg-gray-900">
    <div class="flex justify-center min-h-screen">
        <div class="loimg hidden bg-cover lg:block lg:w-3/5" >
        </div>

        <div class=" flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div class="w-full">
                <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                    Get your free account now.
                </h1>

                <p class="mt-4 text-gray-500 dark:text-gray-400">
                    Lets get you all set up so you can verify your personal account and begin setting up your profile.
                </p>

                <div class="mt-6">
                    <h1 class="text-gray-500 dark:text-gray-300">Select type of account</h1>

                    <div class="mt-3 md:flex md:items-center md:-mx-2">
                        <button onClick={()=>setType(false)}  class={!type ? "flex justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-lg md:w-auto md:mx-2 focus:outline-none" :"flex justify-center w-full px-6 py-3 text-blue-500 border border-blue-500 rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none"}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>

                            <span class="mx-2">
                                client
                            </span>
                        </button>

                        <button onClick={()=>setType(true)} class={type ? "flex justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-lg md:w-auto md:mx-2 focus:outline-none" :"flex justify-center w-full px-6 py-3 text-blue-500 border border-blue-500 rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none"}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>

                            <span class="mx-2">
                                worker
                            </span>
                        </button>
                    </div>
                </div>

                <form class="grid grid-cols-1 gap-6 mt-8  md:grid-cols-2">
             
                    <div>
                        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Username</label>
                        <input type="text" id='username' placeholder="johnsnow@example.com" class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={handleChange}/>
                    </div>

                    <div>
                        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                        <input type="password" placeholder="Enter your password" class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" id='password' onChange={handleChange} />
                    </div>


                    <button onClick={handleClick}
                        class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        <span>Login  </span>

                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                    <p class="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="/register" class="text-blue-500 focus:outline-none focus:underline hover:underline">Register</a>.</p>
                </form>
            </div>
        </div>
    </div>
</section>
    </div> </>
      )}
    </>
  );
}

