/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  _Connection,
} from "vscode-languageserver/node";

import { TextDocument } from "vscode-languageserver-textdocument";
import { format } from "./format";
import { onCompletion, onCompletionResolve } from "./completion";
import { validateTextDocument } from "./validator/validate";
import {
  hasConfigurationCapability,
  onInitialize,
  onInitialized,
} from "./initialize";

// The example settings
interface ExampleSettings {
  maxNumberOfProblems: number;
}

export type Context = {
  connection: _Connection;
  documents: TextDocuments<TextDocument>;
};

export type Settings = {
  globalSettings: ExampleSettings;
  defaultSettings: ExampleSettings;
  documentSettings: Map<string, Thenable<ExampleSettings>>;
};

function main() {
  // Create a connection for the server, using Node's IPC as a transport.
  // Also include all preview / proposed LSP features.
  const connection = createConnection(ProposedFeatures.all);

  // Create a simple text document manager.
  const documents: TextDocuments<TextDocument> = new TextDocuments(
    TextDocument
  );

  const context: Context = { connection, documents };

  connection.onInitialize(onInitialize);
  connection.onInitialized(() => onInitialized(context));

  // The global settings, used when the `workspace/configuration` request is not supported by the client.
  // Please note that this is not the case when using this server with the client provided in this example
  // but could happen with other clients.
  const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
  let globalSettings: ExampleSettings = defaultSettings;

  // Cache the settings of all open documents
  const documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

  const settings: Settings = {
    globalSettings,
    defaultSettings,
    documentSettings,
  };

  connection.onDidChangeConfiguration((change) => {
    if (hasConfigurationCapability) {
      // Reset all cached document settings
      documentSettings.clear();
    } else {
      globalSettings = <ExampleSettings>(
        (change.settings.languageServerExample || defaultSettings)
      );
    }
    // Revalidate all open text documents
    documents
      .all()
      .forEach((document) => validateTextDocument(context, settings, document));
  });

  // Only keep settings for open documents
  documents.onDidClose((e) => {
    documentSettings.delete(e.document.uri);
  });

  // The content of a text document has changed. This event is emitted
  // when the text document first opened or when its content has changed.
  documents.onDidChangeContent((change) => {
    validateTextDocument(context, settings, change.document);
  });

  connection.onDidChangeWatchedFiles(() => {
    // Monitored files have change in VSCode
    connection.console.log("We received an file change event");
  });

  connection.onCompletion(onCompletion);

  connection.onCompletionResolve(onCompletionResolve);

  connection.onDocumentFormatting((params) => format(context, params));

  // Make the text document manager listen on the connection
  // for open, change and close text document events
  documents.listen(connection);

  // Listen on the connection
  connection.listen();
}

main();

export function getDocumentSettings(
  { connection }: Context,
  { globalSettings, documentSettings }: Settings,
  resource: string
): Thenable<ExampleSettings> {
  if (!hasConfigurationCapability) {
    return Promise.resolve(globalSettings);
  }
  let result = documentSettings.get(resource);
  if (!result) {
    result = connection.workspace.getConfiguration({
      scopeUri: resource,
      section: "languageServerExample",
    });
    documentSettings.set(resource, result);
  }
  return result;
}
