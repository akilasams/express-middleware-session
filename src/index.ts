import express, { Request, Response, NextFunction, Application } from "express";

import authMiddleware from "./middleware/auth";
import errorHandler from "./middleware/errorHandler";

require("dotenv").config();

const session = require("express-session");
const MongoStore = require("connect-mongo");

const app: Application = express();

// DB Connection
const dbString = process.env.DB_URL;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authMiddleware);

const sessionStore = MongoStore.create({
  mongoUrl: dbString,
  mongoOptions: dbOptions,
});

// Using session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }
  res.send(
    `Hello Typescript with Node.js! => View Count : ${req.session.viewCount}`
  );
});

app.use(errorHandler);

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
