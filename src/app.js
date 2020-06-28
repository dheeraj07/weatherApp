const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');
const { query } = require('express');
const weather = require('../public/utils/weather');
const quote = require('../public/utils/quote');

const rootDir = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname,'../public/templates/views');
const partials = path.join(__dirname,'../public/templates/partials');

const app = express();

app.use(express.static(rootDir));

app.set('view engine','hbs'); 
app.set('views',viewsDir);
hbs.registerPartials(partials);

app.get('',(req,res) => {
    res.render('index',{
        title:"weatherApp"
    });
})

app.get('/quotes',(req,res) => {
    const selectQuote = Math.floor(Math.random() * Math.floor(900));
    quote("quotes",selectQuote,(error,response) => { 
        if(response)
        {
            res.send({quote:response.quoteRes,author:response.author});
            // res.render('quotes',{
            //     quoteRes:response.quoteRes,
            //     author: response.author
            // })
        }
        else
        {
            res.send({error:error});
        //    res.render('error',{
        //        errorMessage:error
        //    })
        }
    }); 
});

app.get('/weather',(req,res) => {
    res.render('weather',{title:"Weather"});
});

app.get('/weatherDetails',(req,res) => {
    if(req.query.address)
    {
        weather(req.query.address,(error,body)=>{
           if(error) res.send({error:error});
           else res.send({details:body});
        })
    }
    else  res.send({error:"Please enter the address"});
});


app.get('/help',(req,res) => {
    res.render('help',{
        title:"Help",
        author:"Dheeraj"
    });
});

app.get('/help/*',(req,res) => {
    res.render('error',{
        errorMessage:'Help page found'
    });
});

app.get('*',(req,res) => {
    res.render('error',{
        errorMessage:'404 - Page not found'
    });
})

app.listen(3000,()=>{
    console.log("Server has started");
});