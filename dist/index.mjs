var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/index.ts
import { execSync } from "child_process";
var getGitVersion = () => {
  let gitInfo = {};
  try {
    try {
      gitInfo.tag = execSync("git describe --tags --exact-match", { stdio: "pipe" }).toString().trim();
    } catch (e) {
      gitInfo.tag = "";
    }
    gitInfo.commitHash = execSync("git rev-parse HEAD", { stdio: "pipe" }).toString().trim();
    gitInfo.branch = execSync("git rev-parse --abbrev-ref HEAD", { stdio: "pipe" }).toString().trim();
    return gitInfo;
  } catch (error) {
    console.error("Unable to retrieve Git information:", error);
    return gitInfo;
  }
};
function plugin() {
  return {
    name: "version-plugin",
    config: (config) => {
      const { commitHash, tag, branch } = getGitVersion();
      return {
        define: __spreadProps(__spreadValues({}, config.define), {
          "import.meta.env.GIT_COMMIT": JSON.stringify(commitHash),
          "import.meta.env.GIT_TAG": JSON.stringify(tag),
          "import.meta.env.GIT_BRANCH": JSON.stringify(branch)
        })
      };
    }
  };
}
export {
  plugin as default
};
