import { microcmsClient } from "../microcms";
import type { Settings } from "../../types/settings";

export async function getSettings(): Promise<Settings> {
  return await microcmsClient.getObject<Settings>({ endpoint: "settings" });
}
