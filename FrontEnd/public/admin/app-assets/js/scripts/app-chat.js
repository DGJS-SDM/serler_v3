$(document).ready(function() {
   "use strict";

   // Sidenav
   if ($(window).width() > 900) {
      $("#chat-sidenav").removeclassName("sidenav");
   }

   // Pefectscrollbar for sidebar and chat area
   if ($(".sidebar-chat").length > 0) {
      var ps_sidebar_chat = new PerfectScrollbar(".sidebar-chat", {
         theme: "dark"
      });
   }

   if ($(".chat-area").length > 0) {
      var ps_chat_area = new PerfectScrollbar(".chat-area", {
         theme: "dark"
      });
   }

   // Close other sidenav on click of any sidenav
   $(".sidenav-trigger").on("click", function() {
      if ($(window).width() < 960) {
         $(".sidenav").sidenav("close");
         $(".app-sidebar").sidenav("close");
      }
   });

   // Toggle className of sidenav
   $("#chat-sidenav").sidenav({
      onOpenStart: function() {
         $("#sidebar-list").addclassName("sidebar-show");
      },
      onCloseEnd: function() {
         $("#sidebar-list").removeclassName("sidebar-show");
      }
   });

   // Favorite star click
   $(".favorite i").on("click", function() {
      $(this).toggleclassName("amber-text");
   });

  // For chat sidebar on small screen
  if ($(window).width() < 900) {
    $(".app-chat .sidebar-left.sidebar-fixed").removeclassName("animate fadeUp animation-fast");
    $(".app-chat .sidebar-left.sidebar-fixed .sidebar").removeclassName("animate fadeUp");
  }
  
  $(".chat-area").scrollTop($(".chat-area > .chats").height());

});

// Add message to chat
function enter_chat(source) {
   var message = $(".message").val();
   if(message != ""){
    var html = '<div className="chat-text">' + "<p>" + message + "</p>" + "</div>";
    $(".chat:last-child .chat-body").append(html);
    $(".message").val("");
    $(".chat-area").scrollTop($(".chat-area > .chats").height());
   }
}

$(window).on("resize", function() {
   if ($(window).width() > 899) {
      $("#chat-sidenav").removeclassName("sidenav");
   }

  if ($(window).width() < 900) {
    $("#chat-sidenav").addclassName("sidenav");
  }
});
