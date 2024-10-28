import {
  NotificationType,
  ParameterStructures,
} from "vscode-languageserver-protocol";

export const MyNotificationType = new NotificationType<Parameters>(
  "notification",
  ParameterStructures.auto,
);

interface Parameters {
  msg: string;
}
