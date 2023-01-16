let buttonSearch = document.querySelector("#search-button");

const ordersId = [];

buttonSearch.addEventListener("click", () => {
    alert("Si le site ne fonctionne pas, bah c'est bizarre parce que chez moi il fonctionne parfaitement.")
  let departure = document.querySelector("#departure").value;
  localStorage.setItem("departure", departure);

  let arrival = document.querySelector("#arrival").value;
  localStorage.setItem("arrival", arrival);

  let dateInput = document.querySelector("#date").value;
  localStorage.setItem("date", dateInput);

  if (departure && arrival && dateInput) {
    fetch(
      `https://backend-ticket-hack.vercel.app/trips/getTrip/${departure}/${arrival}/${dateInput}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          document.querySelector(".list-group").style.display = "block";
          document.querySelector("#figure").style.display = "none";
          for (let i = 0; i < data.data.length; i++) {


            // console.log(data.data[i])
            let departure = data.data[i].departure;
            let arrival = data.data[i].arrival;
            let date = data.data[i].date;
            let price = data.data[i].price;
            let hourFromDate = data.data[i].date;
            let hourFrom = hourFromDate.split("T");
            let hour = hourFrom[1];
            let hourAndMinute = hour.split(":");
            let hourOnly = hourAndMinute[0];
            let minuteOnly = hourAndMinute[1];
            let hourAndMinuteOnly = hourOnly + ":" + minuteOnly;
            let getTimeFrom = new Date(hourAndMinuteOnly).getTime();
            let dateOfTheTrip = new Date(data.data[i].date).getTime();

            let dateOfTheDay = new Date().getTime();

            console.log(data.data.length);

            // console.log(dateOfTheTrip)
            // console.log(dateOfTheDay)

            document.querySelector(".list-group").innerHTML +=
              `
                    <li class="list-group-item animate__animated animate__fadeInLeft">${departure}>${arrival}   ${hourAndMinuteOnly}   ` +
              `  ${price}€ <span class='book' data-id="${data.data[i]._id}">Book </span></li>`;

            for (
              let i = 0;
              i < document.querySelectorAll(".book").length;
              i++
            ) {
              document
                .querySelectorAll(".book")
                [i].addEventListener("click", () => {
                  document.querySelectorAll(".book")[i].style.backgroundColor =
                    "red";
                  window.location.href = "./cart.html";
                  let id = document
                    .querySelectorAll(".book")
                    [i].getAttribute("data-id");
                  console.log(id);

                  ordersId.push(id);
                  fetch(`https://backend-ticket-hack.vercel.app/cart/idTrip`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      idTrip: id,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      //  if(data.result){
                      //       alert("you have booked successfully")
                      //  }
                    });
                });
            }
          }
        } else {
          document.querySelector("#figure>img").src = "./images/notfound.png";
          document.querySelector("#figure>img").style.display = "block";
          document.querySelector("#figure>figcaption>p").innerText =
            data.message;
        }
      });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vos champs sont vides",
    });
  }
});
