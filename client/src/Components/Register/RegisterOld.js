import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { saveUser } from "../../store/user/userActions";
import { useSelector, useDispatch } from 'react-redux';
//import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formValues, setFormValues] = useState({
    nameUser: "",
    phone: "",
    password: "",
    passwordAuth: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const history = useHistory();
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const validateForm = () => {
    const regex = /^[a-zA-Z0-9]+$/;
    let isValid = true;
    const Errors = {};

    // Validate nameUser field
    if (!formValues || !formValues.firstName || !formValues.firstName.trim()) {
      Errors.firstName = "First name is required";
      isValid = false;
    } else {
      if (formValues.nameUser.length > 10) {
        errors.nameUser = "Name should be less than or equal to 10 characters";
      } else if (!regex.test(formValues.nameUser)) {
        Errors.nameUser = "Name should only contain letters and spaces";
      }
    }

    // Validate password field
    if (!formValues || !formValues.password || !formValues.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (!/^\d{6,20}$/.test(formValues.password)) {
      Errors.password = "Password should contain only numbers and be between 6 to 20 characters";
      isValid = false;
    }

    // Validate passwordAuth field
    if (formValues.password!=formValues.passwordAuth){
      Errors.passwordAuth = "PasswordAuth field and password field are not match";
      isValid = false;
    }

    // Validate phone field
    if (!formValues.phone.trim()) {
      Errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formValues.phone.trim())) {
      Errors.phone = "Phone number must be 10 digits";
      isValid = false;
    }

    // Validate email field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email.trim()) {
      Errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formValues.email.trim())) {
      Errors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(Errors);
    return isValid;
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    console.log("Form submitted successfully");
    if (Object.keys(errors).length === 0) {
      // Handle form submission
      axios.post("http://localhost:5000/user/login", {
        name: formValues.name, password: formValues.password, email: formValues.email
      })
        .then(res => { console.log(res); dispatch(saveUser(res.data)); })
        .catch(err => console.log(err)).navigate('/login')
    } else {
      setErrors(errors);
    }
  };




  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nameUser">NameUser:</label>
        <input
          type="text"
          id="n"
          name="nameUser"
          value={formValues.nameUser}
          onChange={handleChange}
        />
        {errors.nameUser && <p>{errors.nameUser}</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
        />
        {errors.phone && <p>{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="password">PasswordAuth:</label>
        <input
          type="password"
          id="passwordAuth"
          name="passwordAuth"
          value={formValues.passwordAuth}
          onChange={handleChange}
        />
        {errors.passwordAuth && <p>{errors.passwordAuth}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Register;


// import { useState } from "react";
// import "../Register/Register.css"
// export default function Register(){
//     const save=(e)=>{
//         e.preventDefaulte();

//         }
// let [userOrMatchmaker,setUserOrMatchmaker]=useState({
//     firstName:" ",
//     lastName:" ",
//     phone:" ",
//     age:null,
//     city:" ",
//     mail:" "
// });

// const change=(e)=>{
// let inpValue=e.target.value;
// let inpName=e.target.name;
// let inpType=e.target.type;
// if(inpType=="number")
// inpValue=+inpValue;
// let userOrmatch={...userOrMatchmaker};
// userOrmatch[inpName]=inpValue;
// setUserOrMatchmaker(userOrmatch);
// }


//     return(<>
//     <h1>Register!!!</h1>
//    <h1>הרשם</h1>
//    <form onSubmit={save}>
//    <label>:שם פרטי </label>
//    <br/>

//    <input type="text" />
//    <br/>
//    <br/>

//    <label>:שם משפחה</label>
//    <br/>
//    <input type="text"/>
//    <br/>
//    <br/>

//    <label>:טלפון</label>
//    <br/>
//    <input type="text"/>
//    <br/>
//    <br/>

//    <label>:גיל</label>
//    <br/>
//    <input type="number"/>
//    <br/>
//    <br/>

//    <label>:עיר מגורים</label>
//    <br/>
//    <input type="text"/>
//    <br/>
//    <br/>
//    <label>:מייל</label>
//    <br/>
//    <input type="text"/>
//    </form>

//     </>)
// }
