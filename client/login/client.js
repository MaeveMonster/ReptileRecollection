const handleLogin = (e) => {
    e.preventDefault();

    $("reptileMessage").animate({width:'hide'}, 350);

    if($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Username or password is empty");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();

    $("#reptileMessage").animate({width:'hide'}, 350);

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

const LoginWindow = (props) => {
    return (
        <ReactBootstrap.Form
            id="loginForm" 
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
            >
            <ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Label>Username</ReactBootstrap.Form.Label>
                <ReactBootstrap.Form.Control id="user" type="text" name="username" placeholder="username"/>
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Label>Password</ReactBootstrap.Form.Label>
                <ReactBootstrap.Form.Control id="pass" type="password" name="pass" placeholder="password"/>
                <ReactBootstrap.Form.Control type="hidden" name="_csrf" value={props.csrf}/>
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Button variant="primary" type="submit">Submit</ReactBootstrap.Button>
        </ReactBootstrap.Form>
    );
};

const SignupWindow = (props) => {
    return (
        <div id="content2">
            <ReactBootstrap.Form
                id="signupForm"
                name="signupForm"
                onSubmit={handleSignup}
                action="/signup"
                method="POST"
                classname="mainForm"
                >
                <ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Label>Username</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control id="user" type="text" name="username" placeholder="username"/>
                </ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Label>Password</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control id="pass" type="password" name="pass" placeholder="password"/>
                </ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Label>Password</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control id="pass2" type="password" name="pass2" placeholder="retype password"/>
                </ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Control type="hidden" name="_csrf" value={props.csrf}/>
                <ReactBootstrap.Button variant="primary"className="formSubmit" type="submit" value="Sign up">Submit</ReactBootstrap.Button>
            </ReactBootstrap.Form>
        </div>

    );
};

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");

    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    createLoginWindow(csrf); //default view
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});