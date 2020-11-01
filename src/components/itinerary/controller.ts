import { Request, Response } from "express";
import { IItineraryPostServiceCreateInput } from "./typeDefs";
import itineraryService from "./service";

const itineraryController = {
  async createNew(request: Request, response: Response) {
    try {
      const postID = parseInt(request.params.postID);
      const input: IItineraryPostServiceCreateInput = {
        name: request.body.name || "",
        description: request.body.description || "",
        pax: request.body.pax || 0,
        price: request.body.price || 0,
        days: request.body.days || [],
      };
      const result = await itineraryService.createNew(postID, input);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async uploadImages(request: Request, response: Response) {
    try {
      const images = request.files || [];
      // @ts-ignore
      const result = await itineraryService.uploadImages(images);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async fetch(_: Request, response: Response) {
    try {
      const itineraries = await itineraryService.fetch();
      response.status(200).json(itineraries);
    } catch (error) {
      response.status(400).json(error);
    }
  },
};

export default itineraryController;
