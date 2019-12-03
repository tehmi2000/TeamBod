const model = function(){

    const fs = require("fs");
    const mysql = require("mysql");
    const mongodb = require("mongodb").MongoClient;
    const ObjectID = require("mongodb").ObjectId;
    const mailer = require("nodemailer");

    const ePass = {user: "fbnquestreminderapp@gmail.com"};

    Object.defineProperty(ePass, "pass", {
        value: "aaf4a41d0f7c4d3ebbfe3b82d875ec",
        writable: true,
        configurable: true,
        enumerable: true
    });

    const transporter = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: ePass['user'],
            pass: ePass['pass']
        }
    });

    const queryCreate = "CREATE TABLE users (id INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY, uID VARCHAR(100) NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, telcode VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, profile_picture VARCHAR(255) NOT NULL) ENGINE=InnoDB  DEFAULT CHARSET=utf8";
    const queryTest = "SELECT * FROM users LIMIT 1";

    // LOCALHOST CONNECTION
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: "teambod_db"
    });
    const MONGO_URL = "mongodb://localhost:27017";

    // JAWDB MYSQL CONNECTION
    // const conn = mysql.createConnection({
    //     host: 'hcm4e9frmbwfez47.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    //     port: 3306,
    //     user: 'fvj931em96v2pfta',
    //     password: 'kkmvtfygeoulhl9w',
    //     database: "fp2cgoso5lo53dvm"
    // });

    // MLAB MONGODB CONNECTION
    // const MONGO_URL = "mongodb://heroku_th622w1p:rjte4sgbbqbjre0d8r98vd58e0@ds261077.mlab.com:61077/heroku_th622w1p";
    
    const mOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    const log = function(err) {
        let content = `${(new Date).toUTCString()}: ${JSON.stringify(err)}` + "\n";
        fs.appendFile("./error_log.txt", content, function(err) {
            if(err){
                console.log(err);
            }
        });
        // throw err;
        console.error(err);
    };

    return {
        log,
        ePass,
        transporter,
        ObjectID,
        connection: conn,
        mongoConn: mongodb.connect(MONGO_URL, mOptions),
        ObjectID,
        itemsDB: "globalDB",
        iCollection: "goods",
        
        create: queryCreate,
        test: queryTest
    };
};

module.exports = model();