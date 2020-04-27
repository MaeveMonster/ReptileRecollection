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

var removeAds = false;

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
  return (/*#__PURE__*/React.createElement(ReactBootstrap.Form, {
      id: "reptileForm",
      onSubmit: handleReptile,
      name: "reptileForm",
      action: "/maker",
      method: "POST",
      className: "reptileForm"
    }, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Group, {
      "class": "reptileFormGroup"
    }, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Label, {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Control, {
      id: "reptileName",
      type: "text",
      name: "name",
      placeholder: "Reptile Name"
    })), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Group, {
      "class": "reptileFormGroup"
    }, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Label, {
      htmlFor: "age"
    }, "Age: "), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Control, {
      id: "reptileAge",
      type: "text",
      name: "age",
      placeholder: "Reptile Age"
    })), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Group, {
      "class": "reptileFormGroup"
    }, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Label, {
      htmlFor: "description"
    }, "Description: "), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Control, {
      id: "reptileDescription",
      type: "text",
      name: "description",
      placeholder: "Reptile Description"
    })), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Group, {
      "class": "reptileFormGroup",
      id: "reptileButton"
    }, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Control, {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement(ReactBootstrap.Button, {
      variant: "primary",
      classname: "makeReptileSubmit",
      type: "submit",
      value: "Make Reptile"
    }, "Make Reptile")))
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
    return (/*#__PURE__*/React.createElement(ReactBootstrap.Card, {
        key: reptile._id,
        className: "reptile"
      }, /*#__PURE__*/React.createElement(ReactBootstrap.Card.Header, null, reptile.name), /*#__PURE__*/React.createElement(ReactBootstrap.ListGroup, {
        variant: "flush"
      }, /*#__PURE__*/React.createElement(ReactBootstrap.ListGroup.Item, null, "Age: ", reptile.age), /*#__PURE__*/React.createElement(ReactBootstrap.ListGroup.Item, null, "Description: ", reptile.description)))
    );
  });
  return (/*#__PURE__*/React.createElement(ReactBootstrap.CardDeck, {
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

var NavBar = function NavBar() {
  return (/*#__PURE__*/React.createElement(ReactBootstrap.Navbar, null, /*#__PURE__*/React.createElement(ReactBootstrap.Navbar.Brand, {
      href: "/maker"
    }, "Reptile Recollection"), /*#__PURE__*/React.createElement(ReactBootstrap.Nav.Link, {
      id: "loginButton",
      href: "/login"
    }, "Login"), /*#__PURE__*/React.createElement(ReactBootstrap.Nav.Link, {
      id: "signupButton",
      href: "/signup"
    }, "Sign Up"), /*#__PURE__*/React.createElement(ReactBootstrap.Button, {
      variant: "primary",
      onClick: onClickRemoveAdsButton,
      id: "removeAdsButton"
    }, "Remove Ads"))
  );
};

var onClickRemoveAdsButton = function onClickRemoveAdsButton() {
  removeAds = true;
};

var AdSpace = function AdSpace() {
  return (/*#__PURE__*/React.createElement(ReactBootstrap.Carousel, null, /*#__PURE__*/React.createElement(ReactBootstrap.Carousel.Item, null, /*#__PURE__*/React.createElement("img", {
      src: "assets/img/Ad1.png",
      alt: "Advertisement 1"
    })), /*#__PURE__*/React.createElement(ReactBootstrap.Carousel.Item, null, /*#__PURE__*/React.createElement("img", {
      src: "assets/img/Ad2.png",
      alt: "Advertisement 2"
    })), /*#__PURE__*/React.createElement(ReactBootstrap.Carousel.Item, null, /*#__PURE__*/React.createElement("img", {
      src: "assets/img/Ad3.png",
      alt: "Advertisement 3"
    })))
  );
};

var createAdSpace = function createAdSpace() {
  if (!removeAds) {
    ReactDOM.render( /*#__PURE__*/React.createElement(AdSpace, null), document.querySelector("#adspace"));
  }
};

var createNavBar = function createNavBar() {
  ReactDOM.render( /*#__PURE__*/React.createElement(NavBar, null), document.querySelector("#navbar"));
};

var setup = function setup(csrf) {
  createNavBar();
  ReactDOM.render( /*#__PURE__*/React.createElement(ReptileForm, {
    csrf: csrf
  }), document.querySelector("#makeReptile"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ReptileList, {
    reptiles: []
  }), document.querySelector("#reptiles"));
  loadReptilesFromServer();
  createAdSpace();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
