$(document).ready(function () {
<<<<<<< HEAD
    $('[data-tab]').click(function(e) {
        $('[data-tab]').removeClass('active');
        $(this).addClass('active');
        let tab = $(this).attr('data-tab');
=======
    // Extract the tournament ID from the span element
    window.tournament_id = $('#tournament_id').text().trim(); // Use .text() to get the content and .trim() to remove any whitespace

    $('[data-tab]').click(function(e) {
        $('[data-tab]').removeClass('active');
        $(this).addClass('active');
        
        let tab = $(this).attr('data-tab');

        // Ensure tournament_id is available
        if (!window.tournament_id) {
            console.error('Tournament ID is not available.');
            return;
        }

>>>>>>> ab299aa19bf02ec72f9e40ee181a5c47b77740f6
        let url = '';

        // Determine the URL to fetch based on the clicked tab
        switch (tab) {
            case "matches":
<<<<<<< HEAD
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
=======
                url = `/v1/api/ajax/matches/${window.tournament_id}`; // Append tournament ID to the URL
                break;
            case "teams":
                url = `/v1/api/ajax/teams/${window.tournament_id}`; // Append tournament ID to the URL
                break;
            case "groups":
                url = `/v1/api/ajax/groups/${window.tournament_id}`; // Append tournament ID to the URL
                break;
            default:
                url = `/v1/api/ajax/matches/${window.tournament_id}`; // Default to matches if no tab matches
>>>>>>> ab299aa19bf02ec72f9e40ee181a5c47b77740f6
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
