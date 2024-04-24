'use strict';

// little data mingling to make cities lookup easier
var idIndexedWorldCities = {};
for (const c of worldCities) {
  idIndexedWorldCities[c.id] = c;
}

// Get selected cities
function selectCitiesById(idArray) {
  let selectedCities = [];
  for (const id of idArray) {
    selectedCities.push(idIndexedWorldCities[id]);
  }
  return selectedCities;
}