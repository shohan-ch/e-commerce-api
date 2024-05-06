import { Request } from "express";
import { existsSync, mkdirSync } from "fs";
import multer from "multer";

const diskStorage = multer.diskStorage({
  destination: function (req: Request | any, file, cb) {
    const { sku } = req.body;
    if (!sku) {
      cb(new Error("Product sku is required."), "");
    } else {
      let fileUploadPath = `src/public/uploads/products/${sku}/${file.fieldname}`;
      if (!existsSync(fileUploadPath)) {
        mkdirSync(fileUploadPath, { recursive: true });
      }
      cb(null, fileUploadPath);
    }
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split(".")[1].toLocaleLowerCase();
    const fileName = Date.now() + "_" + file.fieldname + "." + ext;
    cb(null, fileName);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("not valid image type"), false);
  }
};

const ProductFileUploadMiddleware = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 2048 * 1000 }, // 1000 is byte other value is kb
});

export default ProductFileUploadMiddleware;
