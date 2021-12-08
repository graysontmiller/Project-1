//TM stands for Ticket Master

var TMKey = "zwO23aREsZiPbHU2oJ7D4IhWyAH6YpEG";

//Google API key
var GPKey = "AIzaSyBVunudFIdMJK1A1g5tBQEMjMPPkmkZw7I";


var TMUrl = "https://app.ticketmaster.com/discovery/v2/";


var eventSearchByZip = function (zip) {
    //calls to ticket master API to get all events upcoming for this zip code
    fetch(TMUrl + "events.json?postalCode=" + zip + "&apikey=" + TMKey)
        //after returning a promise, we are processing that response and transforming to JSON data
        .then(Response => Response.json()).then((data) => {
            //eliminates unneccassary data from our collection
            data = data._embedded.events;
            for (let event in data) {
                //loops through ever object in the returned event array to log data
                console.log(data[event]);
            }
        }).catch((err) => {
            console.log(err);
        });
};

//Alternatively, we can search by city instead as events are harder to find vs food

var eventSearchByCity = function (city) {
    fetch(TMUrl + "events.json?city=" + city + "&apikey=" + TMKey)
        //after returning a promise, we are processing that response and transforming to JSON data
        .then(Response => Response.json()).then((data) => {
            //eliminates unneccassary data from our collection
            data = data._embedded.events;
            for (let event in data) {
                //loops through ever object in the returned event array to log data
                console.log(data[event]);
            }
        }).catch((err) => {
            console.log(err);
        });
};



//search by zip by passing zip code through 
//eventSearchByZip("28262");

//search by city by passing city name
//eventSearchByCity("Charlotte");


