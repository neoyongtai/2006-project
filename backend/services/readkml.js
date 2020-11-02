const fs = require("fs")
const ts = require('@mapbox/togeojson')
const DOMParser = require('xmldom').DOMParser

function getKML(estate)
{
    console.log("This is estate")
    console.log(estate)
    let kml = new DOMParser().parseFromString(fs.readFileSync(__dirname + '/../data/planning-boundary-area.kml',"utf8"))
    let converted = ts.kml(kml)

    if(estate === "\"\"")
    {
       
        return (converted.features[0].geometry.coordinates[0])
    }
    else
    {
        console.log("Inside GETKML")
        const data = fs.readFileSync(__dirname + '/../data/EstateId.json',"utf8")     
        const estate_id = JSON.parse(data)
        estate = estate.replace(/[""]+/g, '')// Need to remove the double quotes. If not it will not work!!
        const kml_id = estate_id[estate]        //Here is the problem
        return (converted.features[kml_id.Id].geometry.coordinates[0])


    

    }

}

module.exports = {getKML}
