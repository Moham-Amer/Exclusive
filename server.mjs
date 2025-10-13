// server.mjs - json-server with json-server-auth
import { createRequire } from "module";
import cors from "cors";
import "dotenv/config";

// Use require to load CommonJS packages from ESM context
const require = createRequire(import.meta.url);
const jsonServer = require("json-server");
const auth = require("json-server-auth");

const app = jsonServer.create();
const router = jsonServer.router("./src/db/index.json");
const middlewares = jsonServer.defaults();

// Allow your React dev origin(s)
const vitePort = Number(process.env.VITE_PORT) || 5173;
const allowedOrigins = [
  `http://localhost:${vitePort}`,
  "http://localhost:3000",
];
app.use(cors({ origin: allowedOrigins }));
app.use(middlewares);

// json-server-auth needs access to the db BEFORE using auth/router
app.db = router.db;
app.use(jsonServer.bodyParser);
app.use(auth);
app.use(router);

const PORT = Number(process.env.PORT || process.env.API_PORT) || 5000;
app.listen(PORT, () => {
  console.log(`JSON Auth API running on http://localhost:${PORT}`);
});
