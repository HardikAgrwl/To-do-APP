import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import passportConfig from "./config/passportConfig.js";
import UserRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

passportConfig();

app.use("/api/users", UserRoutes);
app.use(express.static(path.join(__dirname, "./client/build")));

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running on port ${PORT}`));
