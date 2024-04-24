'use strict';
console.log('table.js');

/* --------
INIT TABLE
---------*/

var dt;

function initTable(btnCallback, rowClickCallback) {
  dt = $('#table').DataTable({
    language: {
      emptyTable: "No cities selected..."
    },
    scrollX: true,
    pageLength : 10,
    bLengthChange: false,
    data: [],
    rowId: 'id',
    columns: [
      { data: 'name', title: 'City'},
      { data: 'country', title: 'Country'},
      { data: 'population', title: 'Population'},
      { data: 'rank', title: 'Rank'}
    ],
    dom: 'rtip',
    buttons: [
      {
        text: 'Select all',
        action: btnCallback,
        className: 'btn btn-dark btn-sm me-2'
      },
      {
        extend: 'csv',
        text: 'Export selection',
        className: 'btn btn-dark btn-sm'
      }
    ]
  });
  // Append buttons to more suitable dom element
  dt.buttons().container().appendTo('#btn-container');

  // row click callback
  dt.on('click', 'tr', rowClickCallback);

  // hook up custom search input
  $('#table-search').on( 'keyup', function () {
    dt.search( this.value ).draw();
  });
}

function table_setTableData(newDataArray) {
  dt.clear();
  dt.rows.add(newDataArray);
  dt.draw();
}