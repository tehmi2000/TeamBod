// const socket = io();
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

const searchHandler = (evt) => {
    evt.preventDefault();
    fetch(``)
};

const createHandler = (e) => {
    e.preventDefault();
    let validation = [true];

    document.querySelectorAll("#new-member-form [name]").forEach(field => {
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

    // if(shouldSubmit === true){
    console.log({validation, shouldSubmit});
    // }

    let bodyValue = {
        name: (function(){
            let namesList = [];
            document.querySelectorAll("#new-member-form [name='name']").forEach(field => {
                namesList.push(formatName(field.value));
            });

            return namesList.join(' ');
        }()),

        expertise: document.querySelector("[name='expertise']").value
    };

    console.log(bodyValue);
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
            let div20 = createComponent("DIV", object['name']);
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

const getAllTeam = function() {

    fetch(`/api/allTeam`).then(async function(response) {

        try{
            let allTeamMembers = await response.json();
            allTeamMembers.forEach(item => {
                createItem(document.querySelector("#display-pane"), item);
            });

        }catch(error) {
            console.error(error);
        }

    }).catch(function(error) {
        console.error(error);
    });
};

document.addEventListener("DOMContentLoaded", function () {
    getAllTeam();
    document.querySelector("#new-member-form").addEventListener("submit", createHandler);
});