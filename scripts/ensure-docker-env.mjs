import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, "docker.env");
const example = path.join(root, "docker.env.example");

if (fs.existsSync(target)) {
  console.log("docker.env already exists.");
  process.exit(0);
}
if (!fs.existsSync(example)) {
  console.error("Missing docker.env.example");
  process.exit(1);
}
fs.copyFileSync(example, target);
console.log("Created docker.env from docker.env.example — edit POSTGRES_PASSWORD if needed.");
