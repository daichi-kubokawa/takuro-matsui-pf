import { microcmsClient } from "../microcms";
import type { About } from "../../types/work";

export async function getAbout(): Promise<About> {
  const data = await microcmsClient.getObject<About>({
    endpoint: "about",
  });

  return data;
}
