//npx express-generator
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";
import conn from './lib/connectiondb.js';
import dotenv from 'dotenv';

dotenv.config();

import peliculasRouter from "./routes/peliculas.js";
import generosRouter from "./routes/generos.js";


var app = express();

// Setup APP
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup DB
conn.db.connect(function(err){
    if(err) throw err;
});

// Routes
app.use("/peliculas", peliculasRouter);
app.use("/generos", generosRouter)

export default app;