// const socket = io();
const globalData = {

};

let responseDisplay = null;

let testData = [
    {
        id: "one",
        imageUrl: "../assets/images/images\ \(10\).jpeg",
        name: "Temiloluwa Ogunbanjo",
        expertise: "Web Developer",
        tools: [
            {name: "Python", level: "beginner"},
            {name: "Java", level: "expert"}
        ]
    },

    {
        id: "two",
        imageUrl: "../assets/images/93e255a17f2149c6b2ab4e7e2cf208d6.jpg",
        name: "Abdul Malik",
        expertise: "Fullstack Web Developer",
        tools: [
            {name: "Python", level: "beginner"},
            {name: "Java", level: "intermediate"},
            {name: "Python", level: "expert"},
            {name: "Java", level: "beginner"}
        ]
    },

    {
        id: "three",
        imageUrl: "",
        name: "Adebanjo Kitan",
        expertise: "UI/UX Designer",
        tools: [
            {name: "Photoshop", level: "expert"},
            {name: "Java", level: "beginner"}
        ]
    }
];

let testDataProject = [
    {
        name: "Project Univers",
        description: "",
        numberInTeam: 10
    }
];

const dataValidator = data => {
    // console.log(data);
    const result = {
        valid: false,
        data: null
    };

    if(data.length > 0){
        let [dataOne] = data;
        // console.log(dataOne);
    }else{
        
    }

    result.valid = true;
    result.data = data;
    return result;
};

const formValidator = (fields) => {
    let validation = [true];

    fields.forEach(field => {
        let check = field.value !== '';
        if(check === false){
            field.classList.toggle("invalid", true);
        }else{
            field.classList.toggle("invalid", false);
        }
        validation.push(check);
    });

    let shouldSubmit = !validation.some(item =>{
        return item === false;
    });

    return shouldSubmit;
};

const searchHandler = (evt) => {
    evt.preventDefault();
    // fetch(``)
};

