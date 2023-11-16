import NavbarWithMegaMenu from '../components/navbar'
import Footer from "../components/footer";
import "../components/profile.css";
import axios from 'axios';
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export const Profile = () => {
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [price,setAmount]=useState("3");
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [loader,setLoading]=useState(false);
  const [history,setHistory]=useState(false);
  const [ide,setIde]=useState(undefined);
  const [file, setFile] = useState("");
  console.log(user);
  const viewHistory = async () => {
    console.log("hi");
    const res = await axios.post('http://localhost:3001/cou/clientsAppointment', { id: user.id, is_counc: user.is_counc });
    setResults(res.data);
    console.log(results);
  };
  const accepti=async (result)=>{
    const res = await axios.post('http://localhost:3001/cou/changestatus', { id: result.session_id, status:1  });
    console.log(result);
  }
  const declined=async (result)=>{
    const res = await axios.post('http://localhost:3001/cou/changestatus', { id: result.session_id, status:0  });
    console.log(result);
  }
  // const status=async(result)=>{
   
  // }
  const handleClick=async(result)=>{
    setIde(result.session_id);
      setAmount(result.counseling_fee);
      console.log(ide);
      const res=  await axios.post('http://localhost:3001/cou/updatepayment',{st:1,id:result.session_id});
      console.log(res);
      
      loadRazorpay(result);
      // status(result);
      handleMail(result);
     
  }
       
const loadRazorpay=(result)=> {
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
          // if(result.data.success){
            // handleClick(result.data.orderId);
            // status();
          // }
          // console.log(result.session.id+"passsssss");
          // const re=await axios.post('http://localhost:3001/cou/updatepayment',{st:1,id:result.session_id});
          // console.log(re);
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
const handleMail=async (result)=>{
  console.log("hi");
  try {
    // const {data}= useFetch('http://localhost:3001/cou/counc');
    const response = await axios.post(`http://localhost:3001/cou/getcounc`,{id:result.counsellor_id});
    const counce=response.data[0];
    
    // toast.success('Tickets Booked Succesfully ..Please check your registered Email for more details', {
    //   position: toast.POSITION.TOP_CENTER
    // });
  console.log("hi");
    const res=await axios.post("http://localhost:3001/book/mail",{user,counce,startDate: result.session_date, inputtime:result.session_time});
console.log(res);
    // closeModal(false);
      
  }
 catch(err){
    console.log(err);
 }
}

const SubmitImage = async(e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "upload");
 try{ 
   const uploadRes = await axios.post(
     "https://api.cloudinary.com/v1_1/dg7seerl9/image/upload", data);

   const { url } = uploadRes.data;
   console.log(url);
   
   const updatedUser = {
    image:url,
 };
  //console.log(updatedUser);
 const result= await axios.post(`http://localhost:3001/cou/update`, {url,id:user.id});

  // setIsImageSelected(!isImageSelected);
//  console.log(result);
//  navigate.push('/user/profile');
}
 catch(err){
   console.log(err);
 }
  
};
console.log(user.photo);


  return (
    <body>
      <div class="main-content">
        <nav class="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
          <div class="container-fluid">
            <a class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="/" >Home</a>
            <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <div class="form-group mb-0">
                <div class="input-group input-group-alternative">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-search"></i></span>
                  </div>
                  <input class="form-control" placeholder="Search" type="text" />
                </div>
              </div>
            </form>
            <ul class="navbar-nav align-items-center d-none d-md-flex">
              <li class="nav-item dropdown">
                <a class="nav-link pr-0" href="/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <div class="media align-items-center">
                    <span class="avatar avatar-sm rounded-circle">
                      <img alt="Image placeholder" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                    </span>
                    <div class="media-body ml-2 d-none d-lg-block">
                      <span class="mb-0 text-sm  font-weight-bold">{user.username}</span>
                    </div>
                  </div>
                </a>
                <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                  <div class=" dropdown-header noti-title">
                    <h6 class="text-overflow m-0">Welcome!</h6>
                  </div>
                  <a href="../examples/profile.html" class="dropdown-item">
                    <i class="ni ni-single-02"></i>
                    <span>My profile</span>
                  </a>
                  <a href="../examples/profile.html" class="dropdown-item">
                    <i class="ni ni-settings-gear-65"></i>
                    <span>Settings</span>
                  </a>
                  <a href="../examples/profile.html" class="dropdown-item">
                    <i class="ni ni-calendar-grid-58"></i>
                    <span>Activity</span>
                  </a>
                  <a href="../examples/profile.html" class="dropdown-item">
                    <i class="ni ni-support-16"></i>
                    <span>Support</span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a href="#!" class="dropdown-item">
                    <i class="ni ni-user-run"></i>
                    <span>Logout</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center prof">

          <span class="mask bg-gradient-default opacity-8"></span>

          <div class="container-fluid d-flex align-items-center">
            <div class="row">
              <div class="col-lg-7 col-md-10">
                <h1 class="display-2 text-white">Hello {user.username}</h1>
                <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
                <a href="#!" class="btn btn-info">Edit profile</a>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid mt--7">
          <div class="row">
            <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
              <div class="card card-profile shadow">
                <div class="row justify-content-center">
                  <div class="col-lg-3 order-lg-2">
{/* IMAGE UPDATE */}
                  


                    <div class="card-profile-image">
                      
                      <a href="#">
                        {user.photo ?<><img src={user.photo}/></> : <><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" class="rounded-circle" /></>}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div class="d-flex justify-content-between">
                    <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
                    <a href="#" class="btn btn-sm btn-default float-right">Message</a>
                  </div>
                </div>
                <div class="card-body pt-0 pt-md-4">
                  <div class="row">
                  <div className="formInput mt-5 px-2">
                <label htmlFor="file" id= "b5b"style={{backgroundColor:'rgb(245,69,118)',color:'white', borderRadius:'5px'}} onClick={()=>{ setIsImageSelected(!isImageSelected)}}>
                Change Image</label>
                { isImageSelected &&
                <label htmlFor="file" id= "b5b"style={{backgroundColor:'rgb(245,69,118)',color:'white', borderRadius:'5px'}} onClick={SubmitImage}>
                upload</label>}
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  // style={{ display: "none" }}
                />
              </div>
                  </div>
                  <div class="text-center">
                    <h3>
                      {user.username}<span class="font-weight-light">, 27</span>
                    </h3>
                    <div class="h5 font-weight-300">
                      <i class="ni location_pin mr-2"></i>Bucharest, Romania
                    </div>
                    <div class="h5 mt-4">
                      <i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i class="ni education_hat mr-2"></i>University of Computer Science
                    </div>
                    <hr class="my-4" />
                    <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
                    <a href="#">Show more</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-8 order-xl-1">
              <div class="card bg-secondary shadow">
                <div class="card-header bg-white border-0">
                  <div class="row align-items-center">
                    <div class="col-8">
                      <h3 class="mb-0">My account</h3>
                    </div>
                    <div class="col-4 text-right">
                      <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <form>
                    <h6 class="heading-small text-muted mb-4">User information</h6>
                    <div class="pl-lg-4">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="form-group focused">
                            <label class="form-control-label" for="input-username">Username</label>
                            <input type="text" id="input-username" class="form-control form-control-alternative" placeholder="Username" value="lucky.jesse" />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-group">
                            <label class="form-control-label" for="input-email">Email address</label>
                            <input type="email" id="input-email" class="form-control form-control-alternative" placeholder="jesse@example.com" />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="form-group focused">
                            <label class="form-control-label" for="input-first-name">First name</label>
                            <input type="text" id="input-first-name" class="form-control form-control-alternative" placeholder="First name" value="Lucky" />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-group focused">
                            <label class="form-control-label" for="input-last-name">Last name</label>
                            <input type="text" id="input-last-name" class="form-control form-control-alternative" placeholder="Last name" value="Jesse" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr class="my-4" />

                    <h6 class="heading-small text-muted mb-4">Contact information</h6>
                    <div class="pl-lg-4">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group focused">
                            <label class="form-control-label" for="input-address">Address</label>
                            <input id="input-address" class="form-control form-control-alternative" placeholder="Home Address" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" type="text" />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-4">
                          <div class="form-group focused">
                            <label class="form-control-label" for="input-city">City</label>
                            <input type="text" id="input-city" class="form-control form-control-alternative" placeholder="City" value="New York" />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="form-group focused">
                            <label class="form-control-label" for="input-country">Country</label>
                            <input type="text" id="input-country" class="form-control form-control-alternative" placeholder="Country" value="United States" />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="form-group">
                            <label class="form-control-label" for="input-country">Postal code</label>
                            <input type="number" id="input-postal-code" class="form-control form-control-alternative" placeholder="Postal code" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr class="my-4" />

                    <h6 class="heading-small text-muted mb-4">About me</h6>
                    <div class="pl-lg-4">
                      <div class="form-group focused">
                        <label>About Me</label>
                        <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ...">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



<div class='flex justify-center mt-4'>   
<button onClick={()=>{
        viewHistory();
        setHistory(!history);}} 
  type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Appointments</button>
</div>


          

       


{history ? <section class="container mb-5 px-4 mx-auto">


    <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
        

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Session-Id
                                </th>
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Counsellor
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Date
                                </th>
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Time
                                </th>
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Fee
                                </th>
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Status
                                </th>
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Status
                                </th>

                               
                            </tr>
                        </thead>



                        {results.map((result) => (<>
        
                        <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            <tr>
                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                    <h4 class="text-gray-700 dark:text-gray-200">{result.session_id}</h4>
                                </td>
                                <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                    <h4 class="text-gray-700 dark:text-gray-200">{result.counsellor_id}</h4>
                                </td>
                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                    <div>
                                        <h4 class="text-gray-700 dark:text-gray-200">{result.session_date}</h4>
                                    </div>
                                </td>
                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                <div>
                                        <h4 class="text-gray-700 dark:text-gray-200">{result.session_time}</h4>
                                    </div>
                                </td>
                                
                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                      <h4 class="text-gray-700 dark:text-gray-200">{result.counseling_fee}</h4>
                                </td>

                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                      <h4 class="text-gray-700 dark:text-gray-200">{result.counseling_status}</h4>
                                </td>
                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                {user.is_counc == 0 ?
              result.counseling_status == 'accepted' ?  <> {result.payment!=1 ? <button onClick={()=>{setIde(result.session_id);
                setAmount(result.counseling_fee);handleClick(result)}}>PAY NOW</button> : <span class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">paid</span>} </>
              : <><span class="inline px-3 py-1 text-sm font-normal rounded-full text-black-500 gap-x-2 bg-yellow-100/60 dark:bg-gray-800">pending</span></>
            :

            result.counseling_status == 'pending' ? <><button class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800" onClick={()=>{accepti(result);}}>Accept</button> <button class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-red-100/60 dark:bg-gray-800" onClick={()=>{declined(result);}}>decline</button></> : <>{result.payment!=1 ? <span>not-paid</span> : <span>paid</span>}</>} 
                                </td>
                            </tr>
                            </tbody>
                            
      </>
      ))}
                            

                            
                    </table>

                </div>
            </div>
        </div>
    </div>

</section> : <></>}



      <Footer />
    </body>

  )
}

export default Profile;