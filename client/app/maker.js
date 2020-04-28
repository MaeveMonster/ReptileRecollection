let removeAds = false;

const handleReptile = (e) => {
    e.preventDefault();

    $("#reptileMessage").animate({width:'hide'}, 350);

    if($("#reptileName").val() == '' || $("#reptileAge").val() == '' || $("#reptileDescription").val() == '') {
        handleError("All fields are required");
        return false;
    }

    sendAjax('POST', $("reptileForm").attr("action"), $("#reptileForm").serialize(), function() {
        loadReptilesFromServer();
    });

    return false;
};

const ReptileForm = (props) => {
    return (
        <ReactBootstrap.Form id="reptileForm"
            onSubmit={handleReptile}
            name="reptileForm"
            action="/maker"
            method="POST"
            className="reptileForm"
            >
            <ReactBootstrap.Form.Group class="reptileFormGroup">
                <ReactBootstrap.Form.Label htmlFor="name">Name: </ReactBootstrap.Form.Label>
                <ReactBootstrap.Form.Control id="reptileName" type="text" name="name" placeholder="Reptile Name"/>
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group class="reptileFormGroup">
                <ReactBootstrap.Form.Label htmlFor="age">Age: </ReactBootstrap.Form.Label>
                <ReactBootstrap.Form.Control id="reptileAge" type="text" name="age" placeholder="Reptile Age"/>
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group class="reptileFormGroup">
                <ReactBootstrap.Form.Label htmlFor="description">Description: </ReactBootstrap.Form.Label>
                <ReactBootstrap.Form.Control id="reptileDescription" type="text" name="description" placeholder="Reptile Description"/>
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group class="reptileFormGroup" id="reptileButton">
                <ReactBootstrap.Form.Control type="hidden" name="_csrf" value={props.csrf} />
                <ReactBootstrap.Button variant="primary" classname="makeReptileSubmit" type="submit" value="Make Reptile">Make Reptile</ReactBootstrap.Button>
            </ReactBootstrap.Form.Group>
        </ReactBootstrap.Form>
    );
};

const ReptileList = function(props) {
    if(props.reptiles.length === 0) {
        return (
            <div className="reptileList">
                <h3 className="emptyReptile">No Reptiles yet</h3>
            </div>
        );
    }

    const reptileNodes = props.reptiles.map(function(reptile) {
        return (
            <ReactBootstrap.Card key={reptile._id} className="reptile">
                <ReactBootstrap.Card.Img variant="top" src="assets/img/iguanaCard.png" />
                <ReactBootstrap.Card.Header>{reptile.name}</ReactBootstrap.Card.Header>
                <ReactBootstrap.ListGroup variant="flush">
                    <ReactBootstrap.ListGroup.Item>Age: {reptile.age}</ReactBootstrap.ListGroup.Item>
                    <ReactBootstrap.ListGroup.Item>Description: {reptile.description}</ReactBootstrap.ListGroup.Item>
                </ReactBootstrap.ListGroup>
            </ReactBootstrap.Card>
        );
    });

    return (
        <ReactBootstrap.CardDeck className="reptileList">
            {reptileNodes}
        </ReactBootstrap.CardDeck>
    );
}

const loadReptilesFromServer = () => {
    sendAjax('GET', '/getReptiles', null, (data) => {
        ReactDOM.render(
            <ReptileList reptiles={data.reptiles} />, document.querySelector("#reptiles")
        );
    });
};

const NavBar = () => {
    return(
        <ReactBootstrap.Navbar>
            <ReactBootstrap.Navbar.Brand href="/maker">Reptile Recollection</ReactBootstrap.Navbar.Brand>
            <ReactBootstrap.Nav.Link id="logoutButton" href="/logout">Logout</ReactBootstrap.Nav.Link>
            <ReactBootstrap.Button onClick={onClickRemoveAdsButton} id="removeAdsButton">Remove Ads</ReactBootstrap.Button>
        </ReactBootstrap.Navbar>
    );
};

const onClickRemoveAdsButton = () => {
    removeAds = true;
    createAdSpace();
};

const AdSpace = () => {
    return(
        <ReactBootstrap.Carousel>
            <ReactBootstrap.Carousel.Item>
                <img src="assets/img/Ad1.png" alt="Advertisement 1"/>
            </ReactBootstrap.Carousel.Item>
            <ReactBootstrap.Carousel.Item>
                <img src="assets/img/Ad2.png" alt="Advertisement 2"/>
            </ReactBootstrap.Carousel.Item>
            <ReactBootstrap.Carousel.Item>
                <img src="assets/img/Ad3.png" alt="Advertisement 3"/>
            </ReactBootstrap.Carousel.Item>
        </ReactBootstrap.Carousel>
    );
};

const createAdSpace = () => {
    if(removeAds){
        ReactDOM.render(
            null,
            document.querySelector("#adspace")
        );
    } else {
        ReactDOM.render(
            <AdSpace/>,
            document.querySelector("#adspace")
        );
    }
};

const createNavBar = () => {
    ReactDOM.render(
        <NavBar/>,
        document.querySelector("#navbar")
    );
};

const setup = function(csrf) {
    createNavBar();
    ReactDOM.render(
        <ReptileForm csrf={csrf} />, document.querySelector("#makeReptile")
    );

    ReactDOM.render(
        <ReptileList reptiles={[]} />, document.querySelector("#reptiles")
    );

    loadReptilesFromServer();
    createAdSpace();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});