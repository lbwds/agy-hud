import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { branch } from "../src/gitinfo";

function tempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "agy-hud-"));
}

test("branch from HEAD ref", () => {
  const repo = tempDir();
  fs.mkdirSync(path.join(repo, ".git"));
  fs.writeFileSync(path.join(repo, ".git", "HEAD"), "ref: refs/heads/main\n");

  assert.equal(branch(repo), "main");
});

test("branch from HEAD ref with subdirectories (slash)", () => {
  const repo = tempDir();
  fs.mkdirSync(path.join(repo, ".git"));
  fs.writeFileSync(path.join(repo, ".git", "HEAD"), "ref: refs/heads/feature/cool-stuff\n");

  assert.equal(branch(repo), "feature/cool-stuff");
});

test("detached HEAD and parent traversal", () => {
  const repo = tempDir();
  const child = path.join(repo, "a", "b");
  fs.mkdirSync(path.join(repo, ".git"), { recursive: true });
  fs.mkdirSync(child, { recursive: true });
  fs.writeFileSync(path.join(repo, ".git", "HEAD"), "abcdef1234567890\n");

  assert.equal(branch(child), "abcdef1");
});

test("branch from gitdir file", () => {
  const repo = tempDir();
  const gitDir = path.join(tempDir(), "actual-git-dir");
  fs.mkdirSync(gitDir, { recursive: true });
  fs.writeFileSync(path.join(repo, ".git"), `gitdir: ${gitDir}\n`);
  fs.writeFileSync(path.join(gitDir, "HEAD"), "ref: refs/heads/worktree-main\n");

  assert.equal(branch(repo), "worktree-main");
});

test("missing git dir returns empty branch", () => {
  assert.equal(branch(tempDir()), "");
});

test("relative basename falls back to process working directory", () => {
  const parent = tempDir();
  const repo = path.join(parent, "repo");
  fs.mkdirSync(path.join(repo, ".git"), { recursive: true });
  fs.writeFileSync(path.join(repo, ".git", "HEAD"), "ref: refs/heads/main\n");
  const old = process.cwd();
  process.chdir(repo);
  try {
    assert.equal(branch("repo"), "main");
  } finally {
    process.chdir(old);
  }
});
