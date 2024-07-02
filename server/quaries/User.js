import getConnection from '../config/mysql.js'

const User = {
    signup: async(id,first_name,last_name,username,email,password) => {
        const connection = await getConnection();
        try{
            const [result] = await connection.execute("INSERT INTO users(id,first_name,last_name,username,email,password) VALUES(?,?,?,?,?,?)",[id,first_name,last_name,username,email,password]);
            return result.insertId;
        }catch(error){
            console.log(error.message);
        }finally{
            if(connection){
                connection.end();
            }
        }
    },
    login: async() => {
        
    },

    findById: async(id) => {
        const connection = await getConnection();
        try{
            const [rows] = await connection.execute("SELECT * FROM users where id=?",[id]);
            const user = rows[0];
            return user;
        }catch(error){
            console.log(error.message);
        }finally{
            if(connection){
                connection.end();
            }
        }
    }
}

export default User