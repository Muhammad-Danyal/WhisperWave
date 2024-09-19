import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import usersRoutes from "./routes/user.route.js";
import connectdb from "./connection.js";
import { app, server } from "./socket/socket.js"

dotenv.config();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/auth', authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",usersRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")));
console.log(__dirname);


app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


server.listen(PORT,()=>{
    connectdb();
    console.log(`Server is listening at ${PORT}`)
});