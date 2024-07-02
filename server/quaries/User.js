import getConnection from '../config/mysql.js'

const User = {
    signup: async(id,username,first_name,last_name,email,password) => {
        const connection = await getConnection();
        try{
            let [result] = await connection.execute("INSERT INTO users(id,username,first_name,last_name,email,password) VALUES(?,?,?,?,?,?)",[id,username,first_name,last_name,email,password]);
            return id;

        }catch(error){
            throw new Error(`User.Signup(): ${error.message}`);
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
            throw new Error(`User.findById(): ${error.message}`);
        }finally{
            if(connection){
                connection.end();
            }
        }
    }
}

export default User