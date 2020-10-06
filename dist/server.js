"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = __importDefault(require("./application"));
const PORT = process.env.PORT || 3000;
application_1.default.listen(PORT, () => console.log(`Server is running at PORT:${PORT}`));
//# sourceMappingURL=server.js.map