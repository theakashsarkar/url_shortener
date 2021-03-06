const {User}       = require('../utils/db');
const _p           = require('../utils/promise_error');
const router       = require('express').Router();
const jwt          = require('jsonwebtoken');
const {check}      = require('express-validator');
const {validate}   = require('../utils/password');
const rejectInvalid= require('../middlewares/rejectInvalid');
const {app_secret} = require('../config.json');

const loginValidator = [check('email').isEmail(),check('password').isLength({min:5})];
router.post('/login',loginValidator,rejectInvalid,async (req,res,next) =>{
    let {password,email} = req.body;
    let [uer,user] = await _p(User.findOne({
        where:{
            email
        }

    }));  
    if(!user && uer ){
        return next(uer);
    }else{
        //onsole.log(user.password);
        let [salt,hash] = user.password.split(".");
        let {email,password,id} = user;
        let valid = validate(password,hash,salt);
        if(valid){
            let token = jwt.sign({id,name,email},app_secret);
            res.json({
                error:false,
                token,
                user:{
                    id,name,email
                }
            });
        }
        else{
            next(new Error("password invalid"));
        }
    }  
})
module.exports = router;

