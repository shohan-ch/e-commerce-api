import { error } from "console";
import { Request, Response } from "express";
import BcryptHash from "../../../../helpers/BcryptHash";
import ValidationHelper from "../../../../helpers/Validation";
import JwtAuth from "../../../../lib/JwtAuth";
import Nodemailer from "../../../../lib/Nodemailer";
import JwtToken from "../../../../models/JwtToken";
import ResetPassword from "../../../../models/ResetPassword";
import Customer from "../../../../models/Customer";
import EmailVerifyTemplate from "../../../../templates/EmailVerifyTemplate";
import ForgetPasswordTemplate from "../../../../templates/ForgetPasswordTemplate";
import JsonReponse from "../../../../lib/JsonReponse";
import SendSms from "../../../../app/Services/Sms/core/SendSms";

interface AuthProps {
  name: string;
  email: string;
  password: string;
  verify_code: number;
  refreshToken: string;
}

class AuthRepository {
  constructor() {}

  async resetPassWord(reqData: Request, res: Response) {
    const { token } = reqData.query;
    const { password, confirmPassword } = reqData.body;

    await ValidationHelper.validate(reqData.body, {
      password: "required|max:10|min:5",
      confirmPassword: "required|max:10|min:5|matchPassword",
    });
    const isTokenExist = await ResetPassword.findOne({ token });
    if (!isTokenExist) {
      throw Error("Token is not found");
    } else {
      const resetPassword = await Customer.findOneAndUpdate(
        { email: isTokenExist.email },
        { password: BcryptHash.makeHash(password) }
      );
      const deleteResetToken = await ResetPassword.findOneAndDelete({
        token,
      });
      if (resetPassword && deleteResetToken) {
        return "Password reset succesfully.";
      }
    }
  }

  async verifyToken(reqData: any, res: Response) {
    const { token, email } = reqData;
    const isExistToken = await ResetPassword.findOne({ token });
    if (!isExistToken) {
      throw Error("Token is not found or match.");
    }
    const isValidToken = await BcryptHash.decodeHash(email, isExistToken.token);
    if (!isValidToken) {
      throw Error("Token is  not valid");
    } else {
      return "You can reset password";
    }
  }

  async forgetPassWord(reqData: AuthProps, res: Response) {
    await ValidationHelper.validate(reqData, {
      email: "required|email",
    });
    const { email } = reqData;
    const user = await Customer.findOne({ email });
    if (!user) {
      throw Error("Email not found!");
    }
    const resetToken = BcryptHash.makeHash(user.email);
    // const resetToken = BcryptHash.makeHash(user.email).replace(/[/]/gi, "$");
    await ResetPassword.findOneAndUpdate(
      {
        email: email,
      },
      {
        token: resetToken,
      },
      { upsert: true }
    );

    const link = `${process.env.FRONTEND_URl}/reset-password?token=${resetToken}&email=${email}`;
    const templateOfForgetPassword = ForgetPasswordTemplate(user.name, link);
    const sentMail = Nodemailer.sendMail(
      email,
      "Reset password",
      templateOfForgetPassword
    );
    if (sentMail) {
      return "Reset password link sent on email. Please check your email.";
    }
  }
  async refreshToken(reqData: AuthProps, res: Response) {
    await ValidationHelper.validate(reqData, {
      refreshToken: "required|string",
    });

    const decodeToken: any = await JwtAuth.decodeToken(
      reqData.refreshToken,
      "refreshToken"
    );

    const token = await JwtToken.findOne({ email: decodeToken.email });

    const isTokenMatch = await BcryptHash.decodeHash(
      reqData.refreshToken,
      token.refreshToken
    );

    if (!token || !isTokenMatch) {
      throw Error("Token not match");
    }

    let accessToken = await JwtAuth.getAccessToken({
      _id: decodeToken._id,
      email: decodeToken.email,
    });

    let refreshToken = await JwtAuth.getRefreshToken({
      _id: decodeToken._id,
      email: decodeToken.email,
      time: new Date(),
    });

    token.refreshToken = BcryptHash.makeHash(refreshToken);
    token.save();

    res.cookie("userId", decodeToken._id, {
      maxAge: 60 * 60 * 24,
      secure: false,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyOtp(req: Request, res: Response) {
    const { otp, mobile } = req.body;

    await ValidationHelper.validate(req.body, {
      mobile: "required|string",
      otp: "required|number",
    });

    const user = await Customer.findOne().where("mobile").equals(mobile);
    if (!user) throw Error("Mobile number not found");
    if (user.verifyCode !== otp) throw Error("Otp not match");

    let accessToken = await JwtAuth.getAccessToken({
      _id: user._id,
      mobile: user.mobile,
    });

    let refreshToken = await JwtAuth.getRefreshToken({
      _id: user._id,
      mobile: user.mobile,
      time: new Date(),
    });

    await JwtToken.findOneAndUpdate(
      {
        mobile: mobile,
      },
      { refreshToken: BcryptHash.makeHash(refreshToken) },
      { upsert: true }
    );

    let cookie = res.cookie("userId", user._id, {
      maxAge: 60 * 60 * 24,
      secure: false,
    });

    return { accessToken, refreshToken };
  }
  async loginByMobile(req: Request, res: Response) {
    const { mobile } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);
    const message = `Your one time PIN is ${otp}. It will expire in 3 minutes.`;

    let newOrUpdateCustomer = await Customer.findOneAndUpdate(
      { mobile: mobile },
      {
        mobile,
        verifyCode: otp,
      },
      { new: true, upsert: true }
    );

    if (newOrUpdateCustomer) {
      let sendSms: any = new SendSms();
      sendSms.setProvider("AlphaSms");
      const response = await sendSms.send(mobile, message);
      if (response) {
        return "We have sent otp in your Phone" + mobile;
      }
    }
  }

  login = async (reqData: AuthProps, res: Response) => {
    await ValidationHelper.validate(reqData, {
      email: "required|email",
      password: "required|max:10|min:5",
    });

    let user = await Customer.findOne({
      email: reqData.email,
    });

    if (!user) {
      throw Error("Email not found. please registar first");
    }
    const decodePassword = await BcryptHash.decodeHash(
      reqData.password,
      user.password
    );

    switch (true) {
      case !decodePassword:
        throw Error("Password doesn't match");
      case !user.isVerified:
        throw Error("Email is not verified. Please verify first.");
      default:
        let accessToken = await JwtAuth.getAccessToken({
          _id: user._id,
          email: user.email,
        });

        let refreshToken = await JwtAuth.getRefreshToken({
          _id: user._id,
          email: user.email,
          time: new Date(),
        });

        await JwtToken.findOneAndUpdate(
          {
            email: reqData.email,
          },
          { refreshToken: BcryptHash.makeHash(refreshToken) },
          { upsert: true }
        );

        let cookie = res.cookie("userId", user._id, {
          maxAge: 60 * 60 * 24,
          secure: false,
        });

        return { accessToken, refreshToken };
    }
  };

  async verifyEmail(reqData: AuthProps, res: Response) {
    await ValidationHelper.validate(reqData, {
      verify_code: "required|number|max:6",
      email: "required|email",
    });
    const user: any = await Customer.findOne({
      email: reqData.email,
    });

    if (!user) {
      throw Error("Customer not found!");
    } else if (user.isVerified) {
      throw Error("Email already verified!");
    } else if (reqData.verify_code != user.verifyCode) {
      throw Error("Verify code does not match!");
    } else {
      user.isVerified = true;
      user.verifyCode = null;
      user.save();
      return "Verified email successfully";
    }
  }

  async registarOld(reqData: AuthProps, res: Response) {
    try {
      await ValidationHelper.validate(reqData, {
        name: "required|string",
        email: "required|email",
        password: "required|max:10|min:5",
        confirm_password: "required|max:10|min:5|matchPassword",
      });

      const existCustomer = await Customer.where("email")
        .equals(reqData.email)
        .findOne();
      // const existCustomer = await Customer.findOne({ email: reqData.email });
      if (existCustomer) {
        throw Error("Email is already exist!");
      }
      const hashPassword = BcryptHash.makeHash(reqData.password);
      const newCustomer = {
        name: reqData.name,
        email: reqData.email,
        password: hashPassword,
      };
      const insertCustomer = await Customer.create(newCustomer);
      if (insertCustomer)
        return "Verify email sent to your mail address. please verify.";
    } catch (error) {
      JsonReponse.error(error.message);
      console.log(error);
    }
  }
  async registar(reqData: AuthProps, res: Response) {
    await ValidationHelper.validate(reqData, {
      name: "required|string",
      email: "required|email",
      password: "required|min:5",
      confirm_password: "required|min:5|matchPassword",
    });

    const existCustomer = await Customer.where("email")
      .equals(reqData.email)
      .findOne();
    // const existCustomer = await Customer.findOne({ email: reqData.email });
    if (existCustomer) {
      throw Error("Email is already exist!");
    }
    const hashPassword = BcryptHash.makeHash(reqData.password);
    const verifyCode = Math.floor(100000 + Math.random() * 900000); // Declare dynamic path and catch fileMiddleware

    const newCustomer = {
      name: reqData.name,
      email: reqData.email,
      password: hashPassword,
      verifyCode,
    };
    const insertCustomer = await Customer.create(newCustomer);
    if (insertCustomer)
      return "Verify email sent to your mail address. please verify.";
  }

  async logout(req: Request, res: Response) {
    const clearCookie = res.clearCookie("userId");
    if (clearCookie) {
      return "logout successfully";
    }
  }
}

export default AuthRepository;
