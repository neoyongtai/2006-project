import React, { useState, useEffect } from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Polygon, InfoWindow,Marker} from "react-google-maps"
import axios from  'axios';
import * as ammenties from "./ammenties.json"

const google = window.google;
function Map(props)
{
    const[selectAmen, setSelectedAmen]= useState(null)

    console.log("This is the cord INSIDE MAPS")
    console.log(props.cord)
    console.log(props.estate)
    let estate = props.estate.replace(/[""]+/g, '')
    let amen = "School"
    //estate = "ANG_MO_KIO"
    //console.log(ammenties)
    if(!(props.estate === "\"\""))
{
    console.log("INSIDE")
    console.log(estate)
    return <GoogleMap defaultZoom={11} defaultCenter= {{lat:1.352083, lng:103.819839}} >
        {ammenties["ANG_MO_KIO"].map((point)=>
            <Marker key={point[amen][0].Name} position={{lat:point[amen][0].LAT, lng:point[amen][0].LONG}}
            onClick={()=>
            {
                setSelectedAmen(point[amen][0])
            }}
            />
        )}
        {selectAmen && (
            <InfoWindow position={{lat:selectAmen.LAT, lng:selectAmen.LONG}}
            onCloseClick={()=>{
                    setSelectedAmen(null);

            }}
            >
                <div><h3>{selectAmen.Name}</h3>
                </div></InfoWindow>


        )}
        <Polygon path ={props.cord[0]} key={1} options={{strokeColor:'#FF0000',
strokeOpacity:0.8,
strokeWeight:3,
fillColor:'#000000',
fillOpacity:0}}> 
        </Polygon>
         </GoogleMap>
}
}
//In order to correct load Google Maps JavaScript API v3, need to wrap it with withScriptjs HOC



function ReportMaps(props) {

    const [cord, setCord] = useState([]);
    const [estate, setEstate] = useState("")
    let obj = [];
    let i, latv,lngv
    console.log("This is from Map estate")
    console.log(props.estate)

useEffect(()=> {
    console.log("useEffect 1")
        setEstate(props.estate)
        if(!(props.estate === "\"\""))
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
    
              })
      }



},[estate])



 
const WrappedMap = withScriptjs(withGoogleMap(Map))
console.log(WrappedMap)
    return (
        <div style={{width: '50vw', height: '40vh'}}>
         <WrappedMap 
         googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBxfDioQjno8K0ntIxVjyq4s4x79PG6wSQ`} 
         loadingElement= {<div style = {{height: "100%"}}/>} 
         containerElement= {<div style = {{height: "100%"}}/>} 
         mapElement= {<div style = {{height: "100%"}}/>}
         cord = {cord}
         estate = {props.estate} />
        </div>
    )
}

export default ReportMaps
