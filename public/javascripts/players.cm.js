import { formatDate, removeWordFromEnd } from "/javascripts/utils.js";


$(document).ready(function () {
    $.get("/admin/cm/players/all",
        function (data, textStatus, jqXHR) {
            console.log(data)
        },
        "json"
    );

});

$("#addPlayer").on("submit", function (evt) {
})