import { v4 as uuidv4 } from 'uuid'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import getConnection from '../../config/mysql.js'
import userTable from '../../models/users.js'
import { isEmpty, isValidUsername, isValidEmail, isValidPassword } from '../../validation/index.js'
import { User } from '../../quaries/index.js'

export const signup = async (req, res) => {
    const { username, first_name, last_name, email, password } = req.body;
    if( isEmpty(first_name) ||
        isEmpty(last_name) ||
        !isValidUsername(username) ||
        !isValidEmail(email) ||
        !isValidPassword(password)
    ){
        return res.status(400).json({ success: false, message: "Invalid Data" });
    }
    const connection = await getConnection();

    try {
        await connection.execute(userTable);
        const [existingUser] = await connection.execute(User.findByEmailOrUsername, [email,username]);
        if(existingUser.length > 0){
            return res.status(400).json({ success: false, message: "User already exist" });
        }

        const id = uuidv4();
        const hashPassword = await bcryptjs.hash(password,10);
        await connection.execute(User.create, [id,username,first_name,last_name,email,hashPassword]);
        const [rows] = await connection.execute(User.findById, [id]);
        const user = rows[0];

        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        return res.status(201).json({
            success: true,
            message: 'User created',
            data: {
                user: user,
                token: token
            }
        });

    } catch (error) {
        console.log(error)
        throw new Error('signup(): ', error);
    } finally{
        if(connection){
            connection.end();
        }
    }
}

export const login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    const isEmail = usernameOrEmail.includes('@');
    if (isEmail) {
        if (!isValidEmail(usernameOrEmail)) {
            return res.status(400).json({ success: false, message: 'Invalid Email' });
        }
    } else {
        if (!isValidUsername(usernameOrEmail)) {
            return res.status(400).json({ success: false, message: 'Invalid Username' });
        }
    }
    const connection = await getConnection();

    try {
        let query;
        isEmail
            ? query = User.findByEmail
            : query = User.findByUsername

        const [existingUser] = await connection.execute(query, [usernameOrEmail]);
        if(existingUser.length === 0){
            return res.status(400).json({ success: false, message: 'Incorrect username/email or Password' });
        }
        const user = existingUser[0];
        const isMatched = await bcryptjs.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({ success: false, message: 'Incorrect username/email or Password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        return res.status(200).json({
            success: true,
            message: 'User logged in',
            data: {
                user: user,
                token: token
            }
        });
    } catch (error) {
        throw new Error(`login(): ${error.message}`);
    } finally {
        if(connection){
            connection.end();
        }
    }
};