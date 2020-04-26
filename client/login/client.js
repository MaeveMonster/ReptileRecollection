import Form from 'react-bootstrap/Form';
import Button from '../../node_modules/react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


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
        <Form
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            >
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter username"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password"/>
                <Form.Control type="hidden" name="_csrf" value={props.csrf}/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
};

const SignupWindow = (props) => {
    return (
        <div id="content2">
            <Form
                onSubmit={handleSignup}
                action="/signup"
                method="POST"
                >
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="email" placeholder="Enter username"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"/>
                </Form.Group>
                <Form.Control type="hidden" name="_csrf" value={props.csrf}/>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
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