$(document).ready(function () {
    alert("data.editions")
    //get and display all editions
    $.get("/admin/cm/editions/all",
        function (data, textStatus, jqXHR) {
            if(textStatus == "success") {
                data.editions.forEach(edition => {
                    $( `
                        <option value="${edition.id}">${edition.edition}</option>
                     `).prependTo("#cmEditions");
                })
                
            } else {
                console.error("An error occurred")
            }
        },
        "json"
    );
});