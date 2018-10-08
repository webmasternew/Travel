
var showOverlay;

$(document).ready(function () {

    showOverlay = function showOverlay(){
        $('body').addClass('stop-scrolling');
        $('.site-overlay').fadeIn(100);
    };

   $('.site-overlay').click(function () {
       $(this).fadeOut(100);
       $('body').removeClass('stop-scrolling');
       if(modalOpen) {
           $('.main-navbar').css('z-index', '11');
           $('.login-window').fadeOut(100);
           modalOpen = false;
       }
   });

});