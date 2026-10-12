import { useEffect } from 'react'
import axios from 'axios'
import './adminDashboard.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
function AdminDashboard() {
    const navigate = useNavigate()
    const [parkingList, setParkingList] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/showParkingList')
            .then((res) => setParkingList(res.data))
            .catch((error) => {
                console.log("List Empty")
            })
    }, [])
    function removeParking(parkingId) {
        axios.put('http://localhost:3000/removeParking', {
            parkingId: customerId
        })
            .then((res) => {
                setParkingList((previousList) =>
                    previousList.filter((member) => member.id !== parkingId))
                console.log("Deleted", res.data)
            })
            .catch((error) => {
                alert("Delete Failed")
            })
    }
    function logout() {
        navigate('/')
    }
    return (
        <>
            <header className="admin-header">
                <div>
                    <h1>♛ Golden Shade Palace</h1>
                    <p>Smart Parking Solution</p>
                </div>
                <span className="admin-badge">Customer Dashboard</span>
                <button id="logoutBtn" onClick={logout}>Logout</button>
            </header>
            <h2 style={{ margin: "10px 30px" }}>Registered Parking List</h2>
            <table cellSpacing="20px">
                <tbody>
                    <tr>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>VEHICLE TYPE</th>
                        <th>VEHICLE NUMBER</th>
                        <th>PARKING DATE</th>
                        <th>ENTRY TIME</th>
                        <th></th>
                    </tr>
                    {
                        parkingList.map((member) => (
                            <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>{member.phone}</td>
                                <td>{member.veh_type}</td>
                                <td>{member.veh_number}</td>
                                <td>{member.veh_park_date}</td>
                                <td>{member.veh_entry_time}</td>
                                <td><button id='removeParking' onClick={() => removeParking(member.id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
export default AdminDashboard;