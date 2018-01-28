const express=require('express');
var hbs=require('hbs');
var fs=require('fs');
var app=express();

const port =process.env.PORT || 3000;
app.set('view engine','hbs');
hbs.registerPartials(__dirname +'/views/partials');
//app.use(express.static(__dirname +'/public'));
//Adding a middleware
//-------
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}:${req.method}: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err)
    {
      console.log('Unable To log Server.');
    }
  });
  next();
});
//--------
//Adding a Maintenance page middleware
// app.use((req,res,next)=>{
//   res.render('main.hbs');
// });
app.use(express.static(__dirname +'/public'));
app.get('/',(req,res)=>{
  //lstening a html data
  //res.send('<h1>Hello Devanshu!</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMsg:'Welocme to Express Home Page'
  });
});
//json data
app.get('/json',(req,res)=>{

});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear: new Date().getFullYear()
  });
});
app.listen(port,(err)=>{
  if(err)
  {
    console.log('Unable to connect to Port');
  }else {
    console.log(`Server is set to port ${port}.`);
  }
});
//When Express doesn't have some functionality we can allow it and make it by adding middleware.
