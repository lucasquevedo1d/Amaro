import { config } from "dotenv";
import express from "express";
import {AddressInfo} from "net";
import { userRouter } from "../router/UserRouter";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
config()
const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});