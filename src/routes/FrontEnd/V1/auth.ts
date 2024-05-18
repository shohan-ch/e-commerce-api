import { Router, Request, Response } from "express";
import AuthController from "../../../app/Controllers/V1/FrontEnd/AuthController";
import AuthMiddleware from "../../../middlewares/AuthMiddleware";

const router = Router();

router.post("/login-with-mobile-otp", AuthController.loginByMobile);
router.post("/login", AuthController.login);
router.post("/registar", AuthController.registar);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/forget-password", AuthController.forgetPassWord);
router.post("/verify-reset-token", AuthController.verifyToken);
router.post("/reset-password", AuthController.resetPassWord);
router.post("/logout", AuthController.logout);

router.use(AuthMiddleware);

router.get("/auth-user", (req: Request | any, res: Response) => {
  console.log(req.authUser);
  res.json("auth user");
});

export const auth = router;
