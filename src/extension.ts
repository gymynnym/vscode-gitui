import * as vscode from 'vscode';
import { openGitClient, reloadGitClient } from './commands';

export function activate(context: vscode.ExtensionContext) {
  const disposables = [
    vscode.commands.registerCommand('vscode-gitui.open', openGitClient),
    vscode.commands.registerCommand('vscode-gitui.reload', reloadGitClient),
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('vscode-gitui')) {
        reloadGitClient();
      }
    }),
  ];
  disposables.forEach((disposable) => context.subscriptions.push(disposable));
}

export function deactivate() {}
