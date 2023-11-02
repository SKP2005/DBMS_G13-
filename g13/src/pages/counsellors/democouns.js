import React, { useContext, useState } from 'react';
import NavbarWithMegaMenu from '../../components/navbar';
import Booking from '../../components/booking';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Footer from '../../components/footer';

function Democouns() {
  const {user}=useContext(AuthContext);
 
  console.log(user);
  const location = useLocation();
  const [counc,setCounc]=useState(undefined);
  const id = location.pathname.split("/")[2];
  console.log(id);
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/cou/getcounc`,{id});
        console.log(response.data[0]);
        setCounc(response.data[0]);
       
      } catch (error) {
       console.log(error)
      }}
      fetchData();
    },[]);
    console.log(counc)
  return (
    <div>
        <NavbarWithMegaMenu/>
        <div class="mt-3 font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover">
        <div class="max-w-7xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
          {/* <!--Main Col--> */}
          <div
            id="profile"
            class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
          >
            <div class="p-4 md:p-12 text-center lg:text-left">
              {/* <!-- Image for mobile view--> */}
              <div
                class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              ></div>

              <h1 class="text-3xl font-bold pt-8 lg:pt-0">{counc?.name}</h1>
              <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
              <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                {" "}
                Community Counseling
              </p>
              <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                Credentials: Ph.D. in Community Counseling
              </p>

              <p class="pt-8 text-sm">
                Dr. Agastha is a compassionate Community Counselor with
                extensive experience in supporting individuals and communities.
                They provide a safe and non-judgmental space for clients to
                address mental health concerns and work towards positive change.
                With expertise in various counseling approaches, Dr. Agastha
                empowers clients to gain insights, develop coping skills, and
                achieve emotional well-being.
              </p>

              <Booking id={id}/>

              {/* <!-- Use https://simpleicons.org/ to find the svg for your preferred product -->  */}
            </div>
          </div>

          <div class="w-full lg:w-2/5">
            <img
              src="https://images.pexels.com/photos/4420634/pexels-photo-4420634.jpeg?auto=compress&cs=tinysrgb&w=600"
              class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
              alt="bgd"
            />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Democouns