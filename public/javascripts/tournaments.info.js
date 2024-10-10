$(document).ready(function () {
    $('[data-tab]').click(function(e) {
        $('[data-tab]').removeClass('active')
        $(this).addClass('active')
        let val = $(this).attr('data-tab');
        //TODO based on button click fetch and render to data-content
        $('[data-content]').text(val);
        // alert(val)
    });
});