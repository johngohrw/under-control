const { resolve } = require("path");
const { readdir } = require("fs").promises;
const { writeFile, appendFile } = require("fs");

// folder containing assets
const assetsDir = "./assets/images";
// ts or js filepath to write to
const exportsFilePath = "./assets/images/index.ts";
// file extensions to include
const includedExtensions = ["svg", "png", "jpg", "jpeg", "webp", "gif"];

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

const writeFileCallback = (err) => {
  if (err) console.log(err);
};

(async () => {
  console.log(`[generateExports.js] Generating exports for ${assetsDir}...`);
  writeFile(exportsFilePath, "", writeFileCallback);
  const exports = [];
  for await (const f of getFiles(assetsDir)) {
    const extension = f.slice(-4).replace(".", "");
    if (includedExtensions.includes(extension)) {
      const assetsDirTrimmed = assetsDir.replace(/^.(.*)$/, "$1"); // trim leading period
      const relativePath = f.replace(
        new RegExp(`^(.*)(${assetsDirTrimmed})(.*)$`), // remove path prefix
        "$3"
      );
      const fileName = relativePath
        .replace(/.[a-z]*$/, "")
        .split(/\/|-|_/) // filter out / - _ characters
        .reduce((a, c) => `${a}${c.charAt(0).toUpperCase() + c.slice(1)}`, ""); // capitalise first letter
      exports.push([fileName, relativePath]);
    }
  }
  const sortedExportStrings = exports
    .sort((a, b) => {
      return a[1] < b[1];
    })
    .map(
      ([fileName, relativePath]) =>
        `export * as ${fileName} from ".${relativePath}";`
    );
  appendFile(
    exportsFilePath,
    sortedExportStrings.join("\n"),
    writeFileCallback
  );
})();
