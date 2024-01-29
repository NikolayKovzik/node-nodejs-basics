import { promises as fsPromises } from 'fs';
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const directoryPath = join(__dirname, "files");
  const filePath = join(directoryPath, "fresh.txt");
  const fileContent = 'I am fresh and young';

  try {
    await fsPromises.writeFile(filePath, fileContent, { flag: "wx" });
    console.log('File created successfully');
  } catch (error) {
    if (error.code == 'EEXIST') {
      throw new Error('FS operation failed. File already exists');
    }
    throw error;
  }
};


await create();
