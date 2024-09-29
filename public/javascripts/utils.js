export function formatDate(date) {
    let _date = new Date(date);
    let formatedDate = new Intl.DateTimeFormat("us-EN", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    }).format(_date);
  
    return formatedDate;
  }

  export function removeWordFromEnd(text, word) {
    if (text.endsWith(word)) {
      return text.slice(0, -word.length).trim();
    }
    return text;
  }

  export function getPageUrl() {
    let url = $(location).attr('href');
    return url.replace(/\/\s*$/, "").split('/').pop();
  }
  export function getPage() {
    let url = $(location).attr('href');

// Remove any trailing slash, then split the URL by '/'
let segments = url.replace(/\/\s*$/, "").split('/');

// Return the second-to-last segment (the page name)
return segments.length > 1 ? segments[segments.length - 2] : null;
  }
  

  export function showSnackbar(message) {
    var snackbar = $('#snackbar');
    snackbar.text(message); // Set the dynamic text
  
    snackbar.addClass('show');
  
    // After 3 seconds, remove the show class to hide the snackbar
    setTimeout(function() {
      snackbar.removeClass('show');
    }, 3000);
  }
  
  export function calculateAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);

    // Calculate the difference in years, months, and days
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust if the current month/day is before the birth month/day
    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Return the result based on the time passed
    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} old`;
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} old`;
    } else {
        return `${days} day${days > 1 ? 's' : ''} old`;
    }
}

/**
 * Populate the seasons select dropdown
 * @param {string} selectId - The ID of the select element to populate
 */
export function populateSeasonsSelect(selectId) {
  if (!selectId) {
      console.error("Select ID is required.");
      return;
  }

  const $select = $(`#${selectId}`);

  // Fetch seasons from API and populate the dropdown
  getSeasons().then(seasons => {
      // Clear existing options
      $select.empty();

      // Populate the select with new options
      seasons.forEach(season => {
          const formattedDate = formatSeasonDates(season.start, season.end); // Use the updated utility function
          const option = $('<option></option>').val(season.id).text(formattedDate);
          $select.append(option);
      });
  }).catch(err => {
      console.error(err);
  });
}


/**
 * Format season dates into a display string.
 * @param {string} startDate - The start date in ISO format (YYYY-MM-DD).
 * @param {string} endDate - The end date in ISO format (YYYY-MM-DD).
 * @returns {string} Formatted season date string (e.g., "Jun 2015 - Aug 2016").
 */
export function formatSeasonDates(startDate, endDate) {
  const start = new Date(startDate); // Create Date object from start date
  const end = new Date(endDate); // Create Date object from end date

  const startMonth = start.toLocaleString('default', { month: 'short' }); // Short month name
  const startYear = start.getFullYear(); // Extract year from start date
  const endMonth = end.toLocaleString('default', { month: 'short' }); // Short month name for end date
  const endYear = end.getFullYear(); // Extract year from end date

  return `${startMonth} ${startYear} - ${endMonth} ${endYear}`; // Format and return
}
/**
* Fetch the list of seasons from the API
* @returns {Promise<Array>} A promise that resolves with the list of seasons
*/
export function getSeasons() {
  return new Promise((resolve, reject) => {
      const apiRoute = '/dashboard/seasons'; // Updated to point to the seasons endpoint
      
      $.get(apiRoute, function(data, textStatus) {
          if (textStatus === "success") {
              resolve(data); // Assuming the response contains an array of season objects
          } else {
              reject("Error fetching seasons.");
          }
      }, "json");
  });
}
/**
 * Fetches team suggestions based on the provided query.
 * 
 * @param {string} query - The search term for team suggestions.
 * @returns {Promise<Array>} A promise that resolves to an array of team suggestions.
 * @throws {Error} Throws an error if the AJAX request fails.
 */
export function fetchTeamSuggestions(query) {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: '/v1/api/clubs/suggest', // This is the endpoint we just defined
          method: 'GET',
          data: { q: query },
          success: function (data) {
              resolve(data);
          },
          error: function (err) {
              reject(err);
          }
      });
  });
  
}

// Helper function to handle errors
export const handleError = (res, err, customMessage = 'An error occurred') => {
  console.error(err);
  res.status(500).json({ message: customMessage });
};

/**
 * Fetches all phases by making an AJAX GET request to the /dashboard/phases route.
 * Returns a promise that resolves with the phase data or rejects if there's an error.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of phase objects.
 */
export function getPhases() {
  return new Promise((resolve, reject) => {
      const apiRoute = '/dashboard/phases'; // Endpoint for fetching phases

      $.get(apiRoute, function(data, textStatus) {
          if (textStatus === "success") {
              resolve(data); // Assuming the response contains an array of phase objects
          } else {
              reject("Error fetching phases.");
          }
      }, "json").fail(function(jqXHR, textStatus, errorThrown) {
          reject(`Error fetching phases: ${textStatus} - ${errorThrown}`);
      });
  });
}


/**
 * Populate the phases select dropdown.
 * @param {string} selectId - The ID of the select element to populate.
 */
export function populatePhasesSelect(selectId) {
    if (!selectId) {
        console.error("Select ID is required.");
        return;
    }

    const $select = $(`#${selectId}`);

    // Fetch phases from the API and populate the dropdown
    getPhases().then(phases => {
        // Clear existing options
        $select.empty();

        // Populate the select with new options
        phases.forEach(phase => {
          const formattedDate = formatSeasonDates(phase.start, phase.end); // Use the updated utility function
         
            const option = $('<option></option>').val(phase.phase_id).text(formattedDate);
            $select.append(option);
        });
    }).catch(err => {
        console.error('Error populating phases:', err);
    });
}











