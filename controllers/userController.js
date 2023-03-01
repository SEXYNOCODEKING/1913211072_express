const User = require("../model/user")
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/index')


exports.register = async (req, res, next) => {
    try{
    const {name, email, password} = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("The infomation recieved is wrong. / ข้อมูลผิดพลาด")
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    }
    
    const existemail = await User.findOne({email: email})

    if(existemail){
        const error = new Error("E-mail is already in the system. / มีอีเมลล์นี้ในระบบแล้ว")
        error.statusCode = 400;
        throw error;
    }

    let user = new User();
    user.name = name
    user.email = email
    user.password = await user.encryptPassword(password)

    await user.save()
    res.status(200).json({
        message: "Registered. / ลงทะเบียนเรียบร้อย"
    })
    } catch (error){
    next(error)
    }
}

//user login
exports.login = async(req, res, next) => {
    try{
    const {email, password} = req.body

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("The infomation recived is wrong. / ข้อมูลผิดพลาด")
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    }


    const user = await User.findOne({email: email})

    if(!user){
        const error = new Error("E-mail is not exist in the system. / อีเมลล์ไม่มีในระบบ")
        error.statusCode = 404;
        throw error;
    }

    //check password
    const isValid = await user.checkPassword(password)

    if(!isValid){
        const error = new Error("Wrong password. / รหัสผ่านไม่ถูกต้อง")
        error.statusCode = 401;
        throw error;
    }

    //creat token
    const token = await jwt.sign({
        id: user._id,
        role: user.role,
    }, config.KEY, { expiresIn: "5 days"})

    const expires_in = jwt.decode(token) 

    res.status(200).json({
        access_token: token,
        expires_in: expires_in.exp,
        token_type: 'Bearer'
    });

    } catch (error){
    next(error)
    }
} 

exports.getuser = async (req, res, next) => {

    const prof = await User.findOne()
    res.status(200).json({
        data : prof
    })
}

//user edit data
exports.update = async (req, res, next) => {

    try{
        const {name, email, role} = req.body

        const existuser = await User.findOne({email: email})

    if(!existuser){
        const error = new Error("This is not exsist in the system. / ผู้ใช้งานนี้ไม่มีในระบบ")
        error.statusCode = 404;
        throw error;
    }

        const user = await User.updateOne({email : email},{
            name: name,
            email: email,
            role: role
        });
    
        res.status(200).json({
            message: 'Data updated. / แก้ไขข้อมูลเรียบร้อยแล้ว'
        });
    } catch (error){
        next(error)
    }
}

//delete user
exports.deleteuser = async (req, res, next) => {

    try{
        const {email} = req.body

        const user = await User.deleteOne({email : email});

        if(user.deletedCount === 0){
            const error = new Error('This user is not in the system. / ไม่พบข้อมูลผู้ใช้งาน')
            error.statusCode = 400
            throw error;
        }else {
            return res.status(200).json({ 
                message: 'Data deleted. / ลบข้อมูลเรียบร้อยแล้ว',
            });
        }

    } catch(error){
        next(error)
    }
}