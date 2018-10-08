

$(document).ready(function(){
    $('.page-nav__enter-link').click(function () {
         showOverlay();
         $('.login-window').fadeIn(100);
         modalOpen = true;
         $('.main-navbar').css('z-index','1');
    })
});