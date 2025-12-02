import * as vscode from 'vscode';
import os from 'os';
import { exec } from 'child_process';

const GITUI_COMMAND = 'gitui';
const LAZYGIT_COMMAND = 'lazygit';

function resolveGitCommand(): string {
  const useLazygit = vscode.workspace.getConfiguration('vscode-gitui').get<boolean>('useLazygit', false);
  return useLazygit ? LAZYGIT_COMMAND : GITUI_COMMAND;
}

const commandExistsCache: Set<string> = new Set();
async function checkCommandExists(command: string): Promise<boolean> {
  if (commandExistsCache.has(command)) {
    return true;
  }

  return new Promise((resolve) => {
    const checkCommand = getCheckCommand(command);
    exec(checkCommand, (err, _stdout, stderr) => {
      if (!err && !stderr) {
        commandExistsCache.add(command);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function getCheckCommand(command: string): string {
  const isWindows = os.platform() === 'win32';
  const useWSL = vscode.workspace.getConfiguration('vscode-gitui').get<boolean>('useWSL', false);

  if (isWindows) {
    if (useWSL) {
      return `wsl -e which ${command}`;
    } else {
      return `where ${command} || where ${command}.exe`;
    }
  }

  return `which ${command}`;
}

async function runCommandInTerminal(command: string, terminalOptions: vscode.TerminalOptions) {
  const { shellPath, shellArgs } = getShellConfig();
  const terminal = vscode.window.createTerminal({ ...terminalOptions, shellPath, shellArgs: [...shellArgs, command] });

  terminal.show();
  vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');

  const closeListener = vscode.window.onDidCloseTerminal(async (closedTerminal) => {
    if (closedTerminal === terminal) {
      vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
      closeListener.dispose();
    }
  });
}

function getShellConfig(): { shellPath: string; shellArgs: string[] } {
  const isWindows = os.platform() === 'win32';

  if (isWindows) {
    const useWSL = vscode.workspace.getConfiguration('vscode-gitui').get<boolean>('useWSL', false);
    if (useWSL) {
      return { shellPath: 'powershell.exe', shellArgs: ['-Command', 'wsl -e'] };
    } else {
      return { shellPath: 'powershell.exe', shellArgs: ['-Command'] };
    }
  }

  return { shellPath: 'sh', shellArgs: ['-c'] };
}

export { resolveGitCommand, checkCommandExists, runCommandInTerminal };
