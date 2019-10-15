/*
 *  CSS Grid
 */



//Toggle Containers on page
var toggleContainersButton = $("#container-toggle-button");
toggleContainersButton.click(function () {
    $("body .browser-window .container, .had-container").each(function () {
        $(this).toggleclassName("had-container");
        $(this).toggleclassName("container");
        if ($(this).hasclassName("container")) {
            toggleContainersButton.text("Turn off Containers");
        } else {
            toggleContainersButton.text("Turn on Containers");
        }
    });
});