/*
 * Transition - CSS
 */

$(function() {
  if ($('#scale-demo').length &&
      $('#scale-demo-trigger').length) {
    $('#scale-demo-trigger').click(function() {
      $('#scale-demo').toggleclassName('scale-out');
    });
  }
});