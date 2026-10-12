import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './loginPage.css'

function ParkingLoginPage() {
    const navigate = useNavigate()

    const [customerUsername, setCustomerUsername] = useState("")
    const [customerPassword, setCustomerPassword] = useState("")

    const [activeForm, setActiveForm] = useState("customer");
    const [regName, setRegName] = useState("")
    const [regUsername, setRegUsername] = useState("")
    const [regPassword, setRegPassword] = useState("")

    const [adminUsername, setAdminUsername] = useState("")
    const [adminPassword, setAdminPassword] = useState("")

    function customerCheck(event) {
        event.preventDefault()
        axios.post("http://localhost:3000/customerCheck", {
            customerUsername: customerUsername,
            customerPassword: customerPassword
        })
            .then((res) => {
                alert("Customer Login Success")
                navigate('/userDashboard')
            })
            .catch((error) => {
                if (error.response?.status == 401) {
                    alert("Incorrect Username Or Password")
                }
                else{
                    alert("Server error",error)
                }
            })
    }

    function registerCustomer(event) {
        event.preventDefault();
        axios.post("http://localhost:3000/registerCustomer", {
            regName: regName,
            regUsername: regUsername,
            regPassword: regPassword,
        })
            .then((res) => {
                console.log("registeredUser", res.data)
                alert("Registered")
                setRegName("")
                setRegUsername("")
                setRegPassword("")
                setActiveForm("active")
            })
            .catch((error) => {
                console.log("Failed Register", error)
                alert("Register Error")
            })
    }

    function adminCheck(event) {
        event.preventDefault()
        axios.post('http://localhost:3000/adminCheck', {
            adminUsername: adminUsername,
            adminPassword: adminPassword
        })
            .then((res) => {
                alert("Admin Login Success")
                navigate('/adminDashboard')
            })
            .catch((error) => {
                console.log("Admin log Error", error.response?.data || error.message)
                if (error.response?.status == 401) {
                    alert("Incorrect Username Or Password")
                }
                else {
                    alert("Server or Database error")
                }
            })
    }

    return (
        <div className="app">
            <header className="header">
                <div className="brand">
                    <div className="brand-icon">♛</div>
                    <div>
                        <h1>Golden Shade Palace</h1>
                        <p>Fashion • Style • You</p>
                    </div>
                </div>
                <span className="tagline">Park Easy • Shop Happy</span>
            </header>

            <main className="main-content">
                <section className="welcome">
                    <span className="crown">♛</span>
                    <p>WELCOME TO</p>
                    <h2>Golden Shade Palace</h2>
                    <p className="description">
                        Book your parking slot easily while you shop!
                    </p>
                </section>

                <nav className="form-tabs">
                    <button
                        className={activeForm === "customer" ? "active" : ""}
                        onClick={() => setActiveForm("customer")}
                    >
                        Customer Login
                    </button>

                    <button
                        className={activeForm === "register" ? "active" : ""}
                        onClick={() => setActiveForm("register")}
                    >
                        Register Customer
                    </button>

                    <button
                        className={activeForm === "admin" ? "active" : ""}
                        onClick={() => setActiveForm("admin")}
                    >
                        Admin Login
                    </button>
                </nav>

                <section className="form-card">
                    {activeForm === "customer" && (
                        <>
                            <div className="form-icon">👤</div>
                            <h2>Customer Login</h2>
                            <p>Login to book your parking slot</p>

                            <form onSubmit={customerCheck}>
                                <input
                                    type="tel"
                                    placeholder="Username"
                                    value={customerUsername}
                                    onChange={(e) => setCustomerUsername(e.target.value)}
                                    required
                                />

                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={customerPassword}
                                    onChange={(e) => setCustomerPassword(e.target.value)}
                                    required
                                />

                                <button className="submit-btn" type="submit">
                                    Login
                                </button>
                            </form>

                            <p className="form-footer">
                                New customer?{" "}
                                <button
                                    className="text-btn"
                                    onClick={() => setActiveForm("register")}
                                >
                                    Register here
                                </button>
                            </p>
                        </>
                    )}

                    {activeForm === "register" && (
                        <>
                            <div className="form-icon">✚</div>
                            <h2>Register Customer</h2>
                            <p>Create your account to book parking</p>

                            <form onSubmit={registerCustomer}>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                    minLength={2}

                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={regUsername}
                                    onChange={(e) => setRegUsername(e.target.value)}
                                    minLength={3}
                                    required
                                />

                                <input
                                    type="password"
                                    placeholder="Create Password"
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    minLength={5}
                                    required
                                />

                                <button className="submit-btn" type="submit">
                                    Register
                                </button>
                            </form>

                            <p className="form-footer">
                                Already registered?{" "}
                                <button
                                    className="text-btn"
                                    onClick={() => setActiveForm("customer")}
                                >
                                    Login here
                                </button>
                            </p>
                        </>
                    )}

                    {activeForm === "admin" && (
                        <>
                            <div className="form-icon">♛</div>
                            <h2>Admin Login</h2>
                            <p>Manage parking slots and customer bookings</p>

                            <form onSubmit={adminCheck}>
                                <input
                                    type="text"
                                    placeholder="Admin Username"
                                    value={adminUsername}
                                    onChange={(e) => setAdminUsername(e.target.value)}
                                    required
                                />

                                <input
                                    type="password"
                                    placeholder="Admin Password"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    required
                                />

                                <button className="submit-btn" type="submit">
                                    Admin Login
                                </button>
                            </form>
                        </>
                    )}
                </section>
            </main>

            <footer className="footer">
                <h3>♛ Golden Shade Palace</h3>
                <p>Your Destination | Smart Parking Solution</p>
                <small>© 2026 Golden Shade Palace</small>
            </footer>
        </div>
    );
}

export default ParkingLoginPage;