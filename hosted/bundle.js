"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#reptileMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("reptileMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
"use strict";

var handleReptile = function handleReptile(e) {
  e.preventDefault();
  $("#reptileMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#reptileName").val() == '' || $("#reptileAge").val() == '' || $("#reptileDescription").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("reptileForm").attr("action"), $("#reptileForm").serialize(), function () {
    loadReptilesFromServer();
  });
  return false;
};

var ReptileForm = function ReptileForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "reptileForm",
      onSubmit: handleReptile,
      name: "reptileForm",
      action: "/maker",
      method: "POST",
      className: "reptileForm",
      style: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "reptileName",
      type: "text",
      name: "name",
      placeholder: "Reptile Name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "age"
    }, "Age: "), /*#__PURE__*/React.createElement("input", {
      id: "reptileAge",
      type: "text",
      name: "age",
      placeholder: "Reptile Age"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "description"
    }, "Description: "), /*#__PURE__*/React.createElement("input", {
      id: "reptileDescription",
      type: "text",
      name: "description",
      placeholder: "Reptile Description"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeReptileSubmit",
      type: "submit",
      value: "Make Reptile"
    }))
  );
};

var ReptileList = function ReptileList(props) {
  if (props.reptiles.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "reptileList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyReptile"
      }, "No Reptiles yet"))
    );
  }

  var reptileNodes = props.reptiles.map(function (reptile) {
    return (/*#__PURE__*/React.createElement("div", {
        key: reptile._id,
        className: "reptile"
      }, /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/iguana.jpg",
        alt: "reptile face",
        className: "reptileFace"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "reptileName"
      }, " Name: ", reptile.name, " "), /*#__PURE__*/React.createElement("h3", {
        className: "reptileAge"
      }, " Age: ", reptile.age, " "), /*#__PURE__*/React.createElement("h3", {
        className: "reptileDescription"
      }, " Description: ", reptile.description, " "))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "reptileList"
    }, reptileNodes)
  );
};

var loadReptilesFromServer = function loadReptilesFromServer() {
  sendAjax('GET', '/getReptiles', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ReptileList, {
      reptiles: data.reptiles
    }), document.querySelector("#reptiles"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ReptileForm, {
    csrf: csrf
  }), document.querySelector("#makeReptile"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ReptileList, {
    reptiles: []
  }), document.querySelector("#reptiles"));
  loadReptilesFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
