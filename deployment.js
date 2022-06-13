const target = "production";

let baseURL = "https://boonrawd-stg.wisdomcloud.net/backend/v1/cms/api"; //STG

let version = "v0.0.9";
let port = 3004;
let hideStatus = false;
switch (target) {
  case "production":
    baseURL = "https://boonrawd.wisdomcloud.net/v1/cms/api"; //PROD
    version = "PROD: " + version;
    hideStatus = true;
    break;
  case "staging":
    version = "STG: " + version;
    baseURL = "https://boonrawd-stg.wisdomcloud.net/backend/v1/cms/api"; //STG
    port = 3004;
    break;

  default:
    break;
}

export default {
  baseURL: baseURL,
  version: `(${version})`,
  port: port,
  hideStatus
};
