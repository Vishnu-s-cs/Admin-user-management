const { response } = require('express');
var express = require('express');
var router = express.Router();
var userHelpers = require('../helpers/user-helper')
/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    let user = req.session.user
    let flag= true
  if (user.admin==true) {
    userHelpers.getUsers().then((users)=>{
      res.render('index', { Name: 'Admin', item1: "Home",Action1: "Login", user, users, h1:"Users", col1:"Name", col2:"Email",flag});
      
    })
  }
  else
 { 
  res.redirect("/login")
}
    
  } catch (error) {
    res.redirect("/login")
  }
  
 
});
router.get('/edit-user',async (req,res)=>{
  let userId=req.query.id
  
  let user=await userHelpers.userDetails(userId)
  res.render('edit-users',{user})
  })
  router.post('/edit',(req,res)=>{
    let userId=req.query.id
    console.log(req.body);
    userHelpers.updateProducts(userId,req.body).then(()=>{
      res.redirect('/admin')
    })
  })
  router.get('/delete-user',(req,res)=>{
    let userId=req.query.id
    userHelpers.deleteProduct(userId).then((response)=>{
      res.redirect("/admin")
    })
  })
  router.get('/add-user',(req,res)=>{
    res.render('add-user')
  })
  router.post('/add-user',(req,res)=>{
  
    userHelpers.addUser(req.body).then((response)=>{
      res.redirect("/admin")
    })
    
  })  
module.exports = router;
