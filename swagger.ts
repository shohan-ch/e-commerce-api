import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions: any = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      description: "E-commerce API Information",
      contact: {
        name: "Saifur Shohan",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/app/Controllers/V1/**/*.ts"],
};

export const swaggerDoc = swaggerJSDoc(swaggerOptions);
