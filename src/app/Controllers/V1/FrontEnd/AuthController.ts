import { Response, Request } from "express";
import AuthRepository from "../../../Repositories/V1/ForntEnd/AuthRepository";
import JsonReponse from "../../../../lib/JsonReponse";
import { error } from "console";

class AuthController {
  public authRepository;

  constructor() {
    this.authRepository = new AuthRepository();
    // this.login = this.login.bind(this);
  }

  resetPassWord = async (req: Request, res: Response) => {
    const data = await this.authRepository.resetPassWord(req, res);
    return JsonReponse.success(data);
  };
  verifyToken = async (req: Request, res: Response) => {
    const data = await this.authRepository.verifyToken(req.query, res);
    return JsonReponse.success(data);
  };
  forgetPassWord = async (req: Request, res: Response) => {
    const data = await this.authRepository.forgetPassWord(req.body, res);
    return JsonReponse.success(data);
  };
  refreshToken = async (req: Request, res: Response) => {
    const data = await this.authRepository.refreshToken(req.body, res);
    return res.status(200).json(data);
  };

  loginByMobile = async (req: Request, res: Response) => {
    const data = await this.authRepository.loginByMobile(req, res);
    return JsonReponse.success(data);
  };
  login = async (req: Request, res: Response) => {
    const data = await this.authRepository.login(req.body, res);
    return JsonReponse.success(data);
  };

  registar = async (req: Request, res: Response) => {
    const data = await this.authRepository.registar(req.body, res);
    return JsonReponse.success(data);
  };
  logout = async (req: Request, res: Response) => {
    const data = await this.authRepository.logout(req, res);
    return JsonReponse.success(data);
  };

  verifyEmail = async (req: Request, res: Response) => {
    req.body.email = req.query.email;
    console.log(req.query.email);
    const data = await this.authRepository.verifyEmail(req.body, res);
    return JsonReponse.success(data);
  };

  getMessage() {
    return "Hello message";
  }
}

export default new AuthController();
