import * as path from 'path';
import * as fse from 'fs-extra';

export default async function formatPkgJson(projectDir: string) {
  const pkgJsonPath = path.join(projectDir, 'package.json');
  if (!await fse.pathExists(pkgJsonPath)) {
    throw new Error(`Path ${pkgJsonPath} does not exist.`);
  }

  let pkgJsonContent = await fse.readJSON(pkgJsonPath);
  pkgJsonContent = deleteFields(pkgJsonContent);

  await fse.writeJSON(pkgJsonPath, pkgJsonContent, { spaces: 2 });
}

function deleteFields(pkgJsonContent: Record<string, any>) {
  if (pkgJsonContent.npmFiles) {
    pkgJsonContent.files = pkgJsonContent.npmFiles;
  } else {
    delete pkgJsonContent.files;
  }
  delete pkgJsonContent.npmFiles;

  return pkgJsonContent;
}
