import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/RestaurantDetail.css";
import Modal from "react-modal";

const modalStyle = {
  overlay: {
    position: "fixed",
    zIndex: 1020,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(255,255,255,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    top: "40%",
    left: "50%",
    right: "50%",
    // bottom: "auto",
    width: "600px",
    // marginRight: "-50%",
    transform: "translate(-50%,-50%)",
  },
};

Modal.setAppElement("#root");
export default function RestaurantDetail() {
  const { rName } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState({});
  const [user, setuser] = useState({name:'',email:'',contact:0});
  const [IsMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [IsUserModalOpen, setUserModalOpen] = useState(false);
  const [Totalprice, setTotalPrice] = useState(0);

  const addItem = (item) => {
    let price = Totalprice + item.itemPrice;
    setTotalPrice(price);
    console.log(Totalprice);
  };

  const openRazorPay = async () => {
    console.log("hello i am geting called");
    console.log(Totalprice);
    let data;
    data = await fetch('http://localhost:8080/pay/razorpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({amount: Totalprice})
    }).then(res => res.json()).catch((err)=>console.log(err));
    console.log(data);
    const options = {
      key: "rzp_test_IUIhO6w1AOPtw5",
      currency:data.currency,
      amount:data.amount,
      name:"Zomato-Food Delivery",
      description:"Transaction",
      order_id:data.id,
      handler:function (response){
            console.log("Handler method...",response)
            var values={
              razorpay_signature:response.razorpay_signature,
              razorpay_order_id:response.razorpay_order_id,
              transactionid:response.razorpay_payment_id,
              transactionamount:data.amount
            }
            // console.log(response)
            //save transaction to MongoDB table:
              fetch('http://localhost:8080/pay/transaction',{method:"pOST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(values)
          }).then(res=>console.log(res)).catch(e=>console.log("error",e))
      },
      prefill:{name:user.name
      ,email:user.email
      ,contact:user.contact
      }
    }
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }


  const handleUserchange=(e)=>{
    user[e.target.name]=e.target.value;
    setuser({...user})
  }


  
const loadScript=(src)=>{

  return new Promise((resolve)=>{
      const script=document.createElement("script");
      script.src=src;
      script.onload=()=>{
          resolve(true)
      };
      script.onerror=()=>{
          resolve(false)
      };
      document.body.appendChild(script)
  })
}


  useEffect(()=>{
    //For fetching restaurant detail
    fetch(`http://localhost:8080/edumato/restaurantDetails/${rName}`, {
      method: "GET",
    })
      .then((response)=> response.json())
      .then((data)=> {
        setRestaurant(data.data);
      });

    //For fetching menu from restaurants provide
    fetch(`http://localhost:8080/edumato/menu/${rName}`, { method: "GET" })
      .then((response)=> response.json())
      .then((data)=> {
        setMenu(data.data);
      });
  }, [rName]);

  const { name, thumb, cost, address, Cuisine } = restaurant;
  const cuisineValue =
    !(Cuisine === undefined) &&
    Cuisine.length &&
    Cuisine.map((item)=><div className="value">{item.name}</div>);

  return (
    <div>
      <div>
        {/* Showcasing the First Image and rest will be showed in the Carousal  */}
        <img src={thumb} width="100%" height="500px" alt="not found" />
        <button className="gallery-button">Click to see Image Gallery</button>
      </div>
      <button
        className="btn btn-danger"
        style={{ float: "right", margin: "15px", backgroundColor: "#ce0505" }}
        onClick={()=> setIsMenuModalOpen(true)}
      >
        Place Online Order
      </button>
      {/* Showing 2 Tabs on screen as Overview and Contact with details in respective sections*/}
      <div className="heading">{name}</div>
      <div className="tabs">
        {/* Tab-1 */}
        <div className="tab">
          <input type="radio" id="tab-1" name="tab-group-1" checked />
          <label for="tab-1">Overview</label>

          <div className="content">
            <div className="about">About the place</div>
            <div className="head">Cuisine</div>
            {cuisineValue}
            <div className="head">Average Cost</div>
            <div className="value">&#8377;{cost}</div>
          </div>
        </div>
        {/* Tab-2 */}
        <div className="tab">
          <input type="radio" id="tab-2" name="tab-group-1" />
          <label for="tab-2">Contact</label>
          <div classname="content focus">
            <div className="head">Phone Number</div>
            <div className="value">+91-9876543217</div>
            <div className="head">{name}</div>
            <div className="value">{address}</div>
          </div>
        </div>
      </div>
      {/* Modal for place order */}
      <Modal isOpen={IsMenuModalOpen} style={modalStyle}>
        <h2 className="text-center">
          Menu
          <button
            onClick={() => setIsMenuModalOpen(false)}
            className="btn btn-outline-danger float-right"
          >
            x
          </button>
        </h2>
        <h3>{name}</h3>
        <ul className="">
          {menu.length &&
            menu.map((item, index) => (
              <li key={index}>
                <div className="col-10 cuisines ">
                  <div>
                    {item.isVeg ? (
                      <div className="text-success">Veg</div>
                    ) : (
                      <div className="text-danger">Non-Veg</div>
                    )}
                  </div>
                  <div>{item.itemName}</div>
                  <div className="cuisines">&#8377;{item.itemPrice}</div>
                  <div className="cuisines">{item.itemDescription}</div>
                  <div className="col-2">
                    <button
                      className=" btn-success"
                      onClick={() => addItem(item)}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <hr />
              </li>
            ))}
        </ul>
        <hr />
        <h3 className="">
          Total Price:{Totalprice}
          <button
            className="btn-outline-danger  float-right"
            onClick={() => {
              setIsMenuModalOpen(false);
              setUserModalOpen(true);
            }}
          >
            Pay Now
          </button>
        </h3>
      </Modal>

      <Modal isOpen={IsUserModalOpen} style={modalStyle}>
        <form className="text-center" >
          <fieldset>
            <legend>User Details</legend>
            <input
              type="text"
              name="name"
              value={user.name}
              placeholder="Enter Your Name"
              className="form-control"
               onChange={(e)=>handleUserchange(e)} ></input>
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="Enter Email"
              className="form-control"
              onChange={(e)=>handleUserchange(e)}
            ></input>
            <input
              name="contact"
              value={user.contact}
              placeholder="Enter Contact No"
              className="form-control"
              onChange={(e)=>handleUserchange(e)}
            ></input>
          </fieldset>
          <button
            className="btn-danger justify-content-center"
            onClick={(e)=>{
              e.preventDefault()
              loadScript("http://checkout.razorpay.com/v1/checkout.js");
              openRazorPay()
            }}
          > Proceed</button>
          </form>
          {/* //Button has to be outside the Form  */}
      </Modal>
    </div>
  );
}
