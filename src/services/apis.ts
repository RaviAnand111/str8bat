import { baseUrl } from "../utils/baseUrl";
import { User } from "../utils/types";

export async function verifyEmail(token: string) {
  const verify = await fetch(`${baseUrl}/verify/${token}`);
  const verifyData = await verify.json();
  return verifyData;
}

export async function updateUserData(userData: User, userAccessToken: string) {
  const updateCall = await fetch(`${baseUrl}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userAccessToken}`,
    },
    body: JSON.stringify(userData),
  });
  const updateCallJson = await updateCall.json();
  return updateCallJson;
}
