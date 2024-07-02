import { v4 as uuidv4 } from 'uuid'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { isEmpty, isValidUsername,isValidEmail,isValidPassword } from '../../validation/index.js'
import User from '../../quaries/User.js'

export const signup = async(req, res) => {
    const {first_name,last_name,username,email,password} = req.body;
    try{
        if(isEmpty(first_name) || 
           isEmpty(last_name) ||
           isValidUsername(username) ||
           isValidEmail(email) || 
           isValidPassword(password)
        ){
            return res.status(400).json({ success:false, message: 'Invalid Data' });
        }

        const id = uuidv4();
        const hashedPassword = await bcryptjs.hash(password, 10);
        const insertId = User.signup(id,first_name,last_name,username,email,hashedPassword);
        const user = User.findById(insertId);
        const token = jwt.sign({ id: id }, JWT_SECRET, { expiresIn: '1hr' });
        return res.status(201).json({
            success: true,
            message: 'User created',
            data:{
                user: user,
                token: token
            }
        })

    }catch(error){
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const login = (req, res) => {

}