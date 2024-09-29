import { populateSeasonsSelect } from "../utils.js";

$(document).ready(function () {
    populateSeasonsSelect("seasons")
    // Function to update the status based on start and end dates
    function updateStatus() {
        const startDate = new Date($('#start').val());
        const endDate = new Date($('#end').val());
        const currentDate = new Date();
        let status = '';

        if (!isNaN(startDate) && !isNaN(endDate)) { // Check if both dates are valid
            if (currentDate < startDate) {
                status = 'Pending';
            } else if (currentDate >= startDate && currentDate <= endDate) {
                status = 'Started';
            } else if (currentDate > endDate) {
                status = 'Ended';
            } 
        } else {
            status = ''; // Clear status if dates are not set
        }

        $('#status').val(status); // Update the status field
    }

    // Event listeners to update status when start or end date changes
    $('#start').on('change', updateStatus);
    $('#end').on('change', updateStatus);

    // Event handler for saving a new season
    $('#saveSeason').on('click', function (event) {
        event.preventDefault(); // Prevent default form submission
        // Extract competition_id from the URL
    const url = window.location.pathname; // e.g., '/competition/5'
    const competitionId = url.split('/').pop(); // Get the last part of the URL, which is the competition ID


        const competition_id = $('#competition_id').val() || competitionId; // Hidden field for competition_id
        const start = $('#start').val();
        const end = $('#end').val();
        const games = $('#games').val();
        const status = $('#status').val();
        const teams = 0

        // Ensure required fields are filled
        if (!start || !end || !competition_id) {
            $('#dialogMsg').show().addClass('error').text('Please fill in all fields.');
            return;
        }

        // Show loading spinner
        $('#spinner').show();
        $('#saveLeague').prop('disabled', true);

        // AJAX request to save the new season
        $.ajax({
            url: '/dashboard/seasons',
            type: 'POST',
            data: JSON.stringify({ competition_id, start, end, games, status,teams }), // Send data as JSON
            contentType: 'application/json',
            success: function (data) {
                // Show success message
                $('#dialogMsg').show().addClass('success').text('Season saved successfully');

                // Clear the input fields
                $('#start').val('');
                $('#end').val('');
                $('#games').val('');
                $('#status').val('');

                // Repopulate the select dropdown if necessary (function omitted for brevity)
                populateSeasonsSelect("seasons")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // Show error message
                $('#dialogMsg').show().addClass('error').text('An error occurred while saving the season.');
                console.error('Error saving season:', textStatus, errorThrown);
            }
        });
    });
});

