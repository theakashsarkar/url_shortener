const router                   = require('express').Router();
const {check}                  = require('express-validator');
const {generate}               = require('../utils/password');
const {User}                   = require('../utils/db');
const _p                       = require('../utils/promise_error');
const rejectInvalid            = require('../middlewares/rejectInvalid');
const signupValidator = [
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({min:5})
]
router.post('/signup',signupValidator,rejectInvalid,async (req,res,next)=>{
        let chenk = generate(req.body.password);
        let password = `${chenk.salt}.${chenk.hash}`;
        let {name,email} = req.body;
        let [ucErr,userCreate] = await _p(User.create({
            name,email,password
        }));
        if(ucErr && !userCreate){
            return next(ucErr);
        }
        else{
            res.json({error:false,message:"user create"});
        }
})
module.exports = router;