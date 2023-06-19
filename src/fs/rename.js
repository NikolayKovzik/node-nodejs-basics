import { promises as fs } from 'fs';
import { dirname } from "node:path";
import { fileURLToPath } from 'node:url';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
    const oldFileName = join(__dirname, 'files', 'wrongFilename.txt');
    const newFileName = join(__dirname, 'files', 'properFilename.md');

    try {
        await fs.access(oldFileName, fs.constants.F_OK);

        try {
            await fs.access(newFileName, fs.constants.F_OK);
            throw new Error('FS operation failed. "properFilename.md" have already exists in files folder.');
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.rename(oldFileName, newFileName);
                console.log('File renamed successfully.');
            } else {
                throw error;
            }
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed. "wrongFilename.txt" don\'t exist in files folder.');
        } else {
            throw error;
        }
    }
};

(async () => {
    try {
        await rename();
    } catch (error) {
        console.error(' An error occurred.\n', error.message);
    }
})();