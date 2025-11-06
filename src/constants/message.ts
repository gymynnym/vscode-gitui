export const InfoMessage = {
  COMMAND_FOUND: (command: string) => `${command} is available in PATH!`,
};

export const ErrorMessage = {
  COMMAND_NOT_FOUND: (command: string) =>
    `Cannot find ${command} in PATH. Please install ${command} and ensure it is available in your system PATH`,
  WORKSPACE_NOT_FOUND: 'Cannot find a workspace folder. Please open a workspace',
  UNKNOWN: 'An unknown error occurred',
};
