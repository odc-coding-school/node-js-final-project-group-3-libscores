$(document).ready(function () {
    $('[data-tab]').click(function(e) {
        $('[data-tab]').removeClass('active');
        $(this).addClass('active');
        let tab = $(this).attr('data-tab');
        let url = '';

        // Determine the URL to fetch based on the clicked tab
        switch (tab) {
            case "matches":
                url = '/v1/api/ajax/matches';
                break;
            case "teams":
                url = '/v1/api/ajax/teams';
                break;
            case "groups":
                url = '/v1/api/ajax/groups';
                break;
            default:
                url = '/v1/api/ajax/matches'; // Default to matches if no tab matches
                break;
        }

        // Fetch the rendered EJS content from the server
        $.ajax({
            url: url,
            method: 'GET',
            success: function (response) {
                // First, hide the content area, then insert the HTML, and finally slide it down smoothly
                $('[data-content]').hide().html(response).slideDown(500);  // 500ms animation time
            },
            error: function () {
                $('[data-content]').hide().html('<p>Error loading content. Please try again.</p>').slideDown(500);
            }
        });
    });
});
