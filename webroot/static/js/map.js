'use strict';
console.log('map.js');

/* --------
INIT MAP
---------*/
var map = L.map('map', {
  center: [50, 10], // Default latitude and longitude on start
  zoom: 3,  // Between 1 and 18; decrease to zoom out, increase to zoom in
  minZoom: 2,
  maxZoom: 18,
  scrollWheelZoom: true,
  preferCanvas: true
})

function map_resetView() {
  map.flyTo([0, 0], 2, {
    animate: true,
    duration: 2
  });
}

function map_focusCity(city) {
  map.flyTo([city.lat, city.lng], 11, {
    animate: true,
    duration: 2
  });
}

/* --------
LAYERS
---------*/
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 19,
    subdomains:['mt0','mt1','mt2','mt3']
});

/* --------
LAYER CONTROL
---------*/
var baselayers = {
  'OSM': osmLayer,
  'Google Satellite': googleSat
}
L.control.layers(baselayers).addTo(map);

/* --------
MARKERS & MARKER CLUSTER
---------*/
var markersCluster = L.markerClusterGroup();
map.addLayer(markersCluster);

function map_setMarkerData(newDataArray, clickCallback) {
  // clear markerCluster
  markersCluster.clearLayers();
  // create markers
  let markers = [];
  for (const row of newDataArray) {
    if (row.lat && row.lng) {
      let marker = L.marker([row.lat, row.lng], {
        customId: row.id, // set id as marker option to identify cities later and link to table entries
        opacity: 1
      }).bindPopup(`${row.name} (Rank: ${row.rank}, Pop: ${row.population})`).on('click', clickCallback);
      markers.push(marker);
    }
  }
  // add to markerCluster
  markersCluster.addLayers(markers);
}

/* --------
LASSO SELECT
---------*/
const lassoControl = L.control.lasso().addTo(map);