import { React,useContext,useEffect,useState } from "react";
import { Datepicker, Input, initTE, Timepicker } from "tw-elements";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';

import "react-datepicker/dist/react-datepicker.css";
// import { ToastContainer } from "react-toastify";

export const Booking = ({id}) => {
  // console.log("prop"+id);
  const [loader,setLoading]=useState(false);
  const [inputtime, setInputtime] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const {user}=useContext(AuthContext);
  console.log(user);
  const [price,setPrice] = useState("2");
    useEffect(() => {
        initTE({ Input, Timepicker });
    
      }, []);
      // useEffect(() => {
      //   initTE({ Datepicker, Input });
      //   const datepickerDisablePast = document.getElementById(
      //     "datepicker-disable-past"
      //   );
      //   new Datepicker(datepickerDisablePast, {
      //     disablePast: true,
      //   });
      // });
      
    

      const onChange2 = (event) => {
        setInputtime(event.target.value);
        console.log(event.target.value);
      }


      
const loadRazorpay=()=> {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.onerror = () => {
    alert('Razorpay SDK failed to load. Are you online?');
   
  };
  script.onload = async () => {
    try {
      // setOrderAmount(price);
      // setLoading(true);
      const result = await axios.post('http://localhost:3001/pay/create-order', {
        amount: parseInt(price) + '00' ,
      });
      console.log(result);
      const { amount, id: order_id, currency } = result.data;
      const {
        data: { key: razorpayKey },
      } = await axios.get('http://localhost:3001/pay/get-razorpay-key');

      const options = {
        key: razorpayKey,
        amount: amount.toString(),
        currency: currency,
        name: 'example name',
        description: 'example transaction',
        order_id: order_id,
        handler: async function (response) {
          const result = await axios.post('http://localhost:3001/pay/pay-order', {
            amount: amount,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });
          alert(result.data.msg);
          if(result.data.success){
            handleClick(result.data.orderId);
          }
          // fetchOrders();
        },
        prefill: {
          name: 'example name',
          email: 'email@example.com',
          contact: '111111',
        },
        notes: {
          address: 'example address',
        },
        theme: {
          color: '#80c0f0',
        },
      };

      setLoading(false);
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      console.log(paymentObject)
      

     


    } catch (err) {
      alert(err);
      setLoading(false);
    }
  };
  document.body.appendChild(script);
}


const handleMail=async ()=>{
  console.log("hi");
  try {
    // const {data}= useFetch('http://localhost:3001/cou/counc');
    const response = await axios.post(`http://localhost:3001/cou/getcounc`,{id});
    const counce=response.data[0];
    
    // toast.success('Tickets Booked Succesfully ..Please check your registered Email for more details', {
    //   position: toast.POSITION.TOP_CENTER
    // });
  console.log("hi");
    const res=await axios.post("http://localhost:3001/book/mail",{user,counce,startDate,inputtime});
console.log(res);
    // closeModal(false);
      
  }
 catch(err){
    console.log(err);
 }
}



const handleClick= async ()=>{
  // loadRazorpay();
  // handleMail();
  const response = await axios.post(`http://localhost:3001/cou/getuser`,{username:user.username});
  // console.log(response.data[0]);
  const data={
    counselee_id :response.data[0].id,
    counsellor_id :parseInt(id),
    session_date :startDate,
  session_time : inputtime,
  counseling_fee :parseInt(price)
  }
  // console.log(data);
  const book = await axios.post("http://localhost:3001/book/booked",{data});
  console.log(book);
 
 
}

    
  return (
   
    <div class="mt-3">
       <ToastContainer/>
        {/* <div
          class="relative mb-3"
          id="datepicker-disable-past"
          data-te-input-wrapper-init
        >
          <input
            type="text"
            class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            placeholder="Select a date"
          />
          <label
            for="floatingInput"
            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Select a date
          </label>
        </div> */}
        <div class="peer  min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 flex"> <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
      <div
          class="relative"
          data-te-timepicker-init
          data-te-input-wrapper-init
        >
          <input
           value={inputtime}
           onInput={onChange2}
            type="text"
            class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="form1"
          />
          <label
            for="form1"
            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Select a time
          </label>
        </div>
        <div class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-8 mx-auto">

        <div  class="grid grid-cols-1 gap-8 mt-1 lg:grid-cols-3 xl:mt-12">
            <div onClick={()=>setPrice("0")} class="flex items-center justify-between px-8 py-4 border cursor-pointer rounded-xl dark:border-gray-700">
                <div class="flex flex-col items-center space-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class={price==0 ? "w-5 h-5 text-blue-600 sm:h-7 sm:w-7":"w-5 h-5 text-gray-400 sm:h-7 sm:w-7"} viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>

                    <h2 class={price==0 ? "text-lg font-medium text-blue-600 sm:text-xl dark:text-blue-600" : "text-lg font-medium text-gray-400 sm:text-xl dark:text-gray-400"}>Basic</h2>
                </div>

                <h2 class={price==0 ?"text-2xl font-semibold text-blue-600 sm:text-3xl dark:text-blue-600":"text-2xl font-semibold text-gray-400 sm:text-3xl dark:text-gray-400"}>Free</h2>
            </div>

            <div onClick={()=>setPrice("1")} class="flex items-center justify-between px-8 py-4 border border-blue-500 cursor-pointer rounded-xl">
                <div class="flex flex-col items-center space-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class={price==1 ?"w-5 h-5 text-blue-600 dark:text-blue-600 sm:h-7 sm:w-7":"w-5 h-5 text-gray-400 dark:text-gray-400 sm:h-7 sm:w-7" }viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>

                    <h2 class={price==1 ?"text-lg font-medium text-blue-600 sm:text-xl dark:text-blue-600":"text-lg font-medium text-gray-400 sm:text-xl dark:text-gray-400"}>Standard</h2>
                </div>


                <div class="flex flex-col items-center space-y-1">
                    <div class={price==1 ?"px-2 text-xs text-blue-600 bg-gray-100 rounded-full dark:text-blue-600 sm:px-4 sm:py-1 dark:bg-gray-700 ":"px-2 text-xs text-gray-400 bg-gray-100 rounded-full dark:text-gray-400 sm:px-4 sm:py-1 dark:bg-gray-700 "}>
                        Save 30%
                    </div>

                    <h2 class={price==1 ?"text-2xl font-semibold text-blue-600 dark:text-blue-600 sm:text-3xl":"text-2xl font-semibold text-gray-400 dark:text-gray-400 sm:text-3xl"}>$99 <span class="text-base font-medium"></span></h2>
                </div>
            </div>

            <div onClick={()=>setPrice("2")}class="flex items-center justify-between px-8 py-4 border cursor-pointer rounded-xl dark:border-gray-700">
                <div class="flex flex-col items-center space-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class={price==2 ?"w-5 h-5 text-blue-600 sm:h-7 sm:w-7":"w-5 h-5 text-gray-400 sm:h-7 sm:w-7" }viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>

                    <h2 class={price==2 ?"text-lg font-medium text-blue-600 sm:text-xl dark:text-blue-600":"text-lg font-medium text-gray-400 sm:text-xl dark:text-gray-400"}>Pro</h2>
                </div>

                <div class="flex flex-col items-center space-y-1">
                    <div class={price==2 ?"px-2 text-xs text-blue-600 bg-gray-100 rounded-full dark:text-blue-600 sm:px-4 sm:py-1 dark:bg-gray-700 ":"px-2 text-xs text-gray-400 bg-gray-100 rounded-full dark:text-gray-400 sm:px-4 sm:py-1 dark:bg-gray-700 "}>
                        Save 20%
                    </div>

                    <h2 class={price==2 ?"text-2xl font-semibold text-blue-600 sm:text-3xl dark:text-blue-600":"text-2xl font-semibold text-gray-400 sm:text-3xl dark:text-gray-400"}>$149 <span class="text-base font-medium"></span></h2>
                </div>
            </div>
        </div>


    </div>
</div>
<button onClick={handleClick} type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Book Appointment</button>
    </div>
  );
};

export default Booking;
