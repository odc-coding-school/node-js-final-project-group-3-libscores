
$(document).ready(function () {

    $('#loader').hide()
    $('#errorMsg').hide()
    
    $("#loginBtn").click(function (e) { 
        e.preventDefault();

        $("#text").hide()
        $('#loader').show()
        $('#loginBtn').prop('disabled', true);
        $("#loader").addClass("spinner")

        $.post("/v1/api/login", data,
            function (data, textStatus, jqXHR) {
                
            },
            "json"
        );
    });
});