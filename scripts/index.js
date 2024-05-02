const menuButton = document.getElementById("menuButton");
const navs = document.querySelectorAll("nav");
const vehiclesCont = document.getElementById("vehicles");
let buttons = [];
let cars = [];
const buttonsCont = document.getElementById("numbersContainer");
let scrollDirection = 1;
let vehicleInView = 1;
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const FormTitle = document.getElementById("FormTitle");
const formHint = document.getElementById("formHint");
const proceedToConfirm = document.getElementById("proceedToConfirm");
const proceedToCheckout = document.getElementById("proceedToCheckout");
const addressForm = document.getElementById("addressForm");
const confirmDetails = document.getElementById("confirmDetails");
const backToAddress = document.getElementById("backToAddress");

const carModel = document.getElementById("carModel");
const shippingData = document.getElementById("shippingData");
const DeliveryTime = document.getElementById("deliveryTime");

//function to fetch vehicles
function getVehicles() {
  return new Promise((resolve, reject) => {
    fetch("vehicles.json")
      .then((response) => response.json())
      .then((data) => {
        const vehicles = data.vehicles;
        cars = data.vehicles;
        let index = 1;

        vehicles.forEach((vehicle) => {
          const card = document.createElement("div");
          card.classList.add("vehicle");
          card.classList.add("column");
          card.setAttribute("id", `vehicle${index}`);

          const button = document.createElement("a");
          button.classList.add("button");
          index === 1 ? button.classList.add("active") : null;
          button.setAttribute("id", `button${index}`);
          button.innerText = index;
          buttons.push(button);
          buttonsCont.appendChild(button);

          const image = document.createElement("img");
          image.src = `images/cars/${vehicle.image}`;
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
                        <button class="buyCar button" id="buyCar${index}">order now</button>
                    </ul>`;

          card.appendChild(image);
          card.appendChild(details);
          vehiclesCont.appendChild(card);
          index++;
        });
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

//function to scroll through the vehicles container
function scrollVehicles(index, direction) {
  if (index) {
    vehicleInView = index;
  } else if (
    direction &&
    vehicleInView >= 1 &&
    vehicleInView <= buttons.length
  ) {
    if (vehicleInView === 1 && direction === -1) {
      vehicleInView = 1;
    } else if (vehicleInView === buttons.length && direction === 1) {
      vehicleInView = buttons.length;
    } else {
      vehicleInView += direction;
    }
  }

  if (vehicleInView === 1) {
    prevBtn.classList.add("disabled");
    nextBtn.classList.remove("disabled");
  } else if (vehicleInView === buttons.length) {
    nextBtn.classList.add("disabled");
    prevBtn.classList.remove("disabled");
  } else {
    prevBtn.classList.remove("disabled");
    nextBtn.classList.remove("disabled");
  }

  const vehicleToView = document.getElementById(`vehicle${vehicleInView}`);
  console.log("vehicleToView: ", vehicleToView.id);
  vehicleToView.classList.remove("emerge");
  vehicleToView.scrollIntoView();
  vehicleToView.classList.add("emerge");

  buttons.forEach((inactivebutton) => {
    inactivebutton.classList.remove("active");
  });
  buttons[vehicleInView - 1].classList.add("active");
}

function openAddressForm() {
  addressForm.scrollIntoView();
  formHint.innerHTML = "Select a shipping address for your car";
}

function openConfirmDetails() {
  confirmDetails.scrollIntoView();
  formHint.innerHTML = "Confirm your shipping details";
}

document.addEventListener("DOMContentLoaded", async () => {
  await getVehicles();

  buttons.forEach((button) => {
    const btnIndex = parseInt(button.innerHTML);
    button.addEventListener("click", () => scrollVehicles(btnIndex, undefined));
  });

  prevBtn.addEventListener("click", () => scrollVehicles(undefined, -1));
  nextBtn.addEventListener("click", () => scrollVehicles(undefined, 1));

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      // View the previous vehicle card when left arrow key is pressed
      scrollVehicles(undefined, -1);
    } else if (event.key === "ArrowRight") {
      // View the next vehicle card when right arrow key is pressed
      scrollVehicles(undefined, 1);
    }
  });

  const orderBtns = document.querySelectorAll(".buyCar");
  orderBtns.forEach((orderBtn) => {
    orderBtn.addEventListener("click", () => {
      console.log("Vehicle to order: ", vehicleInView);
      //found an easier way
      document.getElementById("shipping").scrollIntoView();
    });
  });

  proceedToConfirm.addEventListener("click", function (event) {
    event.preventDefault();

    let region = document.getElementById("regionSelector").value;
    let country = document.getElementById("countrySelector").value;
    let city = document.getElementById("citySelector").value;
    let warehouse = document.getElementById("warehouseSelector").value;

    if (warehouse && warehouse !== "Select a Warehouse" && warehouse !== "") {
      //if a value for warehouse exists
      console.log(warehouse);
      console.log("Proceed to chekout");
      openConfirmDetails();

      carModel.innerHTML = cars[vehicleInView - 1].name;
      let formattedStation = `${warehouse} - ${city}, ${country}`;
      shippingData.innerHTML = formattedStation;

      // Pick a random day between today and three weeks from now.
      // Calculate the number of days from today to the randomly selected date.
      // Return date(DD Month) and numberOfDays
    } else {
      console.log("Shipping details missing");
    }
  });
  backToAddress.addEventListener("click", openAddressForm);
});

menuButton.addEventListener("click", openOrCloseMenu);

navs.forEach((nav) => {
  nav.addEventListener("click", openOrCloseMenu);
});

function openOrCloseMenu() {
  navs.forEach((nav) => {
    nav.classList.toggle("navClosed");
  });
}
