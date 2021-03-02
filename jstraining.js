
 function whereAmI(lat='17.3850',lang='78.4867') {


 	fetch ("https://geocode.xyz/"+lat+","+lang+"?geoit=json")
		.then(x => {
			if (x.status == 403) {
				throw new Error("You have entered more than 3 times in a second!");
			}
			return x.json();

		})
		.then(y => {
			console.log("Total Response",y);
            console.log("You are in "+y.city+", "+y.region);
            getCountry(y.country);
		}).catch( err=>{ 
			console.error("error: ",err);
		});
 }

 //whereAmI();

 if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    whereAmI();
  }

function showPosition(position) {  
  whereAmI(position.coords.latitude,position.coords.longitude);
}


 function getCountry(country) {
	fetch ("https://restcountries.eu/rest/v2/name/"+country)
		.then(x => x.json())
		.then(z => {	
		    let [y]	= z;
			console.log("Total Response",y);
			let data=`<div class="card" style="width:400px">
					  <img class="card-img-top" src="${y.flag}" alt="Card image">
					  <div class="card-body">
					    <h4 class="card-title">${y.name}</h4>
					    
					  </div>
					</div>
					`;
					document.getElementById('test').innerHTML =data;
		}).catch( err=>{ 
			console.error("error: ",err);
		});
 }

