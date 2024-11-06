
import app from "./app.js";
import { connectDB } from "./db.js";
import { PORT } from "./config.js";


async function main() {

  try {
    await connectDB();
    app.listen(PORT);
    console.log(`Server is running on port http://localhost:${PORT}`);

  } catch (error) {
    console.log(error);
  }
}
main();