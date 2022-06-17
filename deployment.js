const target = "staging";

let baseURL = "http://ftiexpo.wisdomcloud.net:3000/v1/api"; //STG

let version = "v0.0.9";
let port = 3004;
let hideStatus = false;
switch (target) {
  case "production":
    baseURL = "http://ftiexpo.wisdomcloud.net:3000/v1/api"; //PROD
    version = "PROD: " + version;
    hideStatus = true;
    break;
  case "staging":
    version = "STG: " + version;
    baseURL = "http://ftiexpo.wisdomcloud.net:3000/v1/api"; //STG
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
