import { swaggerDoc } from "./../swagger";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import "express-async-errors";
import Database from "./config/Database";
import ErrorHandleMiddleware from "./middlewares/ErrorHandleMiddleware";
import JsonResponseMiddleware from "./middlewares/JsonResponseMiddleware";
import router from "./routes";

class Server {
  public app: Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = 3000;
    this.dbConnect();
    this.middlewares();
    this.routes();
    this.app.use(ErrorHandleMiddleware);
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log("server listen at:" + this.port);
    });
  }

  dbConnect() {
    Database.connect();
  }

  middlewares() {
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    this.app.use(cors({ credentials: true, origin: true })); // credential true means accept header data form client req ex: cookie
    this.app.use(express.static(__dirname + "/public"));
    this.app.use(express.json());
    // this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(JsonResponseMiddleware); // Add json response middleware to get res object in the JsonReponse class
  }

  routes() {
    this.app.use("/api/v1", router);
  }
}

const server = new Server();

server.startServer();
