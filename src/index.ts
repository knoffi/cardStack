// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((opts) => {
    console.log(JSON.stringify(opts));
    opts.input;
    return { id: opts.input, name: "Bilbo" };
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (opts) => {
      // use your ORM of choice
      console.log("CREATED!!!!!");
      //   return await UserModel.create({
      //     data: opts.input,
      //   });
    }),
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
