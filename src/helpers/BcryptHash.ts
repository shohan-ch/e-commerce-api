import bcrypt from "bcrypt";
class BcryptHelper {
  makeHash(password: string) {
    const salt = 10;
    return bcrypt.hashSync(password, salt);
  }

  // Return promise
  decodeHash(password: number | string, hashPassword: string) {
    return bcrypt.compare(String(password), hashPassword);
  }
}

export default new BcryptHelper();
