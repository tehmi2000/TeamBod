const model = function() {
    const router = require("express").Router();
    const fs = require("fs");
    const controller = require("../modules/controller");
    const config =  require("../modules/config");
    const ph = require("../modules/passwordHash");
    const { mongoConn, log, ObjectID } = config;

    // HELPER FUNCTIONS
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

    const formatToDBName = (name) => {
        let dBName = name.replace(' ', '-');
        return formatName(dBName);
    };


    // API ROUTES
    router.post("/upload", (req, res) => {
        console.log(req);
        res.end();
    });

    router.post("/:user/createProject", function(req, res){
        let user = formatToDBName(req.params.user);
        const insertData = {...req.body, numberInTeam: 0};
        console.log(user, insertData);

        mongoConn.then(client => {
            const collection = client.db(`${user}`).collection(`ProjectCollection`);

            collection.insertOne(insertData, (err, result) => {
                if (err) {
                    log(err);
                    res.json(err);
                }else{
                    res.json(result.ops);
                }
            });
        }).catch(error => {
            console.log(error);
        });
    });

    router.get("/:user/allProject", function (req, res) {
        let user = formatToDBName(req.params.user);
        const testData = [
            {
                name: "Project Univers",
                description: "",
                numberInTeam: 10
            },

            {
                name: "Project Hitmee",
                description: "",
                numberInTeam: 100
            }
        ];
        
        // res.json(testData);

        mongoConn.then(client => {
            const collection = client.db(`${user}`).collection(`ProjectCollection`);

            collection.find().toArray((err, docs) => {
                let data = (err)? [{...err}]: docs;
                res.json(data);
            });
            
        }).catch(error => {
            console.log(error);
        });
    });

    router.get("/:user/:project/allTeam", function(req, res){
        let user = formatToDBName(req.params.user);
        let projectName = formatToDBName(req.params.project);
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

        // res.json(testData);

        mongoConn.then(client => {
            const collection = client.db(`${projectName}`).collection(`Team-Members`);
            collection.find().toArray((err, result) => {
                if (err) {
                    log(err);
                    res.json([{...err}]);
                }else{
                    res.json(result);
                }
            });
        }).catch(error => {
            log(error);
        });
    });

    router.get("/:project/allTeam/:teamMemberID", function(req, res) {
        // Get team member profile
        let projectName = formatToDBName(req.params.project);
        res.json({});
    });

    router.post("/:user/:project/addTeamMember", (req, res) => {
        const insertValue = Object.assign({}, req.body, {
            imageUrl: "../assets/images/images\ \(10\).jpeg",
            tools: [
                {name: "Python", level: "beginner"},
                {name: "Java", level: "expert"}
            ]
        });

        let user = formatToDBName(req.params.user);
        let projectName = formatToDBName(req.params.project);

        let insertData = {
            imageUrl: "../assets/images/images\ \(10\).jpeg",
            name: "Temiloluwa Ogunbanjo",
            expertise: "Web Developer",
            tools: [
                {name: "Python", level: "beginner"},
                {name: "Java", level: "expert"}
            ]
        };

        mongoConn.then(client => {
            const collection = client.db(`${projectName}`).collection(`Team-Members`);
            collection.insertOne(insertValue, (err, result) => {
                if (err) {
                    log(err);
                    res.json(err);
                }else{
                    res.json(result.ops);
                }
            });
        }).catch(error => {
            log(error);
        });

        mongoConn.then(client => {
            const collection = client.db(`${user}`).collection(`ProjectCollection`);
            collection.updateOne({"name": projectName},{$inc:{"numberInTeam": 1}}, (err, result) => {
                if (err) {
                    log(err);
                }else{
                    console.log(result.result);
                }
            });
        }).catch(error => {
            log(error);
        });
    });

    router.delete("/:project/removeTeamMember/:memberID", (req, res) => {
        let projectName = formatToDBName(req.params.project);
        let memberID = req.params.memberID;
    
        mongoConn.then(client => {
            const collection = client.db(`${projectName}`).collection(`Team-Members`);

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