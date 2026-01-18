import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain) throw new Error("MICROCMS_SERVICE_DOMAIN is missing");
if (!apiKey) throw new Error("MICROCMS_API_KEY is missing");

export const microcmsClient = createClient({
  serviceDomain,
  apiKey,
});
