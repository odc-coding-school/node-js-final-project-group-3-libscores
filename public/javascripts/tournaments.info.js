$(document).ready(function () {
    $('[data-tab]').click(function(e) {
        $('[data-tab]').removeClass('active')
        $(this).addClass('active')
        let val = $(this).attr('data-tab');
        $('[data-content]').text(val);
        // alert(val)
    });
});