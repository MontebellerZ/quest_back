require("dotenv").config();

import express from "express";
import cors from "cors";
import errorMiddleware from "../middlewares/error";
import routes from "../routes";
import { testDBConnection } from "../helpers/testDBConnection";

const PORT = process.env.SERVER_PORT || 3001;
const REQUEST_SIZE_LIMIT = process.env.SERVER_REQUEST_SIZE_LIMIT;

const app = express();

app.use("public", express.static("public"));

app.use(express.urlencoded({ extended: true, limit: REQUEST_SIZE_LIMIT }));
app.use(express.json({ limit: REQUEST_SIZE_LIMIT }));

app.use(cors());

app.use(routes);

app.use(errorMiddleware);

app.listen(PORT, async () => {
    await testDBConnection();
    return console.log(`Server running on port ${PORT}`);
});
