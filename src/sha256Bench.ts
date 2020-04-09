import * as crypto from "crypto";
import { SHA256 } from "crypto-js";
import * as hash from "object-hash";
import { IEvents } from "./IEvents";
import { obj } from "./object";
import { stringifyObj } from "./simpleStringify";

console.log(
  "Testing crypto-js with native node-crypto.\n",
  "Generate random string of 1 million char and hash same string 1000 times with both approaches\n",
  "Time are in ms"
);

{
  const randomGenTime = new Date().getTime();
  const randomString = crypto.randomBytes(1000000).toString("hex"); // Random string of 1million char
  console.log(
    "Generated random string. Time= ",
    new Date().getTime() - randomGenTime
  );

  let hashedStringFromLib = "";

  const startTimeLib = new Date().getTime();
  for (let i = 0; i < 1000; i++) {
    hashedStringFromLib = SHA256(randomString).toString();
  }
  const totalCompletionTime = new Date().getTime() - startTimeLib;
  console.log(
    "Lib time completion: ",
    totalCompletionTime,
    " Hash: ",
    hashedStringFromLib
  );

  let hashedStringFromNative = "";
  const startTimeNative = new Date().getTime();
  for (let i = 0; i < 1000; i++) {
    hashedStringFromNative = crypto
      .createHash("SHA256")
      .update(randomString)
      .digest("hex");
  }
  const totalCompletionNative = new Date().getTime() - startTimeNative;
  console.log(
    "Native time completion: ",
    totalCompletionNative,
    " Hash: ",
    hashedStringFromNative
  );
}

console.log("Repeating test with object using crypto-js library");
{
  let hashedStringFromLib = "";

  const startTimeLib = new Date().getTime();
  for (let i = 0; i < 1000; i++) {
    hashedStringFromLib = SHA256(JSON.stringify(obj)).toString();
  }
  const totalCompletionTime = new Date().getTime() - startTimeLib;
  console.log(
    "Lib time completion: ",
    totalCompletionTime,
    " Hash: ",
    hashedStringFromLib
  );
}

console.log("Repeating test with object using native node crypto");
{
  let hashedStringFromLib = "";

  const startTimeLib = new Date().getTime();
  for (let i = 0; i < 1000; i++) {
    hashedStringFromLib = crypto
      .createHash("SHA256")
      .update(JSON.stringify(obj))
      .digest("hex");
  }
  const totalCompletionTime = new Date().getTime() - startTimeLib;
  console.log(
    "Json stringify hash completion: ",
    totalCompletionTime,
    " Hash: ",
    hashedStringFromLib
  );
}

console.log("Repeating test with object with object hash library");
{
  let hashedStringFromNative = "";
  const startTimeNative = new Date().getTime();
  for (let i = 0; i < 1000; i++) {
    hashedStringFromNative = hash(obj, {
      algorithm: "SHA256"
    });
  }
  const totalCompletionNative = new Date().getTime() - startTimeNative;
  console.log(
    "Object hash lib completion: ",
    totalCompletionNative,
    " Hash: ",
    hashedStringFromNative
  );
}

console.log(
  "Repeating test with object with string encapsulation (custom toString) over strict typing"
);
{
  let hashedStringFromNative = "";
  const startTimeNative = new Date().getTime();
  const typedObj = obj as IEvents;
  for (let i = 0; i < 1000; i++) {
    hashedStringFromNative = crypto
      .createHash("SHA256")
      .update(`${stringifyObj(typedObj)}`)
      .digest("hex");
  }
  const totalCompletionNative = new Date().getTime() - startTimeNative;
  console.log(
    "Native time completion: ",
    totalCompletionNative,
    " Hash: ",
    hashedStringFromNative
  );
}
