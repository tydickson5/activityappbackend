const jwt = require("jsonwebtoken");
const fs = require("fs");

const teamId = "NUC37C5ZL9";
const clientId = "com.caravyn.auth"; // Services ID
const keyId = "8A7UDVAA5L";

const privateKey = fs.readFileSync(
  "AuthKey_8A7UDVAA5L.p8"
);

const token = jwt.sign({}, privateKey, {
  algorithm: "ES256",
  expiresIn: "180d",
  issuer: teamId,
  audience: "https://appleid.apple.com",
  subject: clientId,
  keyid: keyId,
});

console.log(token);