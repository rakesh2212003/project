import mysql from 'mysql2/promise'

const getConnection = async() => {
    try{
        const pool = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        })
        return pool;
    }catch(error){
        console.log(`Mysql connection error: ${error.message}`);
    }
}

export default getConnection