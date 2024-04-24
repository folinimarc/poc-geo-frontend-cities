'use strict';
console.log('controller.js');

/* --------
UPDATE TABLE BASED ON MAP SELECTION
---------*/
// marker click
function clickCallback(e) {
  // Get customIds of selected markers
  let selectedIds = [e.target.options.customId];
  // update table data
  table_setTableData(selectCitiesById(selectedIds));
}

// lasso
map.on('lasso.finished', (e) => {
  // Get customIds of selected markers
  let selectedIds = [];
  for (const m of e.layers) {
    selectedIds.push(m.options.customId);
  }
  // update table data
  table_setTableData(selectCitiesById(selectedIds));
});

markersCluster.on('clusterclick', function (e) {
  // Get customIds of selected markers
  let selectedIds = [];
  for (const m of e.layer.getAllChildMarkers()) {
    selectedIds.push(m.options.customId);
  }
  // update table data
  table_setTableData(selectCitiesById(selectedIds));
});

/* --------
UPDATE MAP BASED ON TABLE SELECTION
---------*/
// callback when clicking select all button
function selectAllCallback() {
  map_setMarkerData(worldCities, clickCallback);
  map_resetView();
  table_setTableData(worldCities);
}

function rowClickCallback(e) {
  let selectedIds = [parseInt((e.currentTarget.id))];
  map_focusCity(selectCitiesById(selectedIds)[0]);
}

/* --------
ENTRYPOINT
---------*/
// worldCities is coming from worldcities_top1000.js.
map_setMarkerData(worldCities, clickCallback);
initTable(selectAllCallback, rowClickCallback);
table_setTableData(worldCities);