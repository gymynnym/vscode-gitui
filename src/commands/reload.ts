import * as vscode from 'vscode';
import { checkCommandExists, resolveGitCommand } from '../lib/command';
import { ErrorMessage, InfoMessage } from '../constants/message';

async function reloadGitClient() {
  const command = resolveGitCommand();
  const exists = await checkCommandExists(command);
  if (exists) {
    vscode.window.showInformationMessage(InfoMessage.COMMAND_FOUND(command));
  } else {
    vscode.window.showErrorMessage(ErrorMessage.COMMAND_NOT_FOUND(command));
  }
}

export { reloadGitClient };
