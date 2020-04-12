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
        <form id="reptileForm"
              onSubmit={handleReptile}
              name="reptileForm"
              action="/maker"
              method="POST"
              className="reptileForm"
              style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
        >
            <label htmlFor="name">Name: </label>
            <input id="reptileName" type="text" name="name" placeholder="Reptile Name"/>
            <label htmlFor="age">Age: </label>
            <input id="reptileAge" type="text" name="age" placeholder="Reptile Age"/>
            <label htmlFor="description">Description: </label>
            <input id="reptileDescription" type="text" name="description" placeholder="Reptile Description"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeReptileSubmit" type="submit" value="Make Reptile" />
        </form>
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
            <div key={reptile._id} className="reptile">
                <img src="/assets/img/iguana.jpg" alt="reptile face" className="reptileFace" />
                <h3 className="reptileName"> Name: {reptile.name} </h3>
                <h3 className="reptileAge"> Age: {reptile.age} </h3>
                <h3 className="reptileDescription"> Description: {reptile.description} </h3>
            </div>
        );
    });
    
    return (
        <div className="reptileList">
            {reptileNodes}
        </div>
    );
}

const loadReptilesFromServer = () => {
    sendAjax('GET', '/getReptiles', null, (data) => {
        ReactDOM.render(
            <ReptileList reptiles={data.reptiles} />, document.querySelector("#reptiles")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <ReptileForm csrf={csrf} />, document.querySelector("#makeReptile")
    );
    
    ReactDOM.render(
        <ReptileList reptiles={[]} />, document.querySelector("#reptiles")
    );
    
    loadReptilesFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});