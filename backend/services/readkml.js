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
        console.log(estate)
        const data = fs.readFileSync(__dirname + '/../data/EstateId.json',"utf8")     
        console.log(data)
        const estate_id = JSON.parse(data)
        console.log("This is Estate_id")
        console.log(estate_id)
        const kml_id =  estate_id[estate]        //Here is the problem
        console.log(kml_id)
        //console.log(converted)
        console.log("This is the return")
        console.log(converted.features[kml_id.Id].geometry.coordinates[0])
        console.log(kml_id.Id)
        console.log(converted.features[kml_id.Id].geometry.coordinates[0][0])
        return (converted.features[kml_id.Id].geometry.coordinates[0])


    

    }

}

module.exports = {getKML}
