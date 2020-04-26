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
        <ReactBootstrap.Card>
            <ReactBootstrap.Card.Body>
                <ReactBootstrap.Form
                    onSubmit={handleLogin}
                    action="/login"
                    method="POST"
                    >
                    <ReactBootstrap.Form.Group>
                        <ReactBootstrap.Form.Label>Username</ReactBootstrap.Form.Label>
                        <ReactBootstrap.Form.Control type="email" placeholder="Enter username"/>
                    </ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Group>
                        <ReactBootstrap.Form.Label>Password</ReactBootstrap.Form.Label>
                        <ReactBootstrap.Form.Control type="password" placeholder="Enter password"/>
                        <ReactBootstrap.Form.Control type="hidden" name="_csrf" value={props.csrf}/>
                    </ReactBootstrap.Form.Group>
                    <ReactBootstrap.Button variant="primary" type="submit">Submit</ReactBootstrap.Button>
                </ReactBootstrap.Form>
            </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
    );
};

const SignupWindow = (props) => {
    return (
        <div id="content2">
            <ReactBootstrap.Form
                onSubmit={handleSignup}
                action="/signup"
                method="POST"
                >
                <ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Label>Username</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control type="email" placeholder="Enter username"/>
                </ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Label>Password</ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control type="password" placeholder="Enter password"/>
                </ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"/>
                </ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Control type="hidden" name="_csrf" value={props.csrf}/>
                <ReactBootstrap.Button variant="primary" type="submit">Submit</ReactBootstrap.Button>
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