import cloudinary from "cloudinary";
import { ICloudinaryFileMeta } from "./typeDefs";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryService = {
  async upload(
    file: Express.Multer.File,
    folder: string
  ): Promise<ICloudinaryFileMeta> {
    let meta: ICloudinaryFileMeta;
    try {
      const folderPath = `${process.env.CLOUDINARY_ROOT_FOLDER_NAME}/${folder}`;
      const uploadOptions = {
        folder: folderPath,
        use_filename: true,
        resource_type: "auto",
      };
      // @ts-ignore
      const result = await cloudinary.v2.uploader.upload(
        file.path,
        uploadOptions
      );
      meta = {
        url: result.secure_url,
        publicID: result.public_id,
        fileName: result.original_filename,
      };
    } catch (error) {
      console.log(error);
      meta = {
        url: "",
        publicID: "",
        fileName: "",
      };
    }
    return meta;
  },

  delete: async (publicID: string) => {
    try {
      // @ts-ignore
      await cloudinary.v2.uploader.destroy(publicID);
    } catch (error) {
      console.log(error);
    }
  },
};

export default cloudinaryService;
