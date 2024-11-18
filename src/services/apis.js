import { baseUrl } from "../utils/baseUrl";
export async function verifyEmail(token) {
    const verify = await fetch(`${baseUrl}/verify/${token}`);
    const verifyData = await verify.json();
    return verifyData;
}
