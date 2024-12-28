import React, { useContext } from 'react';
import './LoginPage.css';
import { useState, useRef } from 'react';
import ChatbotContext from '../../context/chatbotContext/ChatbotContext';

import 'boxicons/css/boxicons.min.css';

export default function LoginPage({loginPage, setLoginPage}) {
    const {userName, setUserName} = useContext(ChatbotContext);

    const [errors, setErrors] = useState({
        userNameNotFound: false,
        userNameAlreadyExists: false,
        invalidUserName: false,
        emailError: false,
        passwordError: false,
        incorrectCredentials: false
    });

    const [newUser, setNewUser] = useState(false);

    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleRegister = (e) => {
        e.preventDefault();

    }

    const handleLogin = (e) => {
        e.preventDefault();
        
        if(userNameRef.current.value === '' || passwordRef.current.value === '') {
            setErrors({...errors, incorrectCredentials: true});
            return;
        }
    }

    return (
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
                    <input type="text" placeholder="Username" ref={userNameRef} onChange={()=>setErrors({})} />
                </div>
                    {errors.userNameNotFound && <p className="userNameError loginError">User not found</p>}
                    {errors.userNameAlreadyExists && <p className="userNameError loginError">Username already exists</p>}
                    {errors.invalidUserName && <p className="userNameError loginError">Username cannot contain spaces</p>}

                {
                    newUser &&
                    <div className="input-box">
                        <i className='bx bxs-envelope'></i>
                        <input type="email" placeholder="email" ref={emailRef} onChange={()=>setErrors({})}/>
                    </div>
                    }{errors.emailError && <p className="emailError loginError">Email already exists</p>
                }

                <div className="input-box">
                    <i className='bx bxs-lock-alt'></i>
                    <input type="password" placeholder="Password" ref={passwordRef} onChange={()=> setErrors({})}/>
                </div>
                    {errors.passwordError && <p className="passwordError loginError">Password must be at least 6 characters</p>}
                    {errors.incorrectCredentials && <p className="passwordError loginError">Incorrect credentials</p>}

                <button className="login-btn" onClick={!newUser ? handleLogin : handleRegister}>
                    {
                        newUser ? 'Register' : 'Login'
                    }
                </button>

                <p className="register">
                    {
                        newUser ? 'Already have an account?' : "Don't have an account?"
                    }
                    <button onClick={() => {setNewUser(!newUser); setErrors({})}} className='register-btn'>
                        {
                            newUser ? ' Login' : ' Register'
                        }
                    </button>
                </p>
            </div>
        </div>
    )
}
