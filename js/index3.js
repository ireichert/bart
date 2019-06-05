const apiKey = 'ZSBS-PM93-9UET-DWE9'

const makeStationList = function() {
    // url that asks the question you want to ask. In this case, give me
    // a list of all of the BART stations:
    var url = 'https://api.bart.gov/api/stn.aspx?key=' + apiKey +
                    '&cmd=stns&json=y'
    /*The Fetch API is used for accessing data from a JSON feed and returns a Promise, which is a way to handle asynchronous operations without the need for a callback.*/


    fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            //DO SOMETHING COOL WITH YOUR DATA
            json = json.root
            //console.log(json)
            var stations = json.stations.station
            //lets load the stations and add them to the drop-down menu
            for (var i=0; i < stations.length; i++){
                //1. Create the element you want to add to the DOM.
                var option = document.createElement("option")
                 //2. Assign data to some part of the element:
                option.innerHTML = stations[i].name
                console.log(stations[0].name)
                option.value = stations[i].abbr
                 //3. Append the newly created element to the DOM somewhere:
                document.getElementById('station_list').appendChild(option)
            }})
        }
        

 makeStationList()
 
 
var getArrivalTimes = function() {
    //add the station_list.value aka abbreviation to the URL
    var stationList = document.getElementById('station_list')
    var bartStationCode = station_list.value
   
    var url = 'https://api.bart.gov/api/etd.aspx?key=' + apiKey + '&cmd=etd' +
                '&orig=' + bartStationCode + '&json=y'
    fetch(url)
        .then (function(response) {
            return response.json()
        })
        .then (function(json)  {
            json = json.root
            //console.log(json)
            //clears out previous requests
            document.getElementById('results').innerHTML=''
            //add header that shows selected station 
            var header = document.createElement("h2")
            header.innerHTML =  'you have selected:' + json.station[0].name
            document.getElementById('results').appendChild(header)
            //Get details
            var estimates = json.station[0].etd
            for (var i=0; i < estimates.length; i++){
               console.log(estimates)
                  //Get the trainlines
            var trainline = document.createElement("p")
            trainline.innerHTML =  estimates[i].abbreviation
            document.getElementById('results').appendChild(trainline)
            
                //Get departure
            var depart = document.createElement("p")
            var newEstimate = estimates[i].estimate
           
                for(var i=0; i < newEstimate.length; i++ ){
                    console.log(newEstimate[i].minutes)
                    depart.innerHTML = newEstimate[i].minutes
                    
                }
                document.getElementById('results').appendChild(depart)
               
            }})
                
                
                
            
            }
            
          
     
        
