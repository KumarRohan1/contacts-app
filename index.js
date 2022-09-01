const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name:"Rohan",
        phone:"343651"
    },
    {
        name:"asdfg",
        phone:"5634564"
    },
    {
        name:"raj",
        phone: "36455615"
    }
]

app.get('/', function (req, res) {
   Contact.find({},function (err,contact){
       if(err){
           console.log('error in fetching contact');
           return;
       }
       return res.render('home',{
           title : "Contacts List",
           contact_list: contact
       });
   });
});

app.post('/create-contact',function (req,res){
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },function ( err,newContact){
        if(err){
            console.log('error in creating contact');
            return;}
        console.log('*******',newContact);
        return res.redirect('back');
    });
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
});