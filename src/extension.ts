import * as vscode from 'vscode';
import { checkCommandExists, resolveGitCommand } from './lib/command';
import { ErrorMessage } from './constants/message';
import { openGitClient, reloadGitClient } from './commands';

async function handleGitClientCommand(commandFunction: () => void) {
  const command = resolveGitCommand();
  const exists = await checkCommandExists(command);
  try {
    if (!exists) {
      throw new Error(ErrorMessage.COMMAND_NOT_FOUND(command));
    }
    return commandFunction();
  } catch (error) {
    const message = error instanceof Error ? error.message : ErrorMessage.UNKNOWN;
    vscode.window.showErrorMessage(message);
  }
}

export function activate(context: vscode.ExtensionContext) {
  const disposables = [
    vscode.commands.registerCommand('vscode-gitui.open', () => handleGitClientCommand(openGitClient)),
    vscode.commands.registerCommand('vscode-gitui.reload', () => handleGitClientCommand(reloadGitClient)),
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('vscode-gitui')) {
        reloadGitClient();
      }
    }),
  ];
  disposables.forEach((disposable) => context.subscriptions.push(disposable));
}

export function deactivate() {}
