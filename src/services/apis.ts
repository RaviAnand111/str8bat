import { baseUrl } from "../utils/baseUrl";

export async function verifyEmail(token: string) {
  const verify = await fetch(`${baseUrl}/verify/${token}`);
  const verifyData = await verify.json();
  return verifyData;
}
