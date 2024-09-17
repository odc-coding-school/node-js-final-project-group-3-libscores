import { formatDate, removeWordFromEnd } from "/javascripts/utils.js";
const leagueMap = {
    'l1': 'league_one',
    'l2': 'women_league',
    'l3': 'some_other_league',
    // Add other mappings as needed
  };

$(document).ready(function () {
    $.get("https://www.scorebar.com/api/league//tournament/2315/liberia-second-division",
        function (data, status) {
            let {league, games} = data.result
            for (const key in games) {
                if (Object.prototype.hasOwnProperty.call(games, key)) {
                    const item = games[key];
                    $(`
                       <section class="box row padding margin-top padding-right">
                        <h3 class="${item.status == 3 ? 'black' : 'red'} margin-right column center-align small">
                        <span>${item.status ==3 ? 'FT' : '90'}</span>
                        <span>${formatDate(item.time.start)}</span>
                        </h3>
                        <section class="column max">
                            <span class="row">
                                <img src="${item.teams.home.logo ? item.teams.away.logo : '/images/shield.webp' }" alt="" class="xs-logo">
                                <h3 class="bold max">${item.teams.home.name}</h3>
                                <h3 class="${item.status == 3 ? 'black' : 'red'}">${item.score.summary.score1}</h3>
                            </span>
                            <span class="row">
                                <img src="${item.teams.away.logo ? item.teams.away.logo : '/images/shield.webp' }" alt="" class="xs-logo">
                                <h3 class="bold max">${item.teams.away.name}</h3>
                                <h3 class="${item.status == 3 ? 'black' : 'red'}">${item.score.summary.score1}</h3>
                            </span>
                        </section>
                    </section>`).insertBefore("#l1");
                }
            }
        },
    );
});


$(document).on({
    ajaxStart: function(){
        $("#loader").show()
    },
    ajaxStop: function(){
        $(`<section class="">
        <a href="/first_division" class="bg-gray  row margin-top small-round">
        <img src="/images/league_1.png" alt="" class="xs-logo margin-left round">
        <h3 class="large bold">Orange First Division League</h3>
        <i class="fa-solid fa-chevron-right move-right margin-right"></i>
        </a>
    </section>`).insertBefore("#league_one");
        $(`<section class="">
        <a href="/women_league" class="bg-gray  row margin-top small-round">
        <img src="/images/women_league.jpg" alt="" class="xs-logo margin-left round">
        <h3 class="large bold">National Women League</h3>
        <i class="fa-solid fa-chevron-right move-right margin-right"></i>
        </a>
    </section>`).insertBefore("#women_league");
        $("#loader").hide()
    },
})



// $(document).ready(function () {
//     $.get("https://www.scorebar.com/api/league//tournament/1565/liberia-national-league-women",
//         function (data, status) {
//             let {league, games} = data.result
//             for (const key in games) {
//                 if (Object.prototype.hasOwnProperty.call(games, key)) {
//                     const item = games[key];
//                     $(`
//                        <section class="box row padding margin-top padding-right">
//                         <h3 class="${item.status == 3 ? 'black' : 'red'} margin-right column center-align small">
//                         <span>${item.status ==3 ? 'FT' : '90'}</span>
//                         <span>${formatDate(item.time.start)}</span>
//                         </h3>
//                         <section class="column max">
//                             <span class="row">
//                                 <img src="${item.teams.home.logo ? item.teams.away.logo : '/images/shield.webp' }" alt="" class="xs-logo">
//                                 <h3 class="bold max">${removeWordFromEnd(item.teams.home.name, "Women")}</h3>
//                                 <h3 class="${item.status == 3 ? 'black' : 'red'}">${item.score.summary.score1}</h3>
//                             </span>
//                             <span class="row">
//                                 <img src="${item.teams.away.logo ? item.teams.away.logo : '/images/shield.webp' }" alt="" class="xs-logo">
//                                 <h3 class="bold max">${removeWordFromEnd(item.teams.away.name, "Women")}</h3>
//                                 <h3 class="${item.status == 3 ? 'black' : 'red'}">${item.score.summary.score1}</h3>
//                             </span>
//                         </section>
//                     </section>`).insertBefore("#wl_scores");
//                     console.log(item)
//                 }
//             }
//         },
//     );
// });


function fetchLeagueData(leagueId) {
    $.ajax({
      url: `https://www.scorebar.com/api/league//tournament/${leagueId}`,  // Example API endpoint
      method: 'GET',
      success: function (data) {
        let {league, games} = data.result
        // Assuming each league's div has an id that matches the leagueId
       console.log(games)  // Insert data into the corresponding league div
      },
      error: function (err) {
        console.error(`Error fetching data for ${leagueId}: `, err);
      }
    });
  }

  fetchLeagueData("1565/liberia-national-league-women")

// Set up an IntersectionObserver to watch each league's div
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const divId = entry.target.id;
        const leagueId = leagueMap[divId];  // Get the corresponding league ID
        if (leagueId) {
          fetchLeagueData(leagueId);
          observer.unobserve(entry.target);  // Stop observing after data is fetched
        }
      }
    });
  }, { threshold: 0.1 });  // Adjust threshold as needed
  
  // Observe each league div
  $('.league-container').each(function() {
    observer.observe(this);  // Observe the league's div
  });
