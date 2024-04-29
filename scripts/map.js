mapboxgl.accessToken =
    "pk.eyJ1Ijoia2lnb2pvbW8iLCJhIjoiY2x2bDc3c2RzMTJzeTJpcDcwaDlsMmQ0YSJ9.OS3OoOBTJjXcoF-X4LyULg";


var tokyo = { lat: 35.6895, lng: 139.6917 };
var nyc = { lat: 40.7128, lng: -74.006 }; //40.7128° N, 74.0060° W

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/kigojomo/clvl9b8gn009h01pc7gou2uwf",
  center: nyc, // starting position [lng, lat]
  zoom: 2, // starting zoom
});
setTimeout(function () {
  map.panTo(tokyo);
}, 10000);
