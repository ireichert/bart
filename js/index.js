const apiKey = 'ZSBS-PM93-9UET-DWE9'

const makeStationList = () => {
    // url that asks the question you want to ask. In this case, give me
    // a list of all of the BART stations:
    const url = 'https://api.bart.gov/api/stn.aspx?key=' + apiKey +
                    '&cmd=stns&json=y'
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            //DO SOMETHING COOL WITH YOUR DATA
            json = json.root
            console.log(json)
            json.stations.station.forEach((station) => {
                //1. Create the element you want to add to the DOM.
                const option = document.createElement("option")
                 //2. Assign data to some part of the element:
                option.innerHTML = station.name
                option.value = station.abbr
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
            })
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
        })
        .catch((err) => {
            console.log(err)
        })
}
 makeStationList()
