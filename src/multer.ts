import Multer, { diskStorage } from "multer";
const fs = require("fs-extra");

const multer = Multer({
  storage: diskStorage({
    destination(_request, _file, callback) {
      const directory = process.cwd() + "/tmp/files";
      fs.ensureDirSync(directory);
      callback(null, directory);
    },
  }),
});

export default multer;
