var URLv1="https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=Liberia";
// /api/v1/json/3/lookuptable.php?l=4328&s=2020-2021

console.log(URLv1)

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url:URLv1,
        dataType: "json",
        success: function (response) {
            console.log(response)
        },
        error: function (err) {
            console.log(err)
        }
    });
});