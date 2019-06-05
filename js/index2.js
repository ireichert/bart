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
            
            for (var i=0; i < stations.length; i++){
                //1. Create the element you want to add to the DOM.
                var option = document.createElement("option")
                 //2. Assign data to some part of the element:
                option.innerHTML = stations[i].name
                console.log(stations[0].name)
                option.value = stations[i].abbr
                 //FAMOUS ATTRIBUTES ARE:
                /*
                    * id
                    * class (for assigning CSS classes)
                    * name (for form data)
                    * value (for form data)
                    * src (for images)
                    * alt (for accessibility)
                    * href (for links)
                    * innerHTML (what goes inside the tag)
                */
                 //3. Append the newly created element to the DOM somewhere:
                document.getElementById('station_list').appendChild(option)
            }})
             //How do I use the data returned from BART to populate my
            //dropdown menu??????
             /*
            // PART III.A.: Use a loop to populate the select menu with *ALL*
            // of the stations that are returned from the BART data feed:
            const option1 = document.createElement("option")
            option1.value = 'DBRK'
            option1.innerHTML = 'Downtown Berkeley'
            document.getElementById('station_list').appendChild(option1)
            */
        }
        

 makeStationList()
 
 
var getArrivalTimes = function() {
    var stationList = document.getElementById('station_list')
    // PART III.B.1: The bartStationCode should read from the list and query
    // for the corresponding station
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
                    document.getElementById('results').appendChild(depart)
                }
               
            }})
                
                
                
            
            }
            
            //json.station[0].etd.forEach((estimate)=> {console.log(estimate)})
            
           /* json.station = json.station[0]
            if (!Array.isArray(json.station.etd)) {
                json.station.etd = [ json.station.etd ]
            }
            json.station.etd.forEach(trainLine => {
                if (!Array.isArray(trainLine.estimate)) {
                    trainLine.estimate = [ trainLine.estimate ]
                }
                // PART III.B.2: Instead of printing this info to the console,
                // output it to the DOM
                console.log('------------------------------------------------------------------------')
                console.log('FROM:', stationList.options[stationList.selectedIndex].text.toUpperCase())
                console.log('TO:', trainLine.destination.toUpperCase())
                console.log('------------------------------------------------------------------------')
                trainLine.estimate.forEach(estimate => {
                    // PART III.B.2. Instead of printing this info to the console,
                    // output it to the DOM
                    console.log(
                        ' * Direction:', estimate.direction,
                        ', Leaving: ', estimate.minutes,
                        ', Color: ', estimate.hexcolor,
                        ', Platform:', estimate.platform,
                        ', Delay?:', estimate.delay
                    )
                })
            })
        })*/
        
