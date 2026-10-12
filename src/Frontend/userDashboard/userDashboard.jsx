import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./userDashboard.css";

function UserDashboard() {

    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [userPhone, setUserPhone] = useState("")
    const [vehNumber, setVehNumber] = useState("")
    const [vehType, setVehType] = useState("")
    const [vehParkDate, setvehParkDate] = useState("")
    const [vehEntrytime, setVehEntrytime] = useState("")

    function registerParking(event) {
        event.preventDefault();
        axios.post('http://localhost:3000/registerParking', {
            userName: userName,
            userPhone: userPhone,
            vehNumber: vehNumber,
            vehType: vehType,
            vehParkDate: vehParkDate,
            vehEntrytime: vehEntrytime,

        })
            .then((res) => {
                console.log("Parking Booked Successfully")
                setUserName("");
                setUserPhone("");
                setVehNumber("");
                setVehType("");
                setvehParkDate("");
                setVehEntrytime("");
                alert("Parking Booked")
            })
            .catch((error) => {
                console.error(
                    "Parking registration error:",
                    error.response?.data || error.message
                );
                alert(
                    error.response?.data?.message ||
                    "Parking registration failed. Check the backend terminal."
                );
            });

    }
    function logout() {
        navigate('/')
    }

    return (
        <div className="user-dashboard">
            <header className="user-header">
                <div>
                    <h1>♛ Golden Shade Palace</h1>
                    <p>Smart Parking Solution</p>
                </div>
                <span className="user-badge">Customer Dashboard</span>
                <button id="logoutBtn" onClick={logout}>Logout</button>
            </header>

            <main className="user-main">
                <section className="user-welcome">
                    <h2>Welcome to Your Dashboard!</h2>
                    <p>Register your vehicle and reserve your parking.</p>
                </section>

                <section className="parking-card">
                    <h2>Register Parking</h2>
                    <p className="parking-description">
                        Enter your details to register a parking.
                    </p>

                    <form onSubmit={registerParking}>
                        <div className="form-group">
                            <label>Customer Name</label>
                            <input
                                type="text"
                                name="customerName"
                                placeholder="Enter your full name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter phone number"
                                pattern="[0-9]{10}"
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value)}
                                maxLength={10}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Vehicle Number</label>
                            <input
                                type="text"
                                name="vehicleNumber"
                                value={vehNumber}
                                onChange={(e) => setVehNumber(e.target.value)}
                                placeholder="e.g. TN57AB1234"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Vehicle Type</label>
                            <select
                                name="vehicleType"
                                onChange={(e) => setVehType(e.target.value)}
                                required
                            >
                                <option value="">Select Vehicle Type</option>
                                <option value="4-Wheeler">4 - Wheeler</option>
                                <option value="2-Wheeler">2 - Wheeler</option>
                                <option value="others">Others</option>

                            </select>
                        </div>

                        <div className="form-group">
                            <label>Parking Date</label>
                            <input
                                type="date"
                                name="parkingDate"
                                min={new Date().toLocaleDateString("en-CA")}
                                value={vehParkDate}
                                onChange={(e) => setvehParkDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="time-row">
                            <div className="form-group">
                                <label>Entry Time</label>
                                <input
                                    type="time"
                                    name="entryTime"
                                    value={vehEntrytime}
                                    onChange={(e) => setVehEntrytime(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="parking-submit">
                            Register Parking
                        </button>
                    </form>
                </section>
            </main>

            <footer className="user-footer">
                © 2026 Golden Shade Palace | Smart Parking Solution
            </footer>
        </div>
    );
}

export default UserDashboard;