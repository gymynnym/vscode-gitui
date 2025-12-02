import * as vscode from 'vscode';

interface PythonExtensionAPI {
  environments: {
    getActiveEnvironmentPath(resource?: vscode.Uri): string | undefined;
  };
}

async function isPythonWorkspace(workspace: string | vscode.Uri): Promise<boolean> {
  const pythonExtension = vscode.extensions.getExtension<PythonExtensionAPI>('ms-python.python');
  if (!pythonExtension || !pythonExtension.isActive) {
    return false;
  }

  const pythonAPI = pythonExtension.exports;

  const workspaceUri = typeof workspace === 'string' ? vscode.Uri.file(workspace) : workspace;
  const environmentPath = pythonAPI.environments.getActiveEnvironmentPath(workspaceUri);
  return environmentPath !== undefined;
}

export { isPythonWorkspace };
