# vscode-gitui

![screenshot](https://github.com/gymynnym/vscode-gitui/blob/master/assets/screenshot.png)

**A VSCode extension to open [GitUI](https://github.com/gitui-org/gitui) in an integrated terminal.**

### Installation

> [!IMPORTANT]
> Requires [GitUI](https://github.com/gitui-org/gitui) to be installed and available on your PATH.

There are 2 ways to install this extension:

1. Install from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=gymynnym.vscode-gitui)
2. Download VSIX file from [GitHub Releases](https://github.com/gymynnym/vscode-gitui/releases/latest)

### Commands

- `vscode-gitui.open` : Open GitUI in terminal
- `vscode-gitui.reload` : Reload GitUI on PATH

### Keybindings

#### Default Keybindings

- `ctrl+alt+g` : Open GitUI (Linux/Windows)
- `ctrl+cmd+g` : Open GitUI (macOS)

#### VSCodeVim Keybindings: for nerds (Example)

```json
{
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["space", "g", "g"],
      "commands": [{ "command": "vscode-gitui.open" }]
    },
    {
      "before": ["space", "g", "r"],
      "commands": [{ "command": "vscode-gitui.reload" }]
    }
  ]
}
```

### Properties

- `vscode-gitui.useWSL` : Enable if using GitUI via WSL (Windows only).
