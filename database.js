const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });