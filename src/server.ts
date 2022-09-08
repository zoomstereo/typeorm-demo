import app from "./app";
import { AppDataSource } from "./data-source";

/**
 * Start Express server.
 */

AppDataSource.initialize()
  .then(async () => {
    console.log("  Connected to DB, launching the server . . .");
    app.listen(3000, () => {
      console.log("  App is running at http://localhost:3000");
      console.log("  Press CTRL-C to stop\n");
    });
  })
  .catch((error) => console.log(error));
