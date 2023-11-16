import NavbarWithMegaMenu from '../components/navbar'
import Footer from "../components/footer";
import "../components/profile.css";
import axios from 'axios';
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export const Profile = () => {
  const [price,setAmount]=useState("3");
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [loader,setLoading]=useState(false);
  const [ide,setIde]=useState(undefined);
  // console.log(user);
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
                <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                    <div class="card-profile-image">
                      <a href="#">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" class="rounded-circle" />
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
                    <div class="col">
                      <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span class="heading">22</span>
                          <span class="description">Friends</span>
                        </div>
                        <div>
                          <span class="heading">10</span>
                          <span class="description">Photos</span>
                        </div>
                        <div>
                          <span class="heading">89</span>
                          <span class="description">Comments</span>
                        </div>
                      </div>
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
      <button onClick={viewHistory}>viewHistory</button>
      {results.map((result) => (<>
        <div>,{result.payment},{result.session_id} {result.counselee_id}, {result.counsellor_id}, {result.session_date}, {result.session_time} ,{result.counseling_fee},
          {result.counseling_status}


          {user.is_counc == 0 ?
              result.counseling_status == 'accepted' ?  <> {result.payment!=1 ? <button onClick={()=>{setIde(result.session_id);
                setAmount(result.counseling_fee);handleClick(result)}}>PAY NOW</button> : <span>paid</span>} </>
              : <><span>pending</span></>
            :

            result.counseling_status == 'pending' ? <><button onClick={()=>{accepti(result);}}>Accept</button> <button onClick={()=>{declined(result);}}>decline</button></> : <>{result.payment!=1 ? <span>not-paid</span> : <span>paid</span>}</>}

        </div>
      </>
      ))}
      <Footer />
    </body>

  )
}

export default Profile;