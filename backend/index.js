import express from "express";
import config from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/booksRoute.js"; // Assurez-vous du chemin correct et ajoutez .js
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin:'http://127.0.0.1:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
//   })
// );
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Route for Save a new Book
app.use('/books', bookRoutes);

mongoose
  .connect(config.mongodburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("App connected to database");
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
