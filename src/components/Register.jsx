import React, { useState } from 'react';
import '../css/register.css';
import { Link } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Get existing users or start fresh
        const existingUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    
        // Check if email already exists
        const userExists = existingUsers.find(user => user.email === formData.email);
        if (userExists) {
            alert("User already exists with this email.");
            return;
        }
    
        // Add new user
        const updatedUsers = [...existingUsers, formData];
        localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
    
        // Save the current user in localStorage
        localStorage.setItem("currentUser", JSON.stringify(formData));  // Save currentUser
    
        alert("Registration successful!");
    
        // Redirect to home page
        window.location.href = "/home";  // Redirect to home page after registration
    };
    

    return (
        <div className="container full-height d-flex justify-content-center align-items-center">
            <div className="card card-width">
                <h4 className="card-header py-4">Register</h4>
                <div className="card-body d-flex flex-column gap-3">
                    <form id="register-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="fullname" className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="fullname"
                                className="form-control"
                                id="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="email" className="form-label mt-3">Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="email"
                                value={formData.email}
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
                                minLength="8"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Register Now
                        </button>
                    </form>
                    <p className="text-end pe-2">
                        Already have an account?
                        <Link className="text-decoration-none" to="/"> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
