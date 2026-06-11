// Runs the API and web dev servers together with prefixed, color-coded output.
// Kept dependency-free on purpose.
import { spawn } from "node:child_process";

const targets = [
  { name: "api", color: "\x1b[33m", args: ["-w", "server", "run", "dev"] },
  { name: "web", color: "\x1b[36m", args: ["-w", "client", "run", "dev"] },
];
const reset = "\x1b[0m";
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

const children = targets.map(({ name, color, args }) => {
  const child = spawn(npm, args, { shell: process.platform === "win32" });
  const prefix = `${color}[${name}]${reset} `;

  const pipe = (stream) => (chunk) => {
    const text = chunk.toString();
    for (const line of text.split("\n")) {
      if (line.length) stream.write(prefix + line + "\n");
    }
  };
  child.stdout.on("data", pipe(process.stdout));
  child.stderr.on("data", pipe(process.stderr));
  return child;
});

const shutdown = () => children.forEach((c) => !c.killed && c.kill());
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("exit", shutdown);
