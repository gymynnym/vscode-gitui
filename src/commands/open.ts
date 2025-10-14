import * as vscode from 'vscode';
import { ErrorMessage } from '../constants/message';
import { runCommandInTerminal } from '../lib/command';
import { GITUI_COMMAND } from '../extension';

async function openGitUI() {
  const workspace = await getCurrentWorkspace();
  if (workspace) {
    runCommandInTerminal(GITUI_COMMAND, {
      name: GITUI_COMMAND,
      cwd: workspace,
      location: vscode.TerminalLocation.Editor,
    });
  }
}

async function getCurrentWorkspace(): Promise<string | undefined> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    throw new Error(ErrorMessage.WORKSPACE_NOT_FOUND);
  }
  if (workspaceFolders.length === 1) {
    return workspaceFolders[0].uri.fsPath;
  }

  const pickedWorkspace = await vscode.window.showWorkspaceFolderPick({
    placeHolder: 'Select a workspace folder to open gitui in',
    ignoreFocusOut: true,
  });
  return pickedWorkspace?.uri.fsPath;
}

export { openGitUI };
