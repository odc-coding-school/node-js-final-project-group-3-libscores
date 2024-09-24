import { formatDate, removeWordFromEnd } from "/javascripts/utils.js";
    let year = new Date().getFullYear();
    let years = Array.from(new Array(5), (v, idx) => year - idx);


$(document).ready(function () {

    //get and display all editions
    $.get("/admin/cm/editions",
        function (data, textStatus, jqXHR) {
            if(textStatus == "success") {
                data.editions.forEach(edition => {
                   $( `
                      <section class="bg-white small-padding column small-round">
                        <span class="row large">
                            <h4>${edition.edition}</h4>
                            &middot;
                            <small class="cap">${edition.host}</small>
                        </span>
                        <span class="row muted small">
                            <small>Start: ${formatDate(edition.start)}</small>
                            &middot;
                            <small>End: ${formatDate(edition.end)}</small>
                            &middot;
                            <small>By: The Admin</small>
                        </span>
                    </section>
                    `).prependTo("#editionList");
                })
            } else {
                console.error("An error occurred")
            }
        },
        "json"
    );

    $.get("/api/counties",
        function (data, textStatus, jqXHR) {
            if(textStatus == "success") {
                data.counties.forEach(county => {
                   $( `
                       <option value="${county.county}">${county.county}</option>
                    `).prependTo("#editionHost");
                })
            } else {
                console.error("An error occurred")
            }
        },
        "json"
    );

     years.map((year,idx) =>  {
        console.log(year)
        $(`<option value="${year}">${year}</option>`).prependTo("#edition")
    })


    $("#edition").prependTo()

    $("#saveEdition").on("click", function saveEdition(evt) {
        let edition = $("#edition").val()
        let start = $("#editionStart").val()
        let end = $("#editionEnd").val()
        let host = $("#editionHost").val()

        let newData = {edition,start,end,host}

        $.ajax({
            type: "POST",
            url: "/admin/cm",
            data: newData,
            dataType: "json",
            success: function (response) {
                let edition = response.data[0]
                $( `
                    <section class="bg-white small-padding column small-round">
                      <span class="row large">
                          <h4>${edition.edition}</h4>
                          &middot;
                          <small class="cap">${edition.host}</small>
                      </span>
                      <span class="row muted small">
                          <small>Start: ${formatDate(edition.start)}</small>
                          &middot;
                          <small>End: ${formatDate(edition.end)}</small>
                          &middot;
                          <small>By: The Admin</small>
                      </span>
                  </section>
                  `).prependTo("#editionList");
            },
            error: function (err) {
                console.error(err)
            }
        });
    })
});

function renderEditions() {
    $("#editionList").load("/admin/cm/all", function (response, status, request) {
        this; // dom element
        console.log(response)
    });
}

function getEditions() {
    
    let editions = {}
    $.get("/admin/cm/all",
        function (data, textStatus, jqXHR) {
            if(textStatus == "success") {
                editions.data = data
                return editions
            } else {
                console.error("An error occurred")
            }
        },
        "json"
    );
    return editions
}
