module.exports.isAdmin = (req, res, next) => {
const {role} = req.user

if (role == 'admin'){
    next()
}else{
    return res.status(403).json({
        error:{
            message:'ไม่มีสิทธิ์เข้าภึงไซต์นี้ เฉพาะผู้ดูแลระบบเท่านั้น'
        }
    })
    // 403 cant access to this site
}
}