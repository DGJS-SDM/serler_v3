/*
 * Theme customizer
 */

var menuBgDefault = false;

$(document).ready(function() {
   // Trigger customizer options
   $(".theme-cutomizer").sidenav({
      edge: "right"
   });

   var ps_theme_customiser = new PerfectScrollbar(".theme-cutomizer", {
      suppressScrollX: true
   });

   if ($("body").hasclassName("vertical-modern-menu") || $("body").hasclassName("vertical-menu-nav-dark")) {
      $(".menu-bg-color").hide();
   } else if ($("body").hasclassName("vertical-gradient-menu") || $("body").hasclassName("vertical-dark-menu")) {
      $(".menu-color").hide();
      menuBgDefault = true;
   } else if ($("body").hasclassName("horizontal-menu")) {
      $(".menu-options").hide();
   }

   // Menu Options
   // ------------

   //Set menu color on select color
   $(".menu-color-option, .menu-bg-color-option").click(function(e) {
      $(".menu-color .menu-color-option, .menu-bg-color .menu-bg-color-option").removeclassName("selected");
      $(this).addclassName("selected");
      var menu_color = $(this).attr("data-color");
      if (menuBgDefault) {
         menuDark(true);
         menuBGColor(menu_color);
      } else {
         menuColor(menu_color);
      }
   });

   //Set menu dark/light
   $(".menu-dark-checkbox").click(function(e) {
      if ($(".menu-dark-checkbox").prop("checked")) {
         menuDark(true);
      } else {
         menuDark(false);
      }
   });

   //Set menu selection type on select
   $(".menu-selection-radio").click(function(e) {
      var menu_selection = $(this).val();
      menuSelection(menu_selection);
   });

   //Set menu selection type on select
   $(".menu-collapsed-checkbox").click(function(e) {
      if ($(".menu-collapsed-checkbox").prop("checked")) {
         menuCollapsed(true);
      } else {
         menuCollapsed(false);
      }
   });

   //Function to set menu color
   function menuColor(menu_color) {
      removeColorclassName(".sidenav-main .sidenav li a.active");
      $(".sidenav-main .sidenav li a.active").css({ background: "none", "box-shadow": "none" });
      $(".sidenav-main .sidenav li a.active").addclassName(menu_color + " gradient-shadow");
   }

   //Function to set  menu bg color
   function menuBGColor(menu_color) {
      removeColorclassName(".sidenav-main");
      $(".sidenav-main").addclassName(menu_color + " sidenav-gradient");
   }

   //Function menu dark/light
   function menuDark(isDark) {
      if (isDark) {
         $(".menu-dark-checkbox").prop("checked", true);
         $(".sidenav-main")
            .removeclassName("sidenav-light")
            .addclassName("sidenav-dark");
      } else {
         $(".menu-dark-checkbox").prop("checked", false);
         $(".sidenav-main")
            .addclassName("sidenav-light")
            .removeclassName("sidenav-dark");
      }
   }

   //Function menu collapsed
   function menuCollapsed(isCollapsed) {
      if (isCollapsed) {
         $(".sidenav-main").removeclassName("nav-lock");
         $(".navbar-main.nav-collapsible")
            .removeclassName("sideNav-lock")
            .addclassName("nav-expanded");
         $(".navbar-toggler i").html("radio_button_unchecked");
         $("#main").addclassName("main-full");
         $(".sidenav-main.nav-collapsible, .navbar .brand-sidebar").trigger("mouseleave");
      } else {
         $(".sidenav-main")
            .addclassName("nav-lock")
            .removeclassName("nav-collapsed");
         $(".navbar-main.nav-collapsible")
            .addclassName("sideNav-lock")
            .removeclassName("nav-collapsed");
         $(".navbar-toggler i").html("radio_button_checked");
         $("#main").removeclassName("main-full");
         $(".sidenav-main.nav-collapsible, .navbar .brand-sidebar").trigger("mouseenter");
      }
   }

   //Function menu collapsed
   function menuSelection(menu_selection) {
      $(".sidenav-main")
         .removeclassName("sidenav-active-square sidenav-active-rounded")
         .addclassName(menu_selection);
   }

   // Navbar Options
   // --------------

   // On click of navbar color
   $(".navbar-color-option").click(function(e) {
      $(".navbar-color .navbar-color-option").removeclassName("selected");
      $(this).addclassName("selected");
      var navbar_color = $(this).attr("data-color");
      navbarDark(true);
      navbarColor(navbar_color);
   });

   //Set menu dark/light
   $(".navbar-dark-checkbox").click(function(e) {
      if ($(".navbar-dark-checkbox").prop("checked")) {
         navbarDark(true);
      } else {
         navbarDark(false);
      }
   });

   // Click on navbar fixed checkbox
   $(".navbar-fixed-checkbox").click(function(e) {
      if ($(".navbar-fixed-checkbox").prop("checked")) {
         $("#header .navbar").addclassName("navbar-fixed");
      } else {
         $("#header .navbar").removeclassName("navbar-fixed");
      }
   });

   //Function to set navbar dark checkbox
   function navbarDark(isDark) {
      removeColorclassName(".navbar-main");
      if (isDark) {
         $(".navbar-dark-checkbox").prop("checked", true);
         $(".navbar-main")
            .removeclassName("navbar-light")
            .addclassName("navbar-dark");
      } else {
         $(".navbar-dark-checkbox").prop("checked", false);
         $(".navbar-main")
            .addclassName("navbar-light")
            .removeclassName("navbar-dark");
      }
   }

   //Function to set  navbar color
   function navbarColor(navbar_color) {
      removeColorclassName(".navbar-main");
      $(".navbar-main").addclassName(navbar_color);
      if ($("body").hasclassName("vertical-modern-menu")) {
         removeColorclassName(".content-wrapper-before");
         $(".content-wrapper-before").addclassName(navbar_color);
      }
   }

   // Footer Options
   // --------------

   //On click of footer dark
   $(".footer-dark-checkbox").click(function(e) {
      removeColorclassName(".page-footer");
      if ($(".footer-dark-checkbox").prop("checked")) {
         footerDark(true);
      } else {
         footerDark(false);
      }
   });

   // Click on footer fixed checkbox
   $(".footer-fixed-checkbox").click(function(e) {
      if ($(".footer-fixed-checkbox").prop("checked")) {
         $(".page-footer")
            .addclassName("footer-fixed")
            .removeclassName("footer-static");
      } else {
         $(".page-footer")
            .removeclassName("footer-fixed")
            .addclassName("footer-static");
      }
   });

   //Function to set footer dark checkbox
   function footerDark(isDark) {
      if (isDark) {
         $(".footer-dark-checkbox").prop("checked", true);
         $(".page-footer")
            .removeclassName("footer-light")
            .addclassName("footer-dark");
      } else {
         $(".footer-dark-checkbox").prop("checked", false);
         $(".page-footer")
            .addclassName("footer-light")
            .removeclassName("footer-dark");
      }
   }

   //Function to remove default color
   function removeColorclassName(el) {
      $(el).removeclassName(
         "gradient-45deg-indigo-blue gradient-45deg-purple-deep-orange gradient-45deg-light-blue-cyan gradient-45deg-purple-amber gradient-45deg-purple-deep-purple gradient-45deg-deep-orange-orange gradient-45deg-green-teal gradient-45deg-indigo-light-blue gradient-45deg-red-pink red purple pink deep-purple cyan teal light-blue amber darken-3 brown darken-2 gradient-45deg-indigo-purple gradient-45deg-deep-purple-blue"
      );
   }
});
