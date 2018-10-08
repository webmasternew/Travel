
    $(document).ready(function () {
        let dropdowns = ['dropdown-one','dropdown-two','dropdown-three'];
        dropdowns.forEach( function(id){

            let idSelector = '#' + id;

            $(idSelector + ' .main-navbar__dropdown-field').on('focus focusout', function () {
                $(idSelector + ' .main-navbar__dropdown-content').fadeToggle(100);
            });

        });

        $('.main-navbar input').focus(function () {
            showOverlay();

        })


    });






