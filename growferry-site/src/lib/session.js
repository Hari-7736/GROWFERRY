import crypto from "crypto";

export const SESSION_COOKIE = "gf_admin_session";
const SESSION_HOURS = 12;

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return secret;
}

// Small signed token: "<expiryEpochMs>.<hmac>" — no external session store
// needed, and it can't be forged without SESSION_SECRET.
export function createSessionToken() {
  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const hmac = crypto.createHmac("sha256", getSecret()).update(String(expires)).digest("hex");
  return `${expires}.${hmac}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return false;
  const [expiresStr, hmac] = token.split(".");
  const expires = Number(expiresStr);
  if (!expires || Number.isNaN(expires)) return false;
  if (Date.now() > expires) return false;
  const expected = crypto.createHmac("sha256", getSecret()).update(String(expires)).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected));
  } catch {
    return false;
  }
}
