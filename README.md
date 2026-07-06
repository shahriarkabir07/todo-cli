# Todo CLI

A tiny, dependency-free command-line to-do list manager built with Node.js.

## Features

- Add, list, complete, and remove tasks
- Tasks are saved to a JSON file in your home directory, so they persist between sessions
- No external dependencies — pure Node.js
- Colorful terminal output

## Requirements

- [Node.js](https://nodejs.org/) v14 or higher

## Installation

Clone the repository and install it locally:

```bash
git clone https://github.com/shahriarkabir07/todo-cli.git
cd todo-cli
npm link
```

`npm link` makes the `todo` command available globally on your machine.

Alternatively, you can just run it directly with Node without installing:

```bash
node index.js list
```

## Usage

```bash
todo add "Buy groceries"     # Add a new task
todo list                    # Show all tasks
todo done <id>               # Mark a task as completed
todo remove <id>             # Remove a task
todo clear                   # Remove all tasks
todo help                    # Show help
```

### Example

```bash
$ todo add "Write README"
Added: Write README

$ todo add "Push to GitHub"
Added: Push to GitHub

$ todo list

Your Tasks
----------
[ ] #1 Write README
[ ] #2 Push to GitHub

$ todo done 1
Marked as done: Write README

$ todo list

Your Tasks
----------
[x] #1 Write README
[ ] #2 Push to GitHub
```

## How it works

Tasks are stored as a JSON array in `~/.todo-cli-tasks.json`. Each task has an id, text, completion status, and a creation timestamp. The CLI reads and rewrites this file on every command, so there's no database to set up.

## Project structure

```
todo-cli/
├── index.js       # CLI logic and commands
├── package.json   # Project metadata and bin entry
├── .gitignore
└── README.md
```

## License

This project is licensed under the MIT License.

## Author

**shahriarkabir07**
