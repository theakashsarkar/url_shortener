const router                   = require('express').Router();
const {check,validationResult} = require('express-validator');
const {generate}               = require('../utils/password');
const {User}                   = require('../utils/db');
const _p                       = require('../utils/promise_error');
const signupValidator = [
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({min:5})
]
router.post('/signup',signupValidator,async (req,res)=>{
    const errors = (validationResult(req));
        if(!errors.isEmpty()){
            return res
            .status(402)
            .json({errors:errors.array() })
        }
        let chenk = generate(req.body.password);
        let password = `${chenk.salt}.${chenk.hash}`;
        let {name,email} = req.body;
        let [ucErr,userCreate] = await _p(User.create({
            name,email,password
        }));
        if(ucErr && !userCreate){
            res.status(400).json({error:true,message:ucErr.message});
        }
        else{
            res.json({error:false,message:"user create"});
        }
})
module.exports = router;