require("dotenv").config({});
require("express-async-errors");

const fs = require("fs");
const { Sequelize } = require("sequelize");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const controllers = require("./controllers");
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/error-handler");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mssql", 
    port: process.env.DB_PORT,
    logging: false,
    dialectOptions: {
      options: {
        encrypt: true, // For secure connections (recommended for production)
        trustServerCertificate: true // Change to false in production
      }
    }
  }
);

const app = express();

// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.CLIENT_SIDE_URL,
//     methods: "GET, POST, PUT, DELETE, PATCH",
//   })
// );

app.use(bodyParser.json({limit:'4mb'}));
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true, limit: '4mb' }));

// Root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Set up controllers
controllers(app, db);

// Error handling middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

// Connect to database and start server
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    db.sync({sync: true, force:false}) // Set force to true if you want to drop and recreate tables
    //do not use alter or force in production, it can lead to data loss
      .then(() => {
        console.log("All models were synchronized successfully.");
      })
      .catch((err) => {
        console.error("Unable to synchronize the models:", err);
      });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });