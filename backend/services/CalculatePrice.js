
const { Console } = require("console")
const fs = require("fs")



    
function getData(estate,rooms)
{

    console.log("This is the estate")
    console.log(estate)

    const data = fs.readFileSync(__dirname + '/../data/EstatePrice.json',"utf8")       
    const estate_prices = JSON.parse(data)
    const estimate_price =  estate_prices[estate]
    const exact_price = estimate_price[rooms]
    return exact_price
        
}

function getTax(cat)

{    
    let tempvalue = 0,totaltax = 0, av = 0;
    const data = fs.readFileSync(__dirname + '/../data/TaxPrice.json',"utf8")
    const taxrate = JSON.parse(data)

    if(cat === "OneRoom" || cat === "TwoRoom")
    {
        av =5100*3
    }
    else if(cat === "ThreeRoom" ){

        av= 7860*3
    }
    else if(cat === "FourRoom")
    {
        av = 9600*3
    }
    else if(cat === "FiveRoom")
    {
      av=10380*2
    }
    else{
        av = 65052*2
    }

    for( var k in taxrate)
    {
        console.log(taxrate[k].rate)

       if(av > parseInt((taxrate[k].upper_av)))
       {
           totaltax = totaltax + (parseInt((taxrate[k].upper_av)) * taxrate[k].rate)
       }
       else
       {
           tempvalue = av - parseInt((taxrate[k].lower_av))
           totaltax = tempvalue*taxrate[k].rate
           break
       }
    }

    return totaltax


}


module.exports = {getData,getTax}
