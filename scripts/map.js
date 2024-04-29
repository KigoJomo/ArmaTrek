mapboxgl.accessToken =
    "pk.eyJ1Ijoia2lnb2pvbW8iLCJhIjoiY2x2bDc3c2RzMTJzeTJpcDcwaDlsMmQ0YSJ9.OS3OoOBTJjXcoF-X4LyULg";


var tokyo = { lat: 35.6895, lng: 139.6917 };
var nyc = { lat: 40.7128, lng: -74.006 }; //40.7128° N, 74.0060° W
var mali = { lat: 17, lng: -4 };

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/kigojomo/clvl9b8gn009h01pc7gou2uwf",
  center: mali, // starting position [lng, lat]
  zoom: 1, // starting zoom
});

// setTimeout(function () {
//   map.panTo(tokyo);
// }, 10000);
