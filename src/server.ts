import app from "./app";
import { config } from "./config";

const port = Number(config.PORT || 4000);

app.listen(port, () => {
  console.log(`GMAA backend API listening on http://localhost:${port}`);
});


