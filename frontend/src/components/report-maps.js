import React, { useState, useEffect } from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Polygon} from "react-google-maps"
import axios from  'axios';
const google = window.google;

function Map(props)
{
    console.log("This is the cord")
    console.log(props.cord)

    return <GoogleMap defaultZoom={11} defaultCenter= {{lat:1.352083, lng:103.819839}} >
        <Polygon path ={props.cord[0]} key={1} options={{strokeColor:'#FF0000',
strokeOpacity:0.8,
strokeWeight:3,
fillColor:'#000000',
fillOpacity:0}}> 
        </Polygon>
         </GoogleMap>

}
//In order to correct load Google Maps JavaScript API v3, need to wrap it with withScriptjs HOC


function ReportMaps(props) {

    //const cord = props.cord
    const [cord, setCord] = useState([]);
    const [count, setCount] = useState(0);

    let obj = [];
    let i, latv,lngv
    console.log("This is props")
    console.log(props.estate)
    useEffect(() => {
        console.log("Inisde UseEffect")

        if(!(props.estate === "\"\"") && count == 1)
        {
            console.log("Fire Away")
            axios.get("http://localhost:5000/report/map/"+props.estate).then(response=> {
                //setCord(response.data)
                for(i =0;i<response.data.length;i++)
                {
                    lngv =  (response.data[i][0])
                    latv =  (response.data[i][1])
                    try{
                        obj.push({
                            lat: latv,
                            lng: lngv
                      })
                    }catch(err)
                    {
                        console.log(err)
                    }
                   
                }
    
                console.log("Inside ReportMaps")
                console.log(obj)
                setCord([obj])    
    
                //console.log(response.data[0])
               // console.log(cord.coordinates)
              })
      }
      setCount(1)

    }, [count]) //If enter [] then means run once.

 
console.log(cord)
const WrappedMap = withScriptjs(withGoogleMap(Map))
console.log(WrappedMap)
    return (
        <div style={{width: '50vw', height: '40vh'}}>
         <WrappedMap 
         googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBxfDioQjno8K0ntIxVjyq4s4x79PG6wSQ`} 
         loadingElement= {<div style = {{height: "100%"}}/>} 
         containerElement= {<div style = {{height: "100%"}}/>} 
         mapElement= {<div style = {{height: "100%"}}/>}
         cord = {cord} />
        </div>
    )
}

export default ReportMaps
