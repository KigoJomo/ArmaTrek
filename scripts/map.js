mapboxgl.accessToken =
    "pk.eyJ1Ijoia2lnb2pvbW8iLCJhIjoiY2x2bDc3c2RzMTJzeTJpcDcwaDlsMmQ0YSJ9.OS3OoOBTJjXcoF-X4LyULg";


var tokyo = { lat: 35.6895, lng: 139.6917 };
var nyc = { lat: 40.7128, lng: -74.006 }; //40.7128° N, 74.0060° W
var mali = { lat: 17, lng: -4 };
var oceania = { lat: -30, lng: 140 };

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/kigojomo/clvl9b8gn009h01pc7gou2uwf",
  center: mali, // starting position [lng, lat]
  zoom: 1, // starting zoom
});

// setTimeout(function () {
//   map.panTo(oceania);
// }, 10000);





const regionSelector = document.getElementById("regionSelector");
const countrySelector = document.getElementById("countrySelector");
const citySelector = document.getElementById("citySelector");
const warehouseSelector = document.getElementById("warehouseSelector");

document.addEventListener("DOMContentLoaded", () => {
  fetch("locations.json")
  .then((response) => response.json())
  .then((data) => {
    const continents = data.continents;
    let selectedRegion, selectedCountry, selectedCity, selectedWarehouse;

    continents.forEach((continent) => {
      const option = document.createElement("option");
      option.value = continent.name;
      option.text = continent.name;
      regionSelector.appendChild(option);
    });
    regionSelector.value = "";

    function convertCoordinates(string) {
      const [latitude, longitude] = string.split(",");
      // Convert the latitude and longitude to floating-point numbers
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      // Create an object with the lat and lng properties
      const formattedCoordinates = { lat: lat, lng: lng };
      return formattedCoordinates;
    }
    // 1
    function updateCountrySelect() {
      selectedRegion = regionSelector.value;
      if (selectedRegion === "") {
        return;
      }
      const continent = data.continents.find(
        (continent) => continent.name === selectedRegion
      );

      map.easeTo({
        zoom: 1,
        pitch: 0,
        duration: 3000,
        center: convertCoordinates(continent.coordinates),
      });

      // console.log(continent.countries[0].name);
      countrySelector.innerHTML = "";
      citySelector.innerHTML = "";
      warehouseSelector.innerHTML = "";
      const placeholder = document.createElement("option");
      placeholder.text = "Select a country";
      placeholder.setAttribute("disabled", "");
      placeholder.setAttribute("selected", "");

      countrySelector.appendChild(placeholder);
      continent.countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country.name;
        option.text = country.name;
        countrySelector.appendChild(option);
      });
    }

    // 2
    function updateCitySelect() {
      selectedCountry = countrySelector.value;
      selectedRegion = regionSelector.value;

      const continent = data.continents.find(
        (continent) => continent.name === selectedRegion
      );
      const country = continent.countries.find((country) => country.name === selectedCountry);

      map.easeTo({
        zoom: 3,
        pitch: 0,
        duration: 2000,
        center: convertCoordinates(country.coordinates),
      });

      // console.log(country.cities);
      citySelector.innerHTML = "";
      warehouseSelector.innerHTML = "";
      const placeholder = document.createElement("option");
      placeholder.text = "Select a city";
      placeholder.setAttribute("disabled", "");
      placeholder.setAttribute("selected", "");

      citySelector.appendChild(placeholder);
      country.cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city.name;
        option.text = city.name;
        citySelector.appendChild(option);
      });
    }

    // 3
    function updateWarehouseSelect() {
      selectedCountry = countrySelector.value;
      selectedRegion = regionSelector.value;
      selectedCity = citySelector.value;

      const continent = data.continents.find(
        (continent) => continent.name === selectedRegion
      );
      const country = continent.countries.find(
        (country) => country.name === selectedCountry
      );
      const city = country.cities.find((city) => city.name === selectedCity);

      map.easeTo({
        zoom: 8,
        pitch: 0,
        duration: 2000,
        center: convertCoordinates(city.coordinates),
      });

      // console.log(city.warehouses);
      warehouseSelector.innerHTML = "";
      const placeholder = document.createElement("option");
      placeholder.text = "Select a Warehouse";
      placeholder.value = "Select a Warehouse";
      placeholder.setAttribute("disabled", "");
      placeholder.setAttribute("selected", "");

      warehouseSelector.appendChild(placeholder);
      city.warehouses.forEach((warehouse) => {
        // console.log(warehouse.name);
        const option = document.createElement("option");
        option.value = warehouse.name;
        option.text = warehouse.name;
        warehouseSelector.appendChild(option);
      });
    }

    // 4
    function zoomToWareHouse() {
      selectedCountry = countrySelector.value;
      selectedRegion = regionSelector.value;
      selectedCity = citySelector.value;
      selectedWarehouse = warehouseSelector.value;

      const continent = data.continents.find(
        (continent) => continent.name === selectedRegion
      );
      const country = continent.countries.find(
        (country) => country.name === selectedCountry
      );
      const city = country.cities.find((city) => city.name === selectedCity);
      const warehouse = city.warehouses.find((warehouse) => warehouse.name === selectedWarehouse);

      map.easeTo({
        zoom: 16,
        center: convertCoordinates(warehouse.coordinates),
        pitch: 80,
        duration: 2000,
      });
    }

    updateCountrySelect()

    regionSelector.addEventListener("change", () => {
      updateCountrySelect();
    });
    countrySelector.addEventListener("change", () => {
      updateCitySelect();
    });
    citySelector.addEventListener("change", () => {
      updateWarehouseSelect();
    })
    warehouseSelector.addEventListener("change", () => {
      zoomToWareHouse();
      console.log("Warehouse selected");
    });

  })
  .catch((error) => {
    console.error(
      "There was a problem fetching or processing the locations data:",
      error
    );
  });
})

