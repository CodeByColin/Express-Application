import express from 'express';

import pg from 'pg';

const {Pool} = pg;

const app = express();

const PORT = 3000;

const pool = new Pool({
    user: 'colin',
    host: 'localhost',
    database: 'bookstore',
    password: '',
    port: 5432,
})

app.use(express.json());


