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

var _Form = _interopRequireDefault(require("react-bootstrap/Form"));

var _Button = _interopRequireDefault(require("../../node_modules/react-bootstrap/Button"));

require("bootstrap/dist/css/bootstrap.min.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var handleLogin = function handleLogin(e) {
  e.preventDefault();
  $("reptileMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Username or password is empty");
    return false;
  }

  console.log($("input[name=_csrf]").val());
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();
  $("#reptileMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
};

var LoginWindow = function LoginWindow(props) {
  return (/*#__PURE__*/React.createElement(_Form["default"], {
      onSubmit: handleLogin,
      action: "/login",
      method: "POST"
    }, /*#__PURE__*/React.createElement(_Form["default"].Group, null, /*#__PURE__*/React.createElement(_Form["default"].Label, null, "Username"), /*#__PURE__*/React.createElement(_Form["default"].Control, {
      type: "email",
      placeholder: "Enter username"
    })), /*#__PURE__*/React.createElement(_Form["default"].Group, null, /*#__PURE__*/React.createElement(_Form["default"].Label, null, "Password"), /*#__PURE__*/React.createElement(_Form["default"].Control, {
      type: "password",
      placeholder: "Enter password"
    }), /*#__PURE__*/React.createElement(_Form["default"].Control, {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    })), /*#__PURE__*/React.createElement(_Button["default"], {
      variant: "primary",
      type: "submit"
    }, "Submit"))
  );
};

var SignupWindow = function SignupWindow(props) {
  return (/*#__PURE__*/React.createElement("div", {
      id: "content2"
    }, /*#__PURE__*/React.createElement(_Form["default"], {
      onSubmit: handleSignup,
      action: "/signup",
      method: "POST"
    }, /*#__PURE__*/React.createElement(_Form["default"].Group, null, /*#__PURE__*/React.createElement(_Form["default"].Label, null, "Username"), /*#__PURE__*/React.createElement(_Form["default"].Control, {
      type: "email",
      placeholder: "Enter username"
    })), /*#__PURE__*/React.createElement(_Form["default"].Group, null, /*#__PURE__*/React.createElement(_Form["default"].Label, null, "Password"), /*#__PURE__*/React.createElement(_Form["default"].Control, {
      type: "password",
      placeholder: "Enter password"
    })), /*#__PURE__*/React.createElement(_Form["default"].Group, null, /*#__PURE__*/React.createElement(_Form["default"].Label, null, "Password"), /*#__PURE__*/React.createElement(_Form["default"].Control, {
      type: "password",
      placeholder: "Enter password"
    })), /*#__PURE__*/React.createElement(_Form["default"].Control, {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement(_Button["default"], {
      variant: "primary",
      type: "submit"
    }, "Submit")))
  );
};

var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");
  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  createLoginWindow(csrf); //default view
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
