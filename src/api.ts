import express from "express";
import genericRouter from "./components/generic/router";
const api = express();

api.use("/generic", genericRouter);

export default api;
