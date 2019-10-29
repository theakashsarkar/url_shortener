const Sequelize = require('sequelize');

const CONNCTION_STRING = process.env.DATABASE || 'postgres://postgres:8821025@localhost:5432/lwhh'

const db = new Sequelize(CONNCTION_STRING);
const User = db.define('users',{
    name:Sequelize.TEXT,
    email:{
      type:Sequelize.TEXT,
      unique:true
    },
    password:Sequelize.TEXT

});
const Direction = db.define('direction',{
    user_id:Sequelize.NUMERIC,
    destination:Sequelize.TEXT,
    hash:Sequelize.TEXT
});

  db.sync({force:true})
   .then(e => {
     console.log('Database Synced');
   })
   .catch(e => {
     console.error(e.message);
});
module.exports={db,User,Direction}