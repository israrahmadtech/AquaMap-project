import React, { useState } from 'react';
import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    
        const matchedUser = allUsers.find(
            user => user.email === credentials.email && user.password === credentials.password
        );
    
        if (matchedUser) {
            alert("Login successful!");
            // Save current user in allUsers array
            localStorage.setItem("currentUser", JSON.stringify(matchedUser)); // Save current user too

            // Redirect to home/dashboard
            navigate("/home");  // You can create this route later
        } else {
            alert("Invalid email or password.");
        }
    };
    

    return (
        <div className="container full-height d-flex justify-content-center align-items-center">
            <div className="card card-width">
                <h4 className="card-header py-4">Login</h4>
                <div className="card-body d-flex flex-column gap-3">
                    <form id="login-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                            />
                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                minLength="8"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Login Now
                        </button>
                    </form>
                    <p>error</p>
                    <p className="text-end pe-2">New to our website?  
                        <Link className="text-decoration-none" to="/register"> Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
