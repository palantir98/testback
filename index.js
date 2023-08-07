require('dotenv').config()
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");


app.use(cors());

const corsOptions = {
    origin: 'https://vehiculos.webforge.cl'
}

app.use(express.json());

const db = mysql.createConnection({
    host:"webforge.cl",
    user:"webforge_appVehiculos",
    password: process.env.PASS,
    database:"webforge_vehiculos_app"
});

db.connect((err) => {
    if (err) throw new Error(err);
    console.log("Conectado");
});

app.post("/create", cors(corsOptions), (req,res)=>{
    const vehiculo = req.body.vehiculo;
    const block = req.body.block;
    const departamento = req.body.departamento;
    const patente = req.body.patente;
    const estacionamiento = req.body.estacionamiento;
    const idqr = req.body.idqr;

    db.query('INSERT INTO vehiculos(Vehiculo,Block,Departamento,Patente,Estacionamiento,IDQR) VALUES(?,?,?,?,?,?)', [vehiculo,block,departamento,patente,estacionamiento,idqr],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Vehiculo registrado con exito!");
        }
    }
    );
});


const port = process.env.PORT;

app.listen(process.env.PORT, ()=>{
    console.log("Corriendo en el puerto" + port)
})