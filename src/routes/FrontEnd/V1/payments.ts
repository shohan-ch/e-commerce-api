import { Router } from "express";
import PaymentController from "../../../app/Controllers/V1/FrontEnd/PaymentController";
import path from "path";
import { readFileSync } from "fs";
const router = Router();

router.get("/test", (req, res) => {
  let htmlPath = path.resolve("src/templates/invoice.html");

  let file = readFileSync(htmlPath, "utf-8");
  file = file.replace("{{name}}", "shohan");
  file = file.replace("{{email}}", "ss@gmail");
  res.send(file);

  console.log(htmlPath);
  //   return res.sendFile(htmlPath);
});
router.post("/", PaymentController.store);
router.post("/bkash-callback", PaymentController.bkashCallback);
router.get("/stripe-callback", PaymentController.stripeCallback);

export const payments = router;
