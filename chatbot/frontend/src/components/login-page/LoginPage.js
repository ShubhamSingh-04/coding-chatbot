import React, { useContext } from 'react';
import './LoginPage.css';
import { useState, useRef } from 'react';
import ChatbotContext from '../../context/chatbotContext/ChatbotContext';

import { login, register } from '../../services/api/auth';

import 'boxicons/css/boxicons.min.css';

export default function LoginPage({ loginPage, setLoginPage }) {
    const { setUserName, setUserID } = useContext(ChatbotContext);

    const [errors, setErrors] = useState({
        userNameNotFound: false,
        userNameAlreadyExists: false,
        invalidUserName: false,
        emailExistsError: false,
        emailFormatError: false,
        passwordLengthError: false,
        incorrectCredentials: false,
        requiredCredentialsError: false
    });

    const [successMessage, setSuccessMessage] = useState(false);

    const [newUser, setNewUser] = useState(false);

    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleRegister = async (e) => {
        e.preventDefault();

        // check if all fields are filled
        if (userNameRef.current.value === '' || passwordRef.current.value === '' || emailRef.current.value === '') {
            setErrors({ ...errors, requiredCredentialsError: true });
            return;
        }

        const userName = userNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // check if username includes spaces
        if (userName.includes(' ')) {
            setErrors({ ...errors, invalidUserName: true });
            return;
        }

        // check email format is correct
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors({ ...errors, emailFormatError: true });
            return;
        }

        // check if password is at least 6 characters
        if (password.length < 6) {
            setErrors({ ...errors, passwordLengthError: true });
            return;
        }

        try {
            const registeredUser = await register(userName, email, password);


            if (registeredUser.status === 201) {
                setUserName(userNameRef.current.value);
                setUserID(registeredUser.userID);
                setSuccessMessage(true);
            }

            else if (registeredUser.error === 'USERNAME_EXISTS') {
                setErrors({ ...errors, userNameAlreadyExists: true });
            }

            else if (registeredUser.error === 'EMAIL_EXISTS') {
                setErrors({ ...errors, emailExistsError: true });
            }

        } catch (error) {
            console.error('Error during registration at auth.db.js:', error);
        }

    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (userNameRef.current.value === '' || passwordRef.current.value === '') {
            setErrors({ ...errors, incorrectCredentials: true });
            return;
        }

        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;

        const loggedInUser = await login(userName, password);

        if (loggedInUser.status === 200) {
            setUserName(userName);
            setUserID(loggedInUser.userID);
            setLoginPage(false);
        } else {
            setErrors({ ...errors, incorrectCredentials: true });
        }
    }

    return (
        <div className="login-body">

            <div className='login-layout'>
                <div className="side-logo">
                    <p className='codley-title'>Codley</p>
                    <img className='ask-codley-gif' src={`${process.env.PUBLIC_URL}/ask-codley.gif`} alt="none" />
                </div>


                <div className="login-form">
                    <h1 className="login-title">
                        {
                            newUser ? 'Register' : 'Login'
                        }
                    </h1>

                    <div className="input-box">
                        <i className='bx bxs-user'></i>
                        <input type="text" placeholder="Username" ref={userNameRef} onChange={() => setErrors({})} />
                    </div>
                    {errors.userNameNotFound && <p className="userNameError loginError">User not found</p>}
                    {errors.userNameAlreadyExists && <p className="userNameError loginError">Username already exists</p>}
                    {errors.invalidUserName && <p className="userNameError loginError">Username cannot contain spaces</p>}

                    {
                        newUser &&
                        <div className="input-box">
                            <i className='bx bxs-envelope'></i>
                            <input type="email" placeholder="email" ref={emailRef} onChange={() => setErrors({})} />
                        </div>
                    }{errors.emailExistsError && <p className="emailError loginError">Email already exists</p>}
                    {errors.emailFormatError && <p className="emailError loginError">Invalid Email</p>}

                    <div className="input-box">
                        <i className='bx bxs-lock-alt'></i>
                        <input type="password" placeholder="Password" ref={passwordRef} onChange={() => setErrors({})} />
                    </div>
                    {errors.passwordLengthError && <p className="passwordError loginError">Password must be at least 6 characters long</p>}
                    {errors.incorrectCredentials && <p className="passwordError loginError">Incorrect credentials</p>}
                    {errors.requiredCredentialsError && <p className="passwordError loginError">Please fill in all fields</p>}

                    <button className="login-btn" onClick={!newUser ? handleLogin : handleRegister}>
                        {
                            newUser ? 'Register' : 'Login'
                        }
                    </button>

                    <p className="register">
                        {
                            newUser ? 'Already have an account?' : "Don't have an account?"
                        }
                        <button onClick={() => { setNewUser(!newUser); setErrors({}); setSuccessMessage(false) }} className='register-btn'>
                            {
                                newUser ? 'Login' : 'Register'
                            }
                        </button>
                    </p>

                    {
                        successMessage && <p className="successMessage">
                            User Registered Successfully. Please login to continue
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}