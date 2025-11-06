import * as vscode from 'vscode';
import { ErrorMessage } from '../constants/message';
import { resolveGitCommand, runCommandInTerminal } from '../lib/command';

async function openGitClient() {
  const workspace = await getCurrentWorkspace();
  const command = resolveGitCommand();
  if (workspace) {
    runCommandInTerminal(command, {
      name: command,
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

export { openGitClient };
