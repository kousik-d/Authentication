import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { PasswordForgetLink } from '../PasswordForget';
import './SignUp.css'; // Adding CSS for styling
import LoadingSpinner from './LoadingSpinner';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const SignUp = () => {
  return (
    <div className="signup-container">
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
};

const SignUpFormBase = ({ firebase }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName:'',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    apartment: '',
    street:'',
    city:'',
    state:'',
    zipCode:'',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    isLoading: false,
  });

  // const [countryCode, setCountryCode] = useState("+91");
  const [isOTPVisible, setIsOTPVisible] = useState(false); // State to manage OTP input visibility
  const [otp, setOtp] = useState(""); // State to store OTP
  const [buttonText, setButtonText] = useState("Send OTP");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onPhoneChange = (event) => {
    setFormData((prev) => ({ ...prev, phoneNumber: event }));
  }

  const onVerifyPhoneNumber = async () => {
    // Example verification logic
    if (!phoneNumber) {
      alert('Please enter a valid phone number.');
      return;
    }

    const response = await fetch("http://localhost:8080/twilio-sms/send-otp",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        countryCode:"",
        phone: phoneNumber
      })
    })

    if (response.ok) {
      alert('OTP sent successfully!');
      setIsOTPVisible(true);
      setButtonText("Verify");
    } else {
      alert(`Failed to send OTP: ${response.statusText}`);
    }
  };

  const onVerifyOtp = async() => {
    if (!otp) {
      alert('Please enter a valid OTP.');
      return;
    }

    const response = await fetch("http://localhost:8080/twilio-sms/verify-otp",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        countryCode:"",
        phone: phoneNumber,
        otp: otp
      })
    })

    if (response.ok) {
      alert('OTP Verified successfully!');
      setIsOTPVisible(false);
      setButtonText("Verify");
      setButtonDisabled(false);
    } else {
      alert(`Failed to send OTP: ${response.statusText}`);
    }
  }

  const onChangeOTP = (event) => {
    setOtp(event.target.value);
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    setFormData((prevData) => ({ ...prevData, isLoading: true, error: null }));
    const {  email, phoneNumber, passwordOne , firstName, middleName, lastName , apartment, street, city, state, zipCode} = formData;
    try {

      if (!email || !phoneNumber || !passwordOne || !firstName || !middleName || !lastName || !apartment || !street || !city || !state || !zipCode) {
        setFormData((prevData) => ({ ...prevData, error: 'Please fill in all required fields.', isLoading: false }));
        alert("Please fill in all required fields.")
        return; // Exit early if any required field is missing
      }

      if (passwordOne.length < 6) {
        setFormData((prevData) => ({ ...prevData, error: 'Password must be at least 6 characters long.', isLoading: false }));
        alert("Password must be at least 6 characters long.")
        return; // Exit early if password is too short
      }

      if (passwordOne !== formData.passwordTwo) {
        setFormData((prevData) => ({ ...prevData, error: 'Passwords do not match.', isLoading: false }));
        alert("Passwords do not match.")
        return; // Exit early if passwords don't match
      }

      console.log( email, phoneNumber, passwordOne , firstName, middleName, lastName , apartment, street, city, state, zipCode);
      // Check for username existence (asynchronous)
      const userExists = await firebase.checkUserExists(email);
      if (userExists) {
        setFormData((prevData) => ({ ...prevData, error: 'Email already exists.Please Sign In' }));
        alert("Username already exists.")
        setFormData((prevData) => ({ ...prevData, error: null, isLoading: false }));
        return; // Exit early if username exists
      }

      // Create user (asynchronous)
      await firebase.persistUserWithID(email, {
        phoneNumber,
        password: passwordOne,
        firstName,
        middleName,
        lastName,
        apartment,
        street,
        city,
        state,
        zipCode
      });

      firebase.doCreateUserWithEmailAndPassword(email, passwordOne)

      // Handle successful user creation
      setFormData({ username: '', email: '', phoneNumber: '', passwordOne: '', passwordTwo: '', error: null });
      navigate(ROUTES.HOME); // Redirect to home page or appropriate location

    } catch (error) {
      setFormData((prevData) => ({ ...prevData, error: error.message, isLoading: false })); // Update error state
    }
  };

  const {  email, phoneNumber, passwordOne, passwordTwo, error , isLoading , firstName, middleName, lastName , apartment, street, city, state, zipCode} = formData;
  const isInvalid =
    passwordOne !== passwordTwo  || !email || !phoneNumber  || !passwordOne || !firstName || !middleName || !lastName || !apartment || !street || !city || !state || !zipCode;

  return (
    <div className={isLoading ? 'loading-overlay' : ''}> 
    {isLoading && ( 
        <div className="loading-overlay"> 
          <LoadingSpinner /> 
        </div> )} 
    <form className="signup-form" onSubmit={onSubmit}>
      <div className="form-row">
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="email"
          placeholder="Email"
          className="form-input"
        />
      </div>

      <div className="form-row">
        <input
          name="firstName"
          value={firstName}
          onChange={onChange}
          type="name"
          placeholder="First Name"
          className="form-input"
        />
      </div>

      <div className="form-row">
        <input
          name="middleName"
          value={middleName}
          onChange={onChange}
          type="name"
          placeholder="Middle Name"
          className="form-input"
        />
      </div>

      <div className="form-row">
        <input
          name="lastName"
          value={lastName}
          onChange={onChange}
          type="name"
          placeholder="Last Name"
          className="form-input"
        />
      </div>

    
       <div className="form-row">
        <PhoneInput
          name="phoneNumber"
          value={phoneNumber}
          onChange={onPhoneChange}
            placeholder="Enter phone number"
            className="phone-input"
          />

          {isOTPVisible && (
          <div className="form-row">
            <input
              name="otp"
              value={otp}
              onChange={onChangeOTP}
              type="text"
              placeholder="Enter OTP"
              className="form-input"
            />
          </div>
        )}
        {buttonDisabled && (
          <button
          type="button"
          onClick={isOTPVisible ? onVerifyOtp : onVerifyPhoneNumber}// Trigger verification logic
          className="verify-button"
          >
          {buttonText} {/* Button text changes based on state */}
          </button>
        )}

        </div>

        <div className="form-row">
        <input
          name="apartment"
          value={apartment}
          onChange={onChange}
          type="name"
          placeholder="Apartment"
          className="form-input"
        />
      </div>

      <div className="form-row">
        <input
          name="street"
          value={street}
          onChange={onChange}
          type="name"
          placeholder="Street"
          className="form-input"
        />
      </div>

      <div className="form-row">
        <input
          name="city"
          value={city}
          onChange={onChange}
          type="name"
          placeholder="city"
          className="form-input"
        />
      </div>

      <div className="form-row">
        <input
          name="state"
          value={state}
          onChange={onChange}
          type="name"
          placeholder="state"
          className="form-input"
        />
      </div>

      <div className="form-row">
        <input
          name="zipcode"
          value={zipCode}
          onChange={onChange}
          type="numeric"
          placeholder="Zipcode"
          className="form-input"
        />
      </div>

      <div className="form-row">
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={onChange}
          type="password"
          placeholder="Password"
          className="form-input"
        />
      </div>

      <div className="form-row">
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={onChange}
          type="password"
          placeholder="Confirm Password"
          className="form-input"
        />
      </div>

      <button type="submit" disabled={!isInvalid} className="form-button">
        SignUp
      </button>

      {error && <p className="error-message">{error.message}</p>}

      {error && <p className="error-message">{error}</p>}
    </form>
    </div>
  );
};

const SignUpLink = () => (
  <p className="signup-link">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUp;
export { SignUpForm, SignUpLink };