import { microcmsClient } from "../microcms";
import type { Settings } from "../../types/work";

export async function getSettings(): Promise<Settings> {
  return await microcmsClient.getObject<Settings>({ endpoint: "settings" });
}
