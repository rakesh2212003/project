export const User = {
    create: "INSERT INTO users(id,username,first_name,last_name,email,password) VALUES(?,?,?,?,?,?)",
    findById: "SELECT * FROM users WHERE deleted=0 AND id=?",
    findByEmail: "SELECT * FROM users WHERE deleted=0 AND email=?",
    findByUsername: "SELECT * FROM users WHERE deleted=0 AND username=?",
    findByEmailOrUsername: "SELECT * FROM users WHERE deleted=0 AND (email=? OR username=?)",
};