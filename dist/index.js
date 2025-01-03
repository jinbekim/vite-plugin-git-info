"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => plugin
});
module.exports = __toCommonJS(index_exports);
var import_child_process = require("child_process");
var getGitVersion = () => {
  let gitInfo = {};
  try {
    try {
      gitInfo.tag = (0, import_child_process.execSync)("git describe --tags --exact-match", { stdio: "pipe" }).toString().trim();
    } catch (e) {
      gitInfo.tag = "";
    }
    gitInfo.commitHash = (0, import_child_process.execSync)("git rev-parse HEAD", { stdio: "pipe" }).toString().trim();
    gitInfo.branch = (0, import_child_process.execSync)("git rev-parse --abbrev-ref HEAD", { stdio: "pipe" }).toString().trim();
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
