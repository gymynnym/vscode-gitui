import * as vscode from 'vscode';
import { ErrorMessage } from '../constants/message';
import { checkCommandExists, resolveGitCommand, runCommandInTerminal } from '../utils/command';
import { isPythonWorkspace } from '../utils/python';

async function openGitClient() {
  const command = resolveGitCommand();
  const commandExists = await checkCommandExists(command);
  if (!commandExists) {
    vscode.window.showErrorMessage(ErrorMessage.COMMAND_NOT_FOUND(command));
    return;
  }

  const workspace = await getCurrentWorkspace();
  const terminalOptions = {
    name: command,
    cwd: workspace,
    location: vscode.TerminalLocation.Editor,
  } satisfies vscode.TerminalOptions;

  if (!(await isPythonWorkspace(workspace))) {
    return runCommandInTerminal(command, terminalOptions);
  }

  const pythonConfig = vscode.workspace.getConfiguration('python.terminal');
  const originalActivateEnvironment = pythonConfig.get<boolean>('activateEnvironment', true);
  if (!originalActivateEnvironment) {
    return runCommandInTerminal(command, terminalOptions);
  }

  try {
    await pythonConfig.update('activateEnvironment', false, vscode.ConfigurationTarget.Workspace);
    return runCommandInTerminal(command, terminalOptions);
  } finally {
    await pythonConfig.update('activateEnvironment', originalActivateEnvironment, vscode.ConfigurationTarget.Workspace);
  }
}

async function getCurrentWorkspace(): Promise<string> {
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
  if (!pickedWorkspace) {
    throw new Error(ErrorMessage.WORKSPACE_NOT_FOUND);
  }
  return pickedWorkspace.uri.fsPath;
}

export { openGitClient };
