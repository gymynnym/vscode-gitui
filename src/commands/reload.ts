import * as vscode from 'vscode';
import { GITUI_COMMAND } from '../extension';
import { checkCommandExists } from '../lib/command';
import { InfoMessage, ErrorMessage } from '../constants/message';

async function reloadGitUI() {
  const exists = await checkCommandExists(GITUI_COMMAND);
  if (exists) {
    vscode.window.showInformationMessage(InfoMessage.GITUI_FOUND);
  } else {
    vscode.window.showErrorMessage(ErrorMessage.GITUI_NOT_FOUND);
  }
}

export { reloadGitUI };
