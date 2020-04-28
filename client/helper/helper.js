//handles user errors
const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#reptileMessage").animate({width:'toggle'}, 350);
};

//redirects to the correct page
const redirect = (response) => {
    $("reptileMessage").animate({width:'hide'}, 350);
    window.location = response.redirect;
};

//sends ajax
const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};