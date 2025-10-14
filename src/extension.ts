import * as vscode from 'vscode';
import { checkCommandExists } from './lib/command';
import { ErrorMessage } from './constants/message';
import { openGitUI, reloadGitUI } from './commands';

export const GITUI_COMMAND = 'gitui';

async function handleGitUICommand(commandFunction: () => void) {
  const exists = await checkCommandExists(GITUI_COMMAND);
  try {
    if (!exists) {
      throw new Error(ErrorMessage.GITUI_NOT_FOUND);
    }
    return commandFunction();
  } catch (error) {
    const message = error instanceof Error ? error.message : ErrorMessage.UNKNOWN;
    vscode.window.showErrorMessage(message);
  }
}

export function activate(context: vscode.ExtensionContext) {
  const disposables = [
    vscode.commands.registerCommand('vscode-gitui.open', () => handleGitUICommand(openGitUI)),
    vscode.commands.registerCommand('vscode-gitui.reload', () => handleGitUICommand(reloadGitUI)),
  ];
  disposables.forEach((disposable) => context.subscriptions.push(disposable));
}

export function deactivate() {}
