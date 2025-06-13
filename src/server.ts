import app from ".";
import dotenv from "dotenv";
import { PORT } from "./constants";
dotenv.config(); // Load environment variables from .env file

app.listen(PORT, () => {
  console.log(`Bot running on http://localhost:${PORT}`);
});
