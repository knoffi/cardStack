import { trpc } from "../../shared/trpc";

export class DrawAPI {
  public draw() {
    return trpc.getUser.useQuery("bob").data;
  }

  static default(): DrawAPI {
    return new DrawAPI();
  }
}

export const defaultDrawAPI = DrawAPI.default();
