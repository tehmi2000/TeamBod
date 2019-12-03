const model = function() {
    const router = require("express").Router();
    const fs = require("fs");
    const controller = require("../modules/controller");
    const config =  require("../modules/config");
    const ph = require("../modules/passwordHash");
    const { mongoConn, log, ObjectID } = config;

    function forEach(elements, reaction){
        for(let i = 0; i < elements.length; i++){
            (reaction)(elements[i]);
        }
    }

    const readFile = function(path, req, res) {
        fs.readFile(path, "utf8", function(err, content) {
            if (err) {
                config.log(err);
            } else {
                res.end(content);
            }
        });
    };

    const formatName = function(str){
        let formattedString = (str.charAt(0)).toUpperCase()+(str.substring(1)).toLowerCase();
        return formattedString;
    };

    router.get("/:project/allTeam", function(req, res){
        let projectName = req.params.project;
        console.log(projectName);
        
        const testData = [
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

        res.json(testData);
    });

    router.get("/user/:username", function(req, res) {

    });

    router.post("/addTeamMember", (req, res) => {
        const {name} = req.body;

        let insertData = {
            name
        };

        mongoConn.then(client => {
            const collection = client.db(`Project-Univers`).collection(`Team-Members`);
            collection.insertOne(insertData, (err, result) => {
                if (err) {
                    log(err);
                    res.json(err);
                }else{
                    res.json(result);
                }
            });
        }).catch(error => {
            log(error);
        });
    });

    router.get("/removeTeamMember/:memberID", (req, res) => {
        let memberID = req.params.memberID;
    
        mongoConn.then(client => {
            const collection = client.db(`Project-Univers`).collection(`Team-Members`);

            collection.deleteOne({"_id": ObjectID(memberID)}, (err, result) => {
                if (err) {
                    log(err);
                    res.json(err);
                }else{
                    res.json(result);
                }
            });
        }).catch(error => {
            log(error);
        });
    });

    return router;
};

module.exports = model();
