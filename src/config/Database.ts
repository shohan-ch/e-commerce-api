import mongoose from "mongoose";
import "dotenv/config";

class Database {
  private host: string;
  private port: string;
  private database: string;

  constructor() {
    this.host = process.env.DB_HOST;
    this.port = process.env.DB_PORT;
    this.database = process.env.DB_DATABASE;
  }

  async connect() {
    try {
      await mongoose.connect(`${this.host}${this.port}/${this.database}`);
      console.log("Database connetced");
    } catch (error) {
      console.log("Database not connected", error);
    }
  }
}

export default new Database();
