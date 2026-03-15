export interface TerminalLine {
  id: string;
  content: string;
  className: string;
}

export interface CommandContext {
  addLine: (text: string, className?: string, delay?: number) => void;
  addLines: (lines: string[], className?: string, delay?: number) => void;
  clearTerminal: () => void;
  enterPasswordMode: () => void;
  exitPasswordMode: () => void;
  openLink: (url: string) => void;
  setPrompt: (prompt: string) => void;
}

export type CommandHandler = (context: CommandContext) => void;

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  handler: CommandHandler;
}
