import express from "express";
import genericController from "./controller";
const genericRouter = express.Router();

genericRouter.get("/nationalities", genericController.fetchNationalities);
genericRouter.get("/sexes", genericController.fetchSexes);
genericRouter.get("/destinations", genericController.fetchDestinations);
genericRouter.get("/transportation", genericController.fetchTransportation);

export default genericRouter;
