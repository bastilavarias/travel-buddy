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

  async createInquiry(request: Request, response: Response) {
    try {
      const postID = parseInt(request.body.postID);
      const accountID = parseInt(request.body.accountID);
      const message = request.body.message;
      const result = await itineraryService.createInquiry(
        postID,
        accountID,
        message
      );
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async getInquiries(request: Request, response: Response) {
    try {
      const postID = parseInt(<string>request.query.postID);
      const skip = parseInt(<string>request.query.skip);
      const result = await itineraryService.getInquiries(postID, skip);
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

  async getSoftDetails(request: Request, response: Response) {
    try {
      const postID = parseInt(request.params.postID);
      const gotDetails = await itineraryService.getSoftDetails(postID);
      response.status(200).json(gotDetails || {});
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async delete(request: Request, response: Response) {
    try {
      const postID = parseInt(request.params.postID);
      const result = await itineraryService.delete(postID);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async disable(request: Request, response: Response) {
    try {
      const postID = parseInt(request.params.postID);
      const result = await itineraryService.disable(postID);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async enable(request: Request, response: Response) {
    try {
      const postID = parseInt(request.params.postID);
      const result = await itineraryService.enable(postID);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  },
};

export default itineraryController;
