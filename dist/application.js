"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./database"));
const application = express_1.default();
application.use(cors_1.default());
application.use(body_parser_1.default.urlencoded({ extended: true }));
application.use(body_parser_1.default.json());
database_1.default.init().catch((e) => console.log(e));
if (process.env.NODE_ENV === "production") {
    application.use(express_1.default.static(__dirname + "/public/"));
    application.get(/.*/, (_, response) => response.sendFile(__dirname + "/public/index.html"));
}
exports.default = application;
//# sourceMappingURL=application.js.map