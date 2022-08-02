var express = require('express');
var router = express.Router();
var userHelpers = require('../helpers/user-helper')
// let emails = [{ email: 'a@email.com', password: '123' }, { email: 'b@email.com', password: '123' }, { email: 'c@email.com', password: '123' }]
let email = "";
let password = "";

/* GET home page. */
router.get('/', function (req, res, next) {

  let user = req.session.user

  let products = [{ name: "Iphone 13", category: "Smart Phone", description: "Show me you are rich", Image: "https://m.media-amazon.com/images/I/315vs3rLEZL.jpg" },
  { name: "Samsung s22 ultra", category: "Smart Phone", description: "Show me you are wise", Image: "https://m.media-amazon.com/images/I/71PvHfU+pwL._SL1500_.jpg" },
  { name: "Mi 12 pro", category: "Smart Phone", description: "Show me you are smart", Image: "https://specifications-pro.com/wp-content/uploads/2021/10/Xiaomi-Mi-12-Pro-1.jpg" },
  { name: "Iquoo 8", category: "Smart Phone", description: "Show me you are pro", Image: "https://www.gizmochina.com/wp-content/uploads/2021/08/vivo-iqoo-8-01.jpg" }

  ]
  res.render('index', { Name: 'Home', item1: "Home", item2: "Link", Action1: "Login", products, user });
  
});
router.get('/login', (req, res) => {

  if (req.session.loggedIn) {
    res.redirect('/')

  }
  else {

     res.render('login',{"loginErr":req.session.userLoginErr})
     req.session.userLoginErr=false

    
  

  }
})
router.post('/login', function (req, res) {

  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.userLoginErr="invalid user name or password"
      res.redirect('/login')
    }
  })

})
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')

  }
  else {
    
    res.render('signUp')

    
  

  }
})
router.post('/signup', (req, res) => {

  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
  })

  req.session.loggedIn = true
  req.session.user = req.body
  res.redirect('/')
})
module.exports = router;
