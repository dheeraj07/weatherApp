const request = require('request');
const chalk = require('chalk');


quote = (entity,quoteNo,callback) => {
    const quotesEndPoint = "https://type.fit/api/"+entity;
    request({url:quotesEndPoint,json:true},(error,response)=>{
        if(error)
        {
           callback("Please check your network connection, could not send a request to the quotes API"); 
        }
        else
        {
            const quoteRes = response.body[quoteNo].text;
            const author = response.body[quoteNo].author
            callback(undefined,{quoteRes,author});
        }
    });
}

module.exports = quote;
