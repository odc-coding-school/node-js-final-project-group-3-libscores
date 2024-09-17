var URLv1="https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=Liberia";
"5244"
var tableUrl = "https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=5244&s=2022-2023"

console.log(URLv1)

$(document).ready(function () {
    function fetchLeagueData(apiUrl, divId) {
        $.ajax({
    
          url: tableUrl,
          method: 'GET',
          success: function (data) {
            let { league, games } = data.result;
    
        // Convert 'games' object into an array and sort by time in descending order
        const sortedGames = Object.values(games).sort((a, b) => new Date(b.time.start) - new Date(a.time.start));
    
        sortedGames.forEach(item => {
        $(` 
            `
        ).appendTo(`#${divId}`);  // Adjust target as necessary
        });
          },
          error: function (err) {
            console.error(`Error fetching data for div ${divId}: `, err);
          }
        });
      }
});