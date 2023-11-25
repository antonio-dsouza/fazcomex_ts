import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';

const tmpFolder = resolve(__dirname, "..", "..", "tmp")

export default {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: function (request, file, callback) {
      const fileUuid = uuidv4();
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${fileUuid}.${fileExtension}`;

      return callback(null, fileName)
    }
  })
}