#!/usr/bin/env node

/**
 * Todo CLI
 * A tiny, dependency-free command-line to-do list manager.
 * Author: shahriarkabir07
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

const DATA_FILE = path.join(os.homedir(), ".todo-cli-tasks.json");

const COLORS = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

function loadTasks() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`${COLORS.red}Could not read task file, starting fresh.${COLORS.reset}`);
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

function addTask(text) {
  if (!text || !text.trim()) {
    console.log(`${COLORS.red}Please provide a task description.${COLORS.reset}`);
    return;
  }
  const tasks = loadTasks();
  tasks.push({
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    text: text.trim(),
    done: false,
    createdAt: new Date().toISOString(),
  });
  saveTasks(tasks);
  console.log(`${COLORS.green}Added:${COLORS.reset} ${text.trim()}`);
}

function listTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log(`${COLORS.gray}No tasks yet. Add one with: todo add "Your task"${COLORS.reset}`);
    return;
  }
  console.log(`\n${COLORS.cyan}Your Tasks${COLORS.reset}`);
  console.log(`${COLORS.gray}----------${COLORS.reset}`);
  tasks.forEach((task) => {
    const status = task.done
      ? `${COLORS.green}[x]${COLORS.reset}`
      : `${COLORS.yellow}[ ]${COLORS.reset}`;
    const text = task.done ? `${COLORS.gray}${task.text}${COLORS.reset}` : task.text;
    console.log(`${status} ${COLORS.gray}#${task.id}${COLORS.reset} ${text}`);
  });
  console.log("");
}

function completeTask(id) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) {
    console.log(`${COLORS.red}Task #${id} not found.${COLORS.reset}`);
    return;
  }
  task.done = true;
  saveTasks(tasks);
  console.log(`${COLORS.green}Marked as done:${COLORS.reset} ${task.text}`);
}

function removeTask(id) {
  const tasks = loadTasks();
  const index = tasks.findIndex((t) => t.id === Number(id));
  if (index === -1) {
    console.log(`${COLORS.red}Task #${id} not found.${COLORS.reset}`);
    return;
  }
  const [removed] = tasks.splice(index, 1);
  saveTasks(tasks);
  console.log(`${COLORS.red}Removed:${COLORS.reset} ${removed.text}`);
}

function clearTasks() {
  saveTasks([]);
  console.log(`${COLORS.yellow}All tasks cleared.${COLORS.reset}`);
}

function printHelp() {
  console.log(`
${COLORS.cyan}Todo CLI${COLORS.reset} - a tiny command-line task manager

${COLORS.yellow}Usage:${COLORS.reset}
  todo add "Buy groceries"     Add a new task
  todo list                    Show all tasks
  todo done <id>                Mark a task as completed
  todo remove <id>              Remove a task
  todo clear                    Remove all tasks
  todo help                     Show this help message
`);
}

function main() {
  const [, , command, ...args] = process.argv;

  switch (command) {
    case "add":
      addTask(args.join(" "));
      break;
    case "list":
    case "ls":
      listTasks();
      break;
    case "done":
      completeTask(args[0]);
      break;
    case "remove":
    case "rm":
      removeTask(args[0]);
      break;
    case "clear":
      clearTasks();
      break;
    case "help":
    case undefined:
      printHelp();
      break;
    default:
      console.log(`${COLORS.red}Unknown command: ${command}${COLORS.reset}`);
      printHelp();
  }
}

main();
