import mysql from 'mysql2';
import fs from 'fs';

const dbconn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    port: 3306,
    connectTimeout: 30000,
    ssl: {
        //rejectUnauthorized: false
        ca:  fs.readFileSync('DigiCertGlobalRootCA.crt.pem')
    }
});

dbconn.connect(err => {
    if(err) {
        console.error("Database connection error");
    } else {
        console.log("Database connected!");
    }
});
export default dbconn;