import jwt from "jsonwebtoken";
class JwtAuth {
  private accssTokenSecret: string;
  private refreshTokenSecret: string;

  constructor() {
    this.accssTokenSecret = process.env.jWT_ACCESS_SECRET;
    this.refreshTokenSecret = process.env.jWT_REFRESH_SECRET;
  }

  decodeToken = async (token: string, type: "accessToken" | "refreshToken") => {
    const tokenType =
      type === "accessToken" ? this.accssTokenSecret : this.refreshTokenSecret;

    return jwt.verify(token, tokenType);
  };

  getAccessToken = async (data: object) => {
    return this.generateToken(data, this.accssTokenSecret);
  };

  getRefreshToken = async (data: object) => {
    return this.generateToken(data, this.refreshTokenSecret);
  };

  async generateToken(data: object, secret: string) {
    return jwt.sign(data, secret, { expiresIn: "10h" });
  }
}

export default new JwtAuth();
