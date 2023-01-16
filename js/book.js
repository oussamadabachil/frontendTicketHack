fetch("https://backend-ticket-hack.vercel.app/book/showTrip").then(res=>res.json()).then(data=>{

    console.log(data)
    if(data.length){
        let somme = 0
        for(let i=0;i<data.length;i++){
            let dateOfTheTrip = new Date(data[i].date).getTime()
            let dateOfTheDay = new Date().getTime()
            let timeLeft = dateOfTheTrip - dateOfTheDay
            let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
            let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
           
            let timeLeftForTheTrip = days + "d " + hours + "h " + minutes + "m "
    
            
            let hourFromDate = data[i].date
            let hourFrom = hourFromDate.split("T")
            let hour = hourFrom[1]  
            let hourAndMinute = hour.split(":")
            let hourOnly = hourAndMinute[0]
            let hourFromNow = new Date().getHours()
            let minuteOnly = hourAndMinute[1]

            let hourAndMinuteOnly = hourOnly+":"+minuteOnly
            document.querySelector(".cart-list").innerHTML += `<li class="list-group-item"><span>${data[i].departure} > ${data[i].arrival}</span><span>${hourAndMinuteOnly} </span><span>${data[i].price}€</span>Departure in ${timeLeftForTheTrip}<span></span></li> `
            
        }
    }else{

        

    }
    
}
)