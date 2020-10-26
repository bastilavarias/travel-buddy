import express from "express";
import genericRouter from "./components/generic/router";
import authenticationRouter from "./components/authentication/router";
import accountRouter from "./components/account/router";
const api = express();

api.use("/generic", genericRouter);
api.use("/authentication", authenticationRouter);
api.use("/account", accountRouter);

export default api;
