

let inp=document.getElementById("inp");
let sub=document.getElementById("sub");
let card=document.querySelector(".card");
let accesskey="YOUR_API_KEY_HERE";

sub.addEventListener("click",async()=>{

    let city=inp.value.trim();

    if(city){
       let wd = await weatherdata(city);
        if (wd) {
            
            let oldError = document.querySelector(".errorDisplay");
            if (oldError) oldError.remove();

            displayweather(wd);}
    }
    else{
        displayerror("please enter  some correct city");
    }

});

async function weatherdata(city){
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${accesskey}`;
    let response=await fetch(url);
    
    if(!response.ok){
        displayerror("it is not valid city")
        return null;
    }
    return await response.json();



}
function displayweather(data){
 
    let olddes=document.querySelector(".display");
    if(olddes){
        olddes.remove();
    }
    let oldemoji=document.querySelector(".wheatherEmoji");
    if(oldemoji){
        oldemoji.remove();
    }let oldc=document.querySelector(".cityname");
    if(oldc){
        oldc.remove();
    }
    let oldtemp=document.querySelector(".temperature");
    if(oldtemp){
        oldtemp.remove();
    }
    let oldhumidity=document.querySelector(".humidity");
    if(oldhumidity){
        oldhumidity.remove();
    }
      let oldError = document.querySelector(".errorDisplay");
    if(oldError) oldError.remove();
    

    let c=document.createElement("h1");
    c.classList.add("cityname");
    c.textContent=data.name;
    card.appendChild(c);
    
    let temp=document.createElement("p");
    temp.classList.add("temperature");
    temp.textContent=(data.main.temp-273.15).toFixed(2)+"℃";
    card.appendChild(temp);

    let humidity=document.createElement("p");
    humidity.classList.add("humidity");
    humidity.textContent=`humidity: ${data.main.humidity} %`;
    card.appendChild(humidity);

    let des=document.createElement("p");
    des.classList.add("display");
    des.textContent=data.weather[0].description;
    card.appendChild(des);

    let emoji=document.createElement("p");
    emoji.classList.add("wheatherEmoji");
    emoji.textContent=getweatheremoji(data.weather[0].id);
    card.appendChild(emoji);
    

}
function getweatheremoji(id){
    switch(true){
        case (id>=200 && id<300):{
            return "⛈️";
            
        
        }
        case (id>=300 && id<400):{
            return '\uD83C\uDF27\uFE0F';
            
        }
        
        case (id>=500 && id<600):{
            return '\uD83C\uDF27\uFE0F';
            
        }
         case (id>=600 && id<700):{
            return '❄️';
            
        }
         case (id>=700 && id<800):{
            return '🍃';
            
        }
        case(id==800):{

            return '☀️';
        }
        case(id>800):{
            return '☁️';
        }
            
    }
}


function displayerror(e){
     let oldError=document.querySelector(".errorDisplay")
     if(oldError){
        oldError.remove();
     }
        
    let msg=document.createElement("p");
    msg.textContent=e;
    msg.classList.add("errorDisplay");
    card.appendChild(msg);
    
}