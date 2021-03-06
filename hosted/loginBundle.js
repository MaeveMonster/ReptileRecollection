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
  return (/*#__PURE__*/React.createElement("div", {
      id: "content1"
    }, /*#__PURE__*/React.createElement(ReactBootstrap.Form, {
      id: "loginForm",
      name: "loginForm",
      onSubmit: handleLogin,
      action: "/login",
      method: "POST",
      classname: "mainForm"
    }, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Group, null, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Label, null, "Username"), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Control, {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    })), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Group, null, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Label, null, "Password"), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Control, {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    })), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Control, {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement(ReactBootstrap.Button, {
      type: "submit",
      value: "Login"
    }, "Submit")))
  );
};

var SignupWindow = function SignupWindow(props) {
  return (/*#__PURE__*/React.createElement("div", {
      id: "content2"
    }, /*#__PURE__*/React.createElement(ReactBootstrap.Form, {
      id: "signupForm",
      name: "signupForm",
      onSubmit: handleSignup,
      action: "/signup",
      method: "POST",
      classname: "mainForm"
    }, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Group, null, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Label, null, "Username"), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Control, {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    })), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Group, null, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Label, null, "Password"), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Control, {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    })), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Group, null, /*#__PURE__*/React.createElement(ReactBootstrap.Form.Label, null, "Password"), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Control, {
      id: "pass2",
      type: "password",
      name: "pass2",
      placeholder: "retype password"
    })), /*#__PURE__*/React.createElement(ReactBootstrap.Form.Control, {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement(ReactBootstrap.Button, {
      type: "submit",
      value: "Sign up"
    }, "Submit")))
  );
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
    }, "Sign Up"))
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

var createNavBar = function createNavBar() {
  ReactDOM.render( /*#__PURE__*/React.createElement(NavBar, null), document.querySelector("#navbar"));
};

var setup = function setup(csrf) {
  createNavBar();
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
