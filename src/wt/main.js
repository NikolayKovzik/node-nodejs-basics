import { Worker } from "worker_threads";
import os from "os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerPath = join(__dirname, "worker.js");

const DEFAULT_START_NUMBER = 10;

const createNewWorker = (fibNumber) => {
  return new Promise((resolve) => {
    const worker = new Worker(workerPath, {
      workerData: { fibNumber },
    });

    worker.on("message", (result) => {
      resolve({ status: "resolved", data: result });
    });

    worker.on("error", () => {
      resolve({ status: "error", data: null });
    });
  });
};

const performCalculations = async () => {
  const cpuCores = os.cpus().length;
  const workersPool = [];

  for (let i = 0; i < cpuCores; i++) {
    const fibNumber = DEFAULT_START_NUMBER + i;
    const workerPromise = createNewWorker(fibNumber);
    workersPool.push(workerPromise);
  }

  const results = await Promise.all(workersPool);
  console.log(results);
};

performCalculations();