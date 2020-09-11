//local storage class
class Storage{
  constructor(){
    this.city ='';
    this.default="Lagos"
  }
  getCity(){
    if(this.city==undefined){
      return this.default;
    }
    else return localStorage.getItem('city');
  }
   setCity(city){
     this.city=city;
  localStorage.setItem('city',city);
  }
}

var storage= new Storage();
document.getElementById('search').value= storage.getCity();
console.log(storage.getCity());
