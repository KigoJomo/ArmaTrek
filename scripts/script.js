let vehicleCards = [];
let currentVehicle = 1;
const buttons = document.querySelectorAll(".numbers .button");
fetch("vehicles.json")
  .then((response) => response.json())
  .then((data) => {
    const vehicles = data.vehicles;
    const container = document.getElementById("vehicles");

    let index = 1;
    vehicles.forEach((vehicle) => {
      const card = document.createElement("div");
      card.classList.add("vehicle");
      card.classList.add("column");
      card.setAttribute("id", `vehicle${index}`)
      index++;

      const image = document.createElement("img");
      image.src = `images/cars/${vehicle.image}`;
      card.appendChild(image);

      const details = document.createElement("div");
      details.classList.add("details");
      details.classList.add("column");
      details.innerHTML = `<div class="top column">
                        <h1>${vehicle.name}</h1>
                        <p>${vehicle.description}</p>
                    </div>
                    <ul>
                        <li class="row">
                            <span>range</span>
                            <p>${vehicle.specs.range}</p>
                        </li>
                        <li class="row">
                            <span>armor</span>
                            <p>${vehicle.specs.armor}</p>
                        </li>
                        <li class="row">
                            <span>interior</span>
                            <p>${vehicle.specs.interior}</p>
                        </li>
                    </ul>`;
      card.appendChild(details);
      container.appendChild(card);
      console.log("created new vehicle card");
      vehicleCards.push(vehicle);
    });
      console.log(vehicleCards.length);
  })
  .catch((error) => {
    console.error("Error fetching data", error);
  });


console.log(vehicleCards.length);

function scrollVehicle(card) {
  const vehicleIndex = card - 1;
  const vehicleToView = document.getElementById(`vehicle${card}`)
  vehicleToView.scrollIntoView();
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  buttons[vehicleIndex].classList.add("active");
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const btnIndex = parseInt(button.innerHTML);
    scrollVehicle(btnIndex);
    currentVehicle = btnIndex;
  });
});

const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn");

function previousVehicle() {
  if (currentVehicle <= 1) {
    currentVehicle = 1;
    prevBtn.classList.add("disabled");
    return;
  } else {
    currentVehicle--;
    scrollVehicle(currentVehicle);
    nextBtn.classList.remove("disabled");
  }
}

function nextVehicle() {
  if (currentVehicle >= buttons.length) {
    currentVehicle = buttons.length;
    nextBtn.classList.add("disabled");
    return;
  } else {
    currentVehicle++;
    scrollVehicle(currentVehicle);
    prevBtn.classList.remove("disabled");
  }
}

prevBtn.addEventListener("click", previousVehicle);
nextBtn.addEventListener("click", nextVehicle);

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    previousVehicle()
  } else if (event.key === "ArrowRight") {
    nextVehicle()
  }
})

const menuButton = document.getElementById("menuButton");
const navs = document.querySelectorAll("nav")
menuButton.addEventListener("click", openOrCloseMenu);
navs.forEach((nav) => {
  nav.addEventListener("click", openOrCloseMenu)
})

function openOrCloseMenu() {
  navs.forEach((nav) => {
    nav.classList.toggle("navClosed");
  })
}
