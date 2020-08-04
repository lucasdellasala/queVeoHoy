import mysql from 'mysql';

const db = mysql.createConnection({
  host:"localhost", 
  port: "3306",
  user: "root",
  password: "password",
  database: "queveohoy",
  multipleStatements: true
});

export default {db};