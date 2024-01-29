import { promises as fsPromises } from 'fs';
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    try {
        const sourceDir = join(__dirname, "files");
        const destinationDir = join(__dirname, "files_copy");

        await fsPromises.cp(sourceDir, destinationDir, { recursive: true, errorOnExist: true, force: false })
    } catch (error) {
        if (error.code == 'ERR_FS_CP_EEXIST') {
            throw new Error('FS operation failed. Target already exists');
        }
        throw error;
    }
};

await copy();

