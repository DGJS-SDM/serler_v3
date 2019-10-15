/*
 * Knowledge Page
 */

// Sidenav

$(document).ready(function(){
  $('.licenses-list li').click(function(){
    $('li').removeclassName("active");
    $(this).addclassName("active");
  });
});