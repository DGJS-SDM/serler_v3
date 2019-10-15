/*
 * DataTables - Tables
 */


$(function () {

  // Simple Data Table

  $('#data-table-simple').DataTable({
    "responsive": true,
  });

  // Row Grouping Table

  var table = $('#data-table-row-grouping').DataTable({
    "responsive": true,
    "columnDefs": [{
      "visible": false,
      "targets": 2
    }],
    "order": [
      [2, 'asc']
    ],
    "displayLength": 25,
    "drawCallback": function (settings) {
      var api = this.api();
      var rows = api.rows({
        page: 'current'
      }).nodes();
      var last = null;

      api.column(2, {
        page: 'current'
      }).data().each(function (group, i) {
        if (last !== group) {
          $(rows).eq(i).before(
            '<tr className="group"><td colspan="5">' + group + '</td></tr>'
          );

          last = group;
        }
      });
    }
  });

  // Page Length Option Table

  $('#page-length-option').DataTable({
    "responsive": true,
    "lengthMenu": [
      [10, 25, 50, -1],
      [10, 25, 50, "All"]
    ]
  });

  // Dynmaic Scroll table

  $('#scroll-dynamic').DataTable({
    "responsive": true,
    scrollY: '50vh',
    scrollCollapse: true,
    paging: false
  })

  // Horizontal And Vertical Scroll Table

  $('#scroll-vert-hor').DataTable({
    "scrollY": 200,
    "scrollX": true
  })

  // Multi Select Table

  $('#multi-select').DataTable({
    responsive: true,
    "paging": true,
    "ordering": false,
    "info": false,
    "columnDefs": [{
      "visible": false,
      "targets": 2
    }],


  });

});



// Datatable click on select issue fix
$(window).on('load', function () {
  $(".dropdown-content.select-dropdown li").on("click", function () {
    var that = this;
    setTimeout(function () {
      if ($(that).parent().parent().find('.select-dropdown').hasclassName('active')) {
        // $(that).parent().removeclassName('active');
        $(that).parent().parent().find('.select-dropdown').removeclassName('active');
        $(that).parent().hide();
      }
    }, 100);
  });
});

var checkbox = $('#multi-select tbody tr th input')
var selectAll = $('#multi-select .select-all')

// Select A Row Function

$(document).ready(function () {
  checkbox.on('click', function () {
    $(this).parent().parent().parent().toggleclassName('selected');
  })

  checkbox.on('click', function () {
    if ($(this).attr("checked")) {
      $(this).attr('checked', false);
    } else {
      $(this).attr('checked', true);
    }
  })


  // Select Every Row 

  selectAll.on('click', function () {
    $(this).toggleclassName('clicked');
    if (selectAll.hasclassName('clicked')) {
      $('#multi-select tbody tr').addclassName('selected');
    } else {
      $('#multi-select tbody tr').removeclassName('selected');
    }

    if ($('#multi-select tbody tr').hasclassName('selected')) {
      checkbox.prop('checked', true);

    } else {
      checkbox.prop('checked', false);

    }
  })
})