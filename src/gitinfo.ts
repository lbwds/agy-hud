import fs from "node:fs";
import path from "node:path";

export function branch(cwd: string): string {
  if (cwd === "") {
    return "";
  }
  let dir: string;
  try {
    dir = path.resolve(cwd);
  } catch {
    dir = cwd;
  }
  for (let i = 0; i < 8; i++) {
    const raw = readHEAD(dir);
    if (raw !== null) {
      return parseHEAD(raw.trim());
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  return "";
}

function readHEAD(dir: string): string | null {
  const gitPath = path.join(dir, ".git");
  let stat: fs.Stats;
  try {
    stat = fs.statSync(gitPath);
  } catch {
    return null;
  }

  if (stat.isDirectory()) {
    try {
      return fs.readFileSync(path.join(gitPath, "HEAD"), "utf8");
    } catch {
      return null;
    }
  }

  let raw: string;
  try {
    raw = fs.readFileSync(gitPath, "utf8");
  } catch {
    return null;
  }
  let gitDir = parseGitDirFile(raw.trim());
  if (gitDir === "") {
    return null;
  }
  if (!path.isAbsolute(gitDir)) {
    gitDir = path.join(dir, gitDir);
  }
  try {
    return fs.readFileSync(path.join(gitDir, "HEAD"), "utf8");
  } catch {
    return null;
  }
}

function parseGitDirFile(raw: string): string {
  if (!raw.startsWith("gitdir:")) {
    return "";
  }
  return raw.slice("gitdir:".length).trim();
}

function parseHEAD(head: string): string {
  if (head.startsWith("ref:")) {
    const ref = head.slice("ref:".length).trim();
    if (ref.startsWith("refs/heads/")) {
      return ref.slice("refs/heads/".length);
    }
    return path.basename(ref);
  }
  if (head.length > 7) {
    return head.slice(0, 7);
  }
  return head;
}
