// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import {
  RouterRecord,
  mergeRouters,
} from "@trpc/server/dist/unstable-core-do-not-import";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

const forRouter: RouterRecord = {
  getUser: t.procedure.input(z.string()).query((opts) => {
    console.log(JSON.stringify(opts));
    return { id: opts.input, name: "Bilbo" };
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (opts) => {
      return {
        title: "Einkesseln",
        effect: "",
        condition: "",
        tags: ["Plan", "offensiv"],
      };
    }),
};

const forRouter2: RouterRecord = {
  getCard: t.procedure.query(() => 3),
};

const superRouter: RouterRecord = {
  all: mergeRouters(forRouter, forRouter2),
};

export const appRouter = t.router(forRouter);
export const appRouter2 = t.router(forRouter2);
export const appRouterCombined = t.mergeRouters(appRouter, appRouter2);

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

export type AppRouter = typeof appRouter;
