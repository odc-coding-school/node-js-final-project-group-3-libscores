import { formatDate } from "/javascripts/utils.js";

var league_one_header = `
    <section class="">
        <a href="/first_division" class="bg-gray  row margin-top small-round">
        <img src="/images/league_1.png" alt="" class="xs-logo margin-left round">
        <h3 class="large bold">Orange First Division League</h3>
        <i class="fa-solid fa-chevron-right move-right margin-right"></i>
        </a>
    </section>
`

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
                    </section> 
                    `).insertBefore("#l1_scores");
                    console.log(item)
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
        $(league_one_header).insertBefore("#league_one");
        $("#loader").hide()
    },
})