
// service worker registration
// IIFE function
(() => {
  if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => 
  {
     navigator.serviceWorker.register('service-worker.js').
      then((registration) => 
    {
      console.log('registered');
      console.log(registration);
  }
  ,(err) => 
  {
  console.log(err);
  });
  });
  }
   else
    {
  alert('No service worker support in this browser');
    }
  })();


//tips to refactoring 
// since we have more than 2 functions, using classes will make the codes more elegant and structure,
// watch out for my next commits
var date = new Date();
var hour = date.getHours();
console.log( hour)
 async function fetchData(city)
  {
          await fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=d518a27f8089535112a0db5f6822a09b')
          .then((response)=> response.json()).then(
          function(response)
          {
          var city2 = city;
          var country = response.sys.country;
          var weather = response.weather[0].main;
          var temp = response.main.temp;
          var pressure = response.main.pressure;
          var windSpeed = response.wind.speed;  
          console.log(city2 +'  '+ country + '  '+weather +'  '+pressure +'   '+ windSpeed) // check if deliverd to the console
          copyData(city2,country,weather,temp,pressure,windSpeed);
        } ).catch((err)=> console.log("An error occured, failed to fetch data"))
  }

  var call= document.getElementById('button');


  call.addEventListener('click',function()
  {
    var tell=document.getElementById("alert");

    var value=document.getElementById('search').value;
    storage.setCity(value);
    
    if(value.length==0){
        
        tell.style.visibility="visible";
        tell.textContent="Kindly enter a city name to check for weather data"
    }
    else{
        tell.textContent='';
        tell.style.visibility="hidden"
      fetchData(value);
    }
  },false);


  // collects all informations and process the type of video to load.
function copyData(city2,country,weather,temp,pressure,windSpeed)
{
    var container= document.getElementById('videoTag');  // this is the video tag
    var source= document.getElementById('srcMp4'); 
   giveInfo(city2,country,weather,temp,pressure,windSpeed);
      
     function loadVideo(state)
    {
    
      if(state=='Clear' && (hour>=0 && hour<=7)||(hour>=20))
      {
          source.src="Videos/ClearNight.mp4";
          container.load();
      }
      if(state=='Clouds' && ((hour>=0 && hour<=7)||(hour>=20)) )
      {
        source.src= "Videos/cloudsNight.mp4";
        container.load();
      }
      else{
      source.src="Videos/"+ state +".mp4";
      container.load();  // load the video after interpreting the type of weather
     } 
    }
   loadVideo(weather)
}


// Delivers all processed data to the index.html through DOM access
function giveInfo(city2,country,weather,temp,pressure,windSpeed)
{
    
    var c1=document.getElementById("country");
    var c=document.getElementById("city")
    var m= document.getElementById('cloud');
    var t= document.getElementById('temp');
    var p= document.getElementById('pressure');
    var w= document.getElementById('wind');
    c1.textContent=country
    c.textContent=city2;
    //console.log(weather)
    m.innerHTML= weather;
    temp=temp-273.5;   // conversion
    temp= temp.toFixed(4);
    t.textContent= (temp) +"degC";
    p.textContent=pressure+ " hPa";
    w.textContent=windSpeed + " m/s"
    var ul1= document.getElementsByTagName('ul')[0];
    var ul2=document.getElementsByTagName('ul')[1]
    ul1.style.visibility="visible";
    ul2.style.visibility="visible";
    
}

