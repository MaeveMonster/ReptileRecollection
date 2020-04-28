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
        <div id="content1">
            <ReactBootstrap.Form
                id="loginForm"
                name="loginForm"
                onSubmit={handleLogin}
                action="/login"
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
                <ReactBootstrap.Form.Control type="hidden" name="_csrf" value={props.csrf}/>
                <ReactBootstrap.Button type="submit" value="Login">Submit</ReactBootstrap.Button>
            </ReactBootstrap.Form>
        </div>

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
                <ReactBootstrap.Button type="submit" value="Sign up">Submit</ReactBootstrap.Button>
            </ReactBootstrap.Form>
        </div>

    );
};

const NavBar = () => {
    return(
        <ReactBootstrap.Navbar>
            <ReactBootstrap.Navbar.Brand href="/maker">Reptile Recollection</ReactBootstrap.Navbar.Brand>
            <ReactBootstrap.Nav.Link id="loginButton" href="/login">Login</ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link id="signupButton" href="/signup">Sign Up</ReactBootstrap.Nav.Link>
        </ReactBootstrap.Navbar>
    );
}

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

const createNavBar = () => {
    ReactDOM.render(
        <NavBar/>,
        document.querySelector("#navbar")
    );
};

const setup = (csrf) => {
    createNavBar();
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