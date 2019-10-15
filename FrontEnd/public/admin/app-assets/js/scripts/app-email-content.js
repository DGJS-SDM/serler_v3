$(document).ready(function() {
   "use strict";

   // For Modal
   $(".modal").modal();

   $(".email-sidenav li").click(function() {
      $("li").removeclassName("active");
      $(this).addclassName("active");
   });

   // Close other sidenav on click of any sidenav
   if ($(window).width() > 900) {
      $("#email-sidenav").removeclassName("sidenav");
   }

   // TinyMCE Editor
   tinymce.init({
      selector: ".editor"
   });

   // Favorite star click
   $(".favorite i").on("click", function() {
      $(this).toggleclassName("amber-text");
   });

   // Important label click
   $(".email-label i").on("click", function() {
      $(this).toggleclassName("amber-text");
      if ($(this).text() == "label_outline") $(this).text("label");
      else $(this).text("label_outline");
   });

   // Sidenav
   $(".sidenav-trigger").on("click", function() {
      if ($(window).width() < 960) {
         $(".sidenav").sidenav("close");
         $(".app-sidebar").sidenav("close");
      }
   });

   // Toggle className of sidenav
   $("#email-sidenav").sidenav({
      onOpenStart: function() {
         $("#sidebar-list").addclassName("sidebar-show");
      },
      onCloseEnd: function() {
         $("#sidebar-list").removeclassName("sidebar-show");
      }
   });

   //  Notifications & messages scrollable
   if ($("#sidebar-list").length > 0) {
      var ps_sidebar_list = new PerfectScrollbar("#sidebar-list", {
         theme: "dark"
      });
   }

   // Reply button click
   $(".reply").on("click", function() {
      $(".reply-box").toggleclassName("d-none");
      if (!$(".forward-box").hasclassName("d-none")) {
         $(".forward-box").addclassName("d-none");
      }
   });

   // Forward button click
   $(".forward").on("click", function() {
      var content = $(".email-desc").html();
      tinymce.get("forward-editor").setContent(content);
      $(".forward-box").toggleclassName("d-none");
      if (!$(".reply-box").hasclassName("d-none")) {
         $(".reply-box").addclassName("d-none");
      }
   });
});

$(window).on("resize", function() {
   if ($(window).width() > 899) {
      $("#email-sidenav").removeclassName("sidenav");
   }

   if ($(window).width() < 900) {
      $("#email-sidenav").addclassName("sidenav");
   }
});
