import { Response } from "express";
import { existsSync, unlinkSync } from "fs";
import Validation from "../../../../helpers/Validation";
import ProductFileUploadMiddleware from "../../../../middlewares/ProductFileUploadMiddleware";
import Product from "../../../../models/Product";
class AdminProductRepository {
  constructor() {}

  async update(req: any, res: Response) {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) throw Error("Product not found");

    req.updateSkuPath = product.sku; // sku sent to uploadMiddleware if upload needed than upload same sku file

    return new Promise((resolve, reject) => {
      const uploadFile = ProductFileUploadMiddleware.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "images", maxCount: 5 },
      ]);

      uploadFile(req, res, async (err) => {
        let coverImg = req.files["coverImage"];
        let images = req.files["images"];

        if (err) {
          reject(err);
        } else {
          try {
            // Update in database
            const data = {
              ...req.body,
              category: {
                main: req.body.category,
                secondary: req.body.subCategory
                  ? req.body.subCategory
                  : undefined,
              },
            };

            let deletePath = `src/public/uploads/products/${product.sku}/`;
            let imagesObj: any = {};

            if (images) {
              product.images.images.map((img: any) =>
                unlinkSync(deletePath + "images/" + img)
              );

              imagesObj.images = images.map((img: any) => img.filename);
            }

            if (coverImg) {
              coverImg &&
                unlinkSync(
                  deletePath + "coverImage/" + product.images.coverImage
                );
              imagesObj.coverImage = coverImg[0].filename;
            }

            // console.log(imagesObj, "length");

            await Validation.validate(data, {
              name: "required|string",
              description: "required",
              // sku: "required",
              category: "required",
              price: "required",
              quantity: "required",
              adminId: "required",
            });

            // update database

            let updateData: any;

            if (Object.keys(imagesObj).length) {
              updateData = { ...data, images: imagesObj };
            } else {
              updateData = { ...data };
            }

            const updateProduct = await Product.findOneAndUpdate(
              {
                _id: productId,
              },
              updateData
            );

            if (updateProduct) {
              resolve("Product update successfully.");
            }
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }
  async store(req: any, res: Response) {
    return new Promise((resolve, reject) => {
      const uploadFile = ProductFileUploadMiddleware.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "images", maxCount: 5 },
      ]);

      uploadFile(req, res, async (err) => {
        let coverImg = req.files["coverImage"];
        let images = req.files["images"];

        if (err) {
          reject(err);
        } else {
          try {
            // store in database

            let isSkuExist = await Product.findOne({ sku: req.body.sku });
            if (isSkuExist)
              throw Error(
                "SKU or product listing is already exist for this product"
              );

            const data = {
              ...req.body,
              category: {
                main: req.body.category,
                secondary: req.body.subCategory
                  ? req.body.subCategory
                  : undefined,
              },
              images: {
                coverImage: coverImg && coverImg[0].filename,
                images: images
                  ? images.map((img: any) => img.filename)
                  : undefined,
              },
            };

            if (coverImg) data.coverImage = coverImg[0].filename;

            await Validation.validate(data, {
              name: "required|string",
              description: "required",
              sku: "required",
              category: "required",
              price: "required",
              quantity: "required",
              adminId: "required",
              coverImage: "required",
            });

            // Store in database

            let insertProduct = await Product.create(data);

            if (insertProduct) {
              resolve("Product added successfully.");
            }
          } catch (error) {
            if (images) {
              images.map((img: any) => {
                if (existsSync(img.path)) {
                  unlinkSync(img.path);
                }
              });
            }

            if (coverImg && existsSync(coverImg[0].path)) {
              unlinkSync(coverImg[0].path);
            }
            reject(error);
          }
        }
      });
    });
  }
}

export default new AdminProductRepository();
