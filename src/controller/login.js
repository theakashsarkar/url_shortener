const {User}       = require('../utils/db');
const _p           = require('../utils/promise_error');
const router       = require('express').Router();
const jwt          = require('jsonwebtoken');
const {check,validationResult}      = require('express-validator');
const {validate}   = require('../utils/password');
const {app_secret} = require('../config.json');

const loginvalidator = [check('email').isEmail,check('password').isLength({min:5})];
router.post('/login',loginvalidator,async (req,res) =>{
    const errors = (validationResult(req));
        if(!errors.isEmpty()){
            return res
            .status(402)
            .json({ errors: errors.array()});
        }
    let {password,email} = req.body;
    let [uerr,user] = await _p(User.findOne({
        where:{
            email
        }

    }));  
    if(uer && !user){
        res.status(402).json({error:true, message:"user not found"});
    }else{
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
            res.status(402).json({error:true,message:"Password incorrect"})
        }
    }  
})
module.exports = router;

