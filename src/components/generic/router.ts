import express from "express";
import genericController from "./controller";
const genericRouter = express.Router();

genericRouter.get("/nationalities", genericController.fetchNationalities);

export default genericRouter;
