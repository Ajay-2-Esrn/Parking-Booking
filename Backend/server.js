const mysql = require("mysql2/promise")
require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.post('/registerCustomer', async (req, res) => {
    let DB;
    try {
        DB = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        const { regName, regUsername, regPassword } = req.body
        const regCustomerSql = `INSERT INTO parkingcustomers (name,username,password) VALUES (?,?,?)`
        const [registeredCustomer] = await DB.execute(regCustomerSql, [regName, regUsername, regPassword])
        if (registeredCustomer.affectedRows >= 0) {
            res.status(201).json({
                message: "Register Success",
                customerId: registeredCustomer.insertId
            })
        }
        else {
            res.status(400).json({
                message: "Registeration Failed"
            })
        }
    } catch (error) {
        console.log("Registration Error", error)
        res.status(500).json({
            message: "Register Failed",
            error: error.message
        })
    }
    finally {
        if (DB) {
            await DB.end()
        }
    }
})

app.post('/adminCheck', async (req, res) => {
    let DB;
    try {
        DB = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        const { adminUsername, adminPassword } = req.body
        const adminCheckSql = `SELECT username,password FROM parkingadmin WHERE username=? AND password=?`
        const [adminData] = await DB.execute(adminCheckSql, [adminUsername, adminPassword])

        if (adminData.length > 0) {
            res.json({
                message: "Admin login Success"
            })
        }
        else {
            res.status(401).json({
                message: "Invalid Username or Password"
            })
        }
    } catch (error) {
        console.log("Admin login failed", error)
        return res.status(500).json({
            message: "Database Error"
        })
    }
    finally {
        if (DB) {
            await DB.end()
        }
    }
})

app.post('/customerCheck', async (req, res) => {
    let DB;
    try {
        DB = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        const { customerUsername, customerPassword } = req.body
        const customerCheckSql = `SELECT username,password FROM parkingcustomers WHERE username=? AND password=?`
        const [customerData] = await DB.execute(customerCheckSql, [customerUsername, customerPassword])
        console.table(customerData)
        if (customerData.length > 0) {
            res.json({
                message: "Customer Login Success"
            })
        }
        else {
            res.status(401).json({
                message: "Invalid Username or Password"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Customer Login Failed"
        })
    }
    finally {
        if (DB) {
            await DB.end()
        }
    }
})


app.post('/registerParking', async (req, res) => {
    let DB;

    try {
        DB = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const {
            userName,
            userPhone,
            vehNumber,
            vehType,
            vehParkDate,
            vehEntrytime
        } = req.body;

        const registerParkingSql = `
            INSERT INTO registeredparking
            (name, phone, veh_number, veh_type, veh_park_date, veh_entry_time)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [regParkingData] = await DB.execute(
            registerParkingSql,
            [
                userName,
                userPhone,
                vehNumber,
                vehType,
                vehParkDate,
                vehEntrytime
            ]
        );

        if (regParkingData.affectedRows > 0) {
            return res.status(201).json({
                message: "Parking Registered Successfully",
                parkingId: regParkingData.insertId
            });
        }

        return res.status(400).json({
            message: "Parking Registration Failed"
        });

    } catch (error) {
        console.error("Parking Registration Error:", error);

        return res.status(500).json({
            message: "Server error while registering parking"
        });

    } finally {
        if (DB) {
            await DB.end();
        }
    }
});

app.get('/showParkingList', async (req, res) => {
    let DB;
    try {
        DB = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const [parkingList] = await DB.query("SELECT id,name,phone,veh_park_date,veh_type,veh_number,veh_entry_time FROM registeredparking")
        res.json(parkingList)

    } catch (error) {
        res.status(400).json({
            message: "Server Error"
        })
    }
    finally {
        if (DB) {
            await DB.end()
        }
    }
})

app.put('/removeParking', async (req, res) => {
    let DB;
    try {
        DB = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const { parkingId } = req.body
        const parkingDeleteSql=`DELETE FROM registeredparking WHERE id=?`
        const [deletedParking]=await DB.execute(parkingDeleteSql,[parkingId])
        if(deletedParking.affectedRows>0){
            res.json({
                message:"Parking Deleted"
            })
        }
        else{
            res.json(404).json({
                message:"Invalid Parking"
            })
        }
    }
    catch (error) {
        console.log("Parking Delete Error",error)
        res.status(500).json({
            message: "Server Error"
        })
    }
    finally {
        if (DB) {
            await DB.end()
        }
    }
})

app.listen(3000, () => {
    console.log("Server Running at Port 3000")
})