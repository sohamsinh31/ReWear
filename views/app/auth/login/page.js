"use client";
import React, { useState } from "react";
import { toast } from 'react-hot-toast'
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';


const AuthPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        imageFile: File
    });

    const router = useRouter();


    const API_BASE = process.env.NEXT_PUBLIC_BACKAND;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Login failed");

            Cookies.set("token", data.token, { expires: 7 });
            Cookies.set("role", data.userData.role, { expires: 7 });

            toast.success(`Welcome ${data.userData.name}`);

            setTimeout(() => {
                router.push("/"); // Redirect to dashboard page
            }, 1500);

        } catch (err) {
            toast.error("Login failed: Invalid Credentials");
        }
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", registerData.name);
            formData.append("email", registerData.email);
            formData.append("password", registerData.password);
            formData.append("address", registerData.address);
            if (registerData.imageFile) {
                formData.append("imageFile", registerData.imageFile);
            }

            const res = await fetch(`${API_BASE}/api/auth/register`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data);
            alert("Registration successful! Please login.");
            setIsRegistering(false);
        } catch (err) {
            alert("Registration failed: " + err.message);
        }
    };


    const containerStyle = {
        backgroundImage: 'url("/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const cardStyle = {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        width: '300px',
        textAlign: 'left',
        color: 'black'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4c6ef5',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    };

    const toggleStyle = {
        marginTop: '15px',
        color: '#4c6ef5',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'center',
        width: '100%',
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={{ textAlign: "center" }}>{isRegistering ? "Register" : "Login"}</h2>

                {isRegistering ? (
                    <form onSubmit={handleRegister}>
                        <label>Full Name:</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            style={inputStyle}
                            value={registerData.name}
                            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                            required
                        />
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            style={inputStyle}
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            required
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            style={inputStyle}
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            required
                        />
                        <label>Address:</label>
                        <input
                            type="text"
                            placeholder="Enter address"
                            style={inputStyle}
                            value={registerData.address}
                            onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                        />

                        <label>Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            style={inputStyle}
                            onChange={(e) => setRegisterData({ ...registerData, imageFile: e.target.files[0] })}
                        />
                        <button type="submit" style={buttonStyle}>Register</button>
                        <button type="button" onClick={() => setIsRegistering(false)} style={toggleStyle}>Back to Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            style={inputStyle}
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            required
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            style={inputStyle}
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            required
                        />
                        <button type="submit" style={buttonStyle}>Login</button>
                        <button type="button" onClick={() => setIsRegistering(true)} style={toggleStyle}>
                            Don't have an account? Register
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
