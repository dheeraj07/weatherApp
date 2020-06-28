fetch('http://puzzle.mead.io/puzzle').then(response =>{
    response.json().then (data=>{
        console.log(data);
    })
});



const weather = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector("#message1");
const msg2 = document.querySelector("#message2");

weather.addEventListener('submit',(e)=>{
    e.preventDefault();
    const city = search.value;
    console.log(city);
    msg1.textContent = "Loading..."
    msg2.textContent = "";
    fetch("/weatherDetails?address="+city).then((response) =>{
    response.json().then((data)=>{
        if(data.error)
        {
            msg1.textContent = data.error;
        }
        else
        {
            msg1.textContent = "Location: "+data.details.place;
            msg2.textContent = "Temperature is "+ data.details.temperature+" degrees and "+data.details.weatherDescriptions
            console.log("Temperature at "+data.details.place+" is "+ data.details.temperature+" degrees and "+data.details.weatherDescriptions);
        }
   })
});

});