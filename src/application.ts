import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import database from "./database";
import api from "./api";
import passport from "passport";
import jwtPassport from "./passport";

const application = express();
application.use(cors());
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
database.init().catch((e) => console.log(e));
application.use("/api", api);
application.use(passport.initialize());
jwtPassport(passport);

if (process.env.NODE_ENV === "production") {
  application.use(express.static(__dirname + "/public/"));
  application.get(/.*/, (_, response) =>
    response.sendFile(__dirname + "/public/index.html")
  );
}

export default application;
