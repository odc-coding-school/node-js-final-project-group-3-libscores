$(document).ready(function () {
    $.get("/v1/api/clubs",
        function (data, textStatus, jqXHR) {
            if (textStatus == "success") {
                console.log(data)
                $.each(data.clubs, function (index, team) { 
                    $(` 
                        <tr class="tr " id="${index}">
                          <td class="td">
                          <img src="/images/${team.badge}" class="tiny-logo">
                          </td>
                          <td class="first wide td row">
                              <span>${team.club}</span>
                          </td>
                          <td class="td">${team.squad == null ? '0': team.squad}</td>
                          <td class="td">${team.country_id == 1 ? 'Liberia' : team.country_id}</td>
                          <td class="td">${team.market_value}</td>
                          <td class="td">${team.stadium}</td>
                          <td class="td">${team.founded}</td>
                          <td class="td">  
                             <button data-ui="#clubDialog" class="icon-button round"> <i class="fa fa-pen"></i></button>
                          </td>
                      </tr>
                      `
                    ).appendTo(`#clubs`);  // Adjust target as necessary
                  });
            } else {
                console.log("an error occured")
            }
        },
        "json"
    );
});

function getClubs() {
    let res = {clubs: null}
    $.get("/v1/api/clubs",
        function (data, textStatus, jqXHR) {
            if (textStatus == "success") {
                console.log(data)
                res.clubs = data.clubs
            } else {
                console.log("an error occured")
            }
        },
        "json"
    );
    return res
}

function getClubsById(id) {
    let res = {club: null}
    $.get(`/v1/api/clubs/${id}`,
        function (data, textStatus, jqXHR) {
            if (textStatus == "success") {
                console.log(data)
                res.club = data.clubs
            } else {
                console.log("an error occured")
            }
        },
        "json"
    );
    return res
}