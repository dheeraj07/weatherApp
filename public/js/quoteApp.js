let quoteButton = document.querySelector('#getQuote');
let quoteMsg = document.querySelector("#mainQuote");
let author = document.querySelector("#author");

quoteButton.addEventListener('click',(e)=>{
    renderQuote();
});
window.onload = renderQuote();



function renderQuote()
{
    console.log("cameinside")
    quoteMsg.textContent = "";
    author.textContent = "";
    fetch("/quoteDetails").then((response) =>{
        response.json().then((data)=>{
            if(data.error)
            {
                quoteMsg.textContent = "Sorry for that!! API calls might have been exhausted, try loading this page tommorow. Anyway, Thanks for looking into my first Node project."
            }
            else 
            {
                quoteMsg.textContent = data.quote;
                author.textContent = "- "+data.author;
            }
        })
    })
}