import { RouterRecord } from "@trpc/server/dist/unstable-core-do-not-import";
import { z } from "zod";


class UserController{
  constructor(t:)
}
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
