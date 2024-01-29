import { promises as fsPromises, constants as fsConstants } from 'fs';
import { dirname } from "node:path";
import { fileURLToPath } from 'node:url';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
    const oldFileName = join(__dirname, 'files', 'wrongFilename.txt');
    const newFileName = join(__dirname, 'files', 'properFilename.md');

    try {
        await fsPromises.access(oldFileName, fsConstants.F_OK);

        try {
            await fsPromises.access(newFileName, fsConstants.F_OK);
            throw new Error('FS operation failed. "properFilename.md" have already exists in files folder.');
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fsPromises.rename(oldFileName, newFileName);
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


await rename();
