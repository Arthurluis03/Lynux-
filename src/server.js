import express from "express";
import "./bot.js";

const app = express()

app.get("/", (req, res)=>{
    res.send('Lynux Funcionando!')
})

app.listen(3000, ()=>{ 
    console.log("🌐 Servidor: http://localhost:3000");
})
