import type { PluginOption } from "vite";
import { execSync } from "child_process";

const getGitVersion = () => {
  let gitInfo: {
    commitHash?: string;
    tag?: string;
    branch?: string;
  } = {}
  try {
    try {
      gitInfo.tag = execSync("git describe --tags --exact-match", { stdio: "pipe" })
        .toString()
        .trim();
    } catch (e) {
      gitInfo.tag = "";
    }
    gitInfo.commitHash = execSync("git rev-parse HEAD", { stdio: "pipe" }).toString().trim();
    gitInfo.branch = execSync("git rev-parse --abbrev-ref HEAD", { stdio: "pipe" })
      .toString()
      .trim();

    return gitInfo;
  } catch (error) {
    console.error("Unable to retrieve Git information:", error);
    return gitInfo;
  }
};

export default function plugin(): PluginOption {
  return {
    name: "version-plugin",
    apply: "build",
    config: (config) => {
      const { commitHash, tag, branch } = getGitVersion();
      return {
        define: {
          ...config.define,
          "import.meta.env.GIT_COMMIT": JSON.stringify(commitHash),
          "import.meta.env.GIT_TAG": JSON.stringify(tag),
          "import.meta.env.GIT_BRANCH": JSON.stringify(branch),
        },
      };
    },
  };
}
