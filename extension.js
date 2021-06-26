// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function getFileSnippet(fspath) {
  let x = fspath.split("\\");
  if (x.length == 0) {
    return "";
  } else if (x.length == 1) {
    return x[x.length - 1];
  }

  return x[x.length - 2] + " | " + x[x.length - 1];
}
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "line-number-generator" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

  let disposable = vscode.commands.registerTextEditorCommand(
    "line-number-generator.insertLineNumber",
    function (editor, edit, args) {
      let text = `[${getFileSnippet(editor.document.uri.fsPath)}] .... line ${
        editor.selection.active.line + 1
      }`;
      edit.replace(editor.selection, text);
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