const uploadHandler = (evt) => {
    evt.preventDefault();
    let input = document.querySelector("input[name='upload-img']").files[0];
    let form = new FormData();
    form.append("file", input);
    console.log(input);
    let options = {
        method: "POST",
        body: form,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    delete options.headers['Content-Type'];
    fetch(`/api/upload`, options).then(response => {
        console.log("Success");
    }).catch(error => {
        console.error(error);
    });
};

const createProjectHandler = (e) => {
    e.preventDefault();

    const isOk = formValidator(document.querySelectorAll("#new-project-form [name]"));
    const apiUrl = `/api/TeamBod-Admin/createProject`;
    const bodyValue = {
        name: document.querySelector("#new-project-form [name='name']").value,
        description: document.querySelector("#new-project-form [name='description']").value
    };
    const options = {
        method: "POST",
        body: JSON.stringify(bodyValue),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    };

    console.log(bodyValue);

    if(isOk === true){
        document.querySelector("#new-project-form input[type='submit']").value = "Creating Project...";
        fetch(apiUrl, options).then(async response => {
            let result = await response.json();
            let data = dataValidator(result).data;
            
            if(data){
                document.querySelector("#new-project-form").style.top = "-100%";
                data.forEach(item => {
                    createProjectItem(document.querySelector("#display-pane"), item);
                });
            }
        }).catch(error => {
            console.error(error);
        });
    }
};

const createTeamHandler = (e) => {
    e.preventDefault();

    const isOk = formValidator(document.querySelectorAll("#new-member-form [name]"));
    const apiUrl = `/api/TeamBod-Admin/${globalData.currentProject}/addTeamMember`;
    let bodyValue = {
        name: (function(){
            let namesList = [];
            document.querySelectorAll("#new-member-form [name='name']").forEach(field => {
                namesList.push(formatName(field.value));
            });
            return namesList.join(' ');
        }()),

        expertise: document.querySelector("#new-member-form [name='expertise']").value
    };

    const options = {
        method: "POST",
        body: JSON.stringify(bodyValue),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    };

    if(isOk === true){
        document.querySelector("#new-member-form input[type='submit']").value = "Adding New Team Member...";
        fetch(apiUrl, options).then(async response => {
            let result = await response.json();
            let data = dataValidator(result).data;

            if(data){
                document.querySelector("#new-member-form").style.top = "-100%";
                result.forEach(item => {
                    createItem(document.querySelector("#display-pane"), item);
                });
            }
        }).catch(error => {
            console.error(error);
        });
    }
};

const createItem = function(container, object){

    // <div class="user-item">
    //     <div class ="user-img"></div>
    //     <div class="user-info">
    //         <div class="user-name">Abdul Malik</div>
    //         <div class="user-expertise">Full-Stack Web Developer</div>
    //         <div class="user-tools">
    //             <div class="heading">Tools & Proficiency</div>
    //             <div class="tool-list rows">
    //                 <span class="tool rows">
    //                     <i class="grey"></i>
    //                     <span>Python</span>
    //                 </span>
    //                 <span class="tool rows">
    //                     <i class="yellow"></i>
    //                     <span>Java</span>
    //                 </span>
    //             </div>
    //         </div>
    //         <div class="user-buttons">
    //             <button class="strip-btn user-more">View Profile</button>
    //         </div>
    //     </div>
    // </div>

    const color = {
        "beginner": "grey",
        "intermediate": "green",
        "expert": "red"
    };

    let div0 = create("DIV");
        let div1 = create("DIV");
        let div2 = create("DIV");
            let div20 = createComponent("DIV", object.name);
            let div21 = createComponent("DIV", object['expertise']);
            let div22 = create("DIV");
                let div220 = createComponent("DIV", "Tools & Proficiency");
                let div221 = create("DIV");
            let div23 = create("DIV");
                let button23 = createComponent("BUTTON", "View More");


    div0.classList.add("user-item");
    div1.classList.add("user-img");
    div2.classList.add("user-info");
    div20.classList.add("user-name");
    div21.classList.add("user-expertise");
    div22.classList.add("user-tools");
    div220.classList.add("heading");
    div221.classList.add("tool-list", "rows");
    div23.classList.add("user-buttons");
    button23.classList.add("strip-btn", "user-more");

    div0.setAttribute("id", `${object['id']}`);
    button23.setAttribute("id", `view_${object['id']}`);

    div221.innerHTML = object.tools.map(item => {
        let el = `<span class="tool rows"><i class='${color[item.level]}'></i><span>${item.name}</span></span>`;
        return el;
    }).join('');

    div22 = joinComponent(div22, div220, div221);
    div23.appendChild(button23);
    div2 = joinComponent(div2, div20, div21, div22, div23);
    div0 = joinComponent(div0, div1, div2);
    container.appendChild(div0);

    document.querySelector(`#${object['id']} .user-img`).style.backgroundImage = `url('${object['imageUrl']}')`;
};

const createProjectItem = (container, object) =>{
    // <div class="project-item">
    //     <div class="project-name">Univers</div>
    //     <div class="project-team-number">Number of people on Project: 5</div>
    // </div>

    let div0 = create("DIV");
        let div1 = createComponent("DIV", `${object['name']}`);
        let div2 = createComponent("DIV", `Team Population: ${object['numberInTeam']}`);

    div0.classList.add("project-item");
    div1.classList.add("project-name");
    div2.classList.add("project-team-number");

    div0.addEventListener("click", function(){
        getAllTeam(`${object['name']}`);
        changeHandler("team");
    });

    div0 = joinComponent(div0, div1, div2);
    container.appendChild(div0);
};

const showResponseBar = (timerObject) => {
    
    if(globalData['timer']){
        clearTimeout(globalData['timer']);
    }

    responseDisplay.classList.toggle("show", true);
    responseDisplay.innerHTML = timerObject.label;

    switch (timerObject.action) {
        case 'process':
            globalData['timer'] = setTimeout(()=>{
                responseDisplay.innerHTML = timerObject.nullLabel;
                clearTimeout(globalData['timer']);
                globalData['timer'] = null;
        
                const intime = setTimeout(()=>{
                    responseDisplay.classList.toggle("show", false);
                    clearTimeout(intime);
                }, 5000);
            }, timerObject.timeout * 1000);
            break;
    
        case 'status':
            globalData['timer'] = setTimeout(()=>{
                clearTimeout(globalData['timer']);
                globalData['timer'] = null;
                responseDisplay.classList.toggle("show", false);
            }, timerObject.timeout * 1000);
            break;
        default:
            break;
    }

    
};

const getAllProject = () => {
    let apiUrl = `/api/TeamBod-Admin/allProject`;

    showResponseBar({
        action: "process",
        label: "Getting your Projects...",
        timeout: 25,
        nullLabel: "Something went wrong!"
    });

    fetch(apiUrl).then(async function(response) {
        try{
            let result = await response.json();
            document.querySelector("#display-pane").innerHTML = "";
            document.querySelector("main .indicators").style.opacity = "0";

            let data = dataValidator(result).data;
            if(data){
                showResponseBar({
                    action: "status",
                    label: "Done!",
                    timeout: 4,
                    nullLabel: null
                });

                data.forEach(item => {
                    createProjectItem(document.querySelector("#display-pane"), item);
                });
            }

        }catch(error) {
            console.error(error);
            showResponseBar({
                action: "status",
                label: `An error ocurred!`,
                timeout: 5,
                nullLabel: null
            });
        }

    }).catch(function(error) {
        console.error(error);
        showResponseBar({
            action: "status",
            label: "The process failed to get your request! Try again?",
            timeout: 5,
            nullLabel: null
        });
    });
};

const getAllTeam = (projectName) => {
    let apiUrl = `/api/TeamBod-Admin/${projectName}/allTeam`;
    showResponseBar({
        action: "process",
        label: `Getting team members for ${projectName}...`,
        timeout: 25,
        nullLabel: "Something went wrong!"
    });
    fetch(apiUrl).then(async function(response) {
        try{
            let result = await response.json();
            document.querySelector("#display-pane").innerHTML = ``;
            document.querySelector("main .indicators").style.opacity = "1";
            document.querySelector(".top-pane .navigation-btn").innerHTML = `...<i class='icofont-back'></i>Back&nbsp; | &nbsp;${projectName}`;

            let data = dataValidator(result).data;
            if(data){
                showResponseBar({
                    action: "status",
                    label: "Done!",
                    timeout: 4,
                    nullLabel: null
                });
                data.forEach(item => {
                    createItem(document.querySelector("#display-pane"), item);
                });
            }

            globalData['currentProject'] = projectName;

        }catch(error) {
            console.error(error);
            showResponseBar({
                action: "status",
                label: `An error ocurred!`,
                timeout: 5,
                nullLabel: null
            });
        }

    }).catch(function(error) {
        console.error(error);
        showResponseBar({
            action: "status",
            label: "The process failed to get your request! Try again?",
            timeout: 5,
            nullLabel: null
        });
    });
};

const displayMemberForm = () => {
    document.querySelector("#new-member-form").style.top = "50%";
};

const displayProjectForm = () => {
    document.querySelector("#new-project-form").style.top = "50%";
};

const changeHandler = (type) => {
    const button = document.querySelector("button.add-user");
    switch (type) {
        case "project":
            try {
                button.removeEventListener("click", displayMemberForm);
            } catch (error) {
                console.log(error);
            }

            button.addEventListener("click", displayProjectForm);
            break;

        case "team":
            try {
                button.removeEventListener("click", displayProjectForm);
            } catch (error) {
                console.log(error);
            }

            button.addEventListener("click", displayMemberForm);
            break;
    
        default:
            break;
    }
};


const addListeners = () => {
    responseDisplay = document.querySelector(".response-display");
    const newMemberForm = document.querySelector("#new-member-form");
    const newProjectForm = document.querySelector("#new-project-form");

    document.querySelector(".top-pane .navigation-btn").addEventListener('click', function(evt) {
        evt.currentTarget.innerHTML = "All Project";
        getAllProject();
        changeHandler("project");
    });

    newMemberForm.addEventListener("submit", createTeamHandler);
    newProjectForm.addEventListener("submit", createProjectHandler);

    document.querySelector("#new-member-form [data-cancel-btn]").addEventListener("click", function(evt) {
        newMemberForm.style.top = "-100%";
    });

    document.querySelector("#new-project-form [data-cancel-btn]").addEventListener("click", function(evt) {
        newProjectForm.style.top = "-100%";
    });

    document.querySelector("button.add-user").addEventListener("click", displayProjectForm);
    // document.querySelector("#upload-test").addEventListener("submit", uploadHandler);
};

document.addEventListener("DOMContentLoaded", function () {
    addListeners();
    getAllProject();
});