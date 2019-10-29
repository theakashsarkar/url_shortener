const router        = require('express').Route();
const {Direction}   = require('../utils/db');
const {check}       = require('express-validator');
const rejectInvalid = require('../middlewares/rejectInvalid');
const _p            = require('../utils/promise_error');

const entryValidator = [check('url').isURL()]
router.post('/api/v1/redirect',entryValidator,rejectInvalid,async(req,res,next) =>{
    
    let user_id     = req.user.id;
    let destination = req.body.url;
    let timeStamp   = Date.now()/1000;

    let hash = parseInt(`${user_id}${timeStamp}`).toString(32);
    let [ucErr,userCreate] = await _p(Direction.create({
        user_id,destination,hash
    }))
    if(ucErr && !userCreate){
        next(ucErr);
    }else{
        res.json({
            message:"Direction creted Successfully",
            hash
        })
    }


})