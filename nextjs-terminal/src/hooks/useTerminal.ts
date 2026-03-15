"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { TerminalLine } from "@/types";
import {
  banner,
  whois,
  whoami,
  about,
  skills,
  experience,
  education,
  leadership,
  projects,
  social,
  contact,
  secret,
  help,
  advancedHelp,
  availableCommands,
  manPages,
  socialLinks,
  projectLinks,
  secretPassword,
} from "@/lib/commands-data";

// Generate unique IDs for terminal lines
let lineIdCounter = 0;
const generateLineId = () => `line-${++lineIdCounter}`;

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [isPasswordMode, setIsPasswordMode] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("visitor@falcon98:~$");
  
  // Use useRef for startTime to avoid impure function in useState
  const startTimeRef = useRef<number | null>(null);
  
  // Initialize startTime on first render using useEffect
  useEffect(() => {
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }
  }, []);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Add a single line to the terminal
  const addLine = useCallback(
    (text: string, className: string = "text-white", delay: number = 0) => {
      if (delay > 0) {
        setTimeout(() => {
          setLines((prev) => [
            ...prev,
            { id: generateLineId(), content: text, className },
          ]);
        }, delay);
      } else {
        setLines((prev) => [
          ...prev,
          { id: generateLineId(), content: text, className },
        ]);
      }
    },
    []
  );

  // Add multiple lines to the terminal
  const addLines = useCallback(
    (
      newLines: string[],
      className: string = "text-[#58a6ff]",
      delayPerLine: number = 60
    ) => {
      newLines.forEach((line, index) => {
        addLine(line, className, index * delayPerLine);
      });
    },
    [addLine]
  );

  // Clear terminal
  const clearTerminal = useCallback(() => {
    setLines([]);
  }, []);

  // Open link
  const openLink = useCallback((url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank");
    }
  }, []);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  // Focus input
  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Display banner on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      addLines(banner, "text-[#58a6ff]", 40);
    }, 500);
    return () => clearTimeout(timer);
  }, [addLines]);

  // Scroll to bottom when lines change
  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [lines, scrollToBottom]);

  // Display system info (neofetch)
  const displaySystemInfo = useCallback(() => {
    const memoryInfo =
      typeof window !== "undefined" &&
      (performance as unknown as { memory?: { usedJSHeapSize: number } })
        .memory
        ? Math.round(
            (
              performance as unknown as { memory: { usedJSHeapSize: number } }
            ).memory.usedJSHeapSize /
              1024 /
              1024
          ) + "MB"
        : "Unknown";
    const uptime = Math.floor((Date.now() - (startTimeRef.current || Date.now())) / 1000);

    const info = [
      "",
      "╭─────────────────────────────╮",
      "│     🚀 Falcon 98 System    │",
      "├─────────────────────────────┤",
      "│ OS: Falcon98OS 1.0.0        │",
      "│ Host: terminal.falcon98.com  │",
      "│ Shell: Falcon98sh            │",
      "│ Terminal: WebTerminal        │",
      "│ CPU: JavaScript Engine       │",
      `│ Memory: ${memoryInfo.padEnd(18)}│`,
      `│ Uptime: ${uptime}s${" ".repeat(17 - uptime.toString().length)}│`,
      "╰─────────────────────────────╯",
      "",
    ];
    addLines(info, "text-[#39d353]", 30);
  }, [addLines]);

  // Simulate ping
  const simulatePing = useCallback(() => {
    addLine(
      "PING falcon98.com (185.199.108.153): 56 data bytes",
      "text-white",
      0
    );
    const delays = [23, 19, 31, 27, 22];
    delays.forEach((delay, i) => {
      setTimeout(() => {
        addLine(
          `64 bytes from falcon98.com: icmp_seq=${i + 1} time=${delay}ms`,
          "text-[#7ee787]",
          0
        );
        if (i === delays.length - 1) {
          setTimeout(() => {
            addLine("--- falcon98.com ping statistics ---", "text-white", 0);
            addLine(
              "5 packets transmitted, 5 received, 0% packet loss",
              "text-[#7ee787]",
              0
            );
          }, 200);
        }
      }, i * 1000);
    });
  }, [addLine]);

  // Start matrix effect
  const startMatrix = useCallback(() => {
    addLine("Entering the Matrix...", "text-[#7ee787]", 0);
    const matrixChars = "01";
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        let line = "";
        for (let j = 0; j < 80; j++) {
          line += matrixChars[Math.floor(Math.random() * 2)];
        }
        addLine(line, "text-[#7ee787]", 0);
      }, i * 100);
    }
    setTimeout(() => {
      addLine("Welcome to the real world, Neo.", "text-white", 0);
    }, 1500);
  }, [addLine]);

  // Process command
  const processCommand = useCallback(
    (cmd: string) => {
      const cleanCmd = cmd.toLowerCase().replace(/\s+/g, " ").trim();

      switch (cleanCmd) {
        case "help":
          addLines(help, "text-[#58a6ff]", 60);
          break;
        case "help --all":
        case "help -a":
          addLines([...help, ...advancedHelp], "text-[#58a6ff]", 60);
          break;
        case "whois":
          addLines(whois, "text-white", 60);
          break;
        case "whoami":
          addLines(whoami, "text-[#39d353]", 60);
          break;
        case "about":
        case "info":
          addLines(about, "text-[#58a6ff]", 60);
          break;
        case "skills":
        case "tech":
          addLines(skills, "text-[#ffa657]", 60);
          break;
        case "experience":
        case "exp":
          addLines(experience, "text-[#7ee787]", 60);
          break;
        case "education":
        case "edu":
          addLines(education, "text-[#39d353]", 60);
          break;
        case "leadership":
        case "achievements":
          addLines(leadership, "text-[#ffa657]", 60);
          break;
        case "projects":
        case "portfolio":
          addLines(projects, "text-[#58a6ff]", 60);
          break;
        case "social":
        case "links":
          addLines(social, "text-[#58a6ff]", 60);
          break;
        case "contact":
        case "reach":
          addLines(contact, "text-[#7ee787]", 60);
          break;
        case "secret":
        case "sudo":
          setIsPasswordMode(true);
          setPrompt("Password:");
          addLine("🔐 Enter the secret password:", "text-[#ffa657]", 0);
          break;
        case "history":
          addLine("", "", 0);
          commandHistory.forEach((histCmd, index) => {
            addLine(`${index + 1}  ${histCmd}`, "text-[#7d8590]", 20 * index);
          });
          addLine("", "", 0);
          break;
        case "clear":
        case "cls":
          clearTerminal();
          break;
        case "banner":
        case "logo":
          addLines(banner, "text-[#58a6ff]", 40);
          break;
        case "date":
          addLine(new Date().toString(), "text-white", 0);
          break;
        case "whoami --system":
          addLine(
            "System: " +
              (typeof window !== "undefined" ? navigator.userAgent : "Unknown"),
            "text-[#7d8590]",
            0
          );
          break;
        case "pwd":
          addLine("/home/visitor", "text-white", 0);
          break;
        case "ls":
        case "dir":
          addLines(
            ["projects/", "documents/", "contact.txt", "resume.pdf"],
            "text-[#58a6ff]",
            40
          );
          break;
        case "neofetch":
          displaySystemInfo();
          break;
        case "matrix":
          startMatrix();
          break;
        case "github":
          addLine("🔗 Opening GitHub profile...", "text-[#7ee787]", 0);
          openLink(socialLinks.github);
          break;
        case "linkedin":
          addLine("🔗 Opening LinkedIn profile...", "text-[#7ee787]", 0);
          openLink(socialLinks.linkedin);
          break;
        case "website":
        case "site":
          addLine("🔗 Opening website...", "text-[#7ee787]", 0);
          openLink(socialLinks.website);
          break;
        case "email":
        case "mail":
          addLine("📧 Opening email client...", "text-[#7ee787]", 0);
          openLink(socialLinks.email);
          break;
        case "youtube":
        case "video":
          if (socialLinks.youtube === "#") {
            addLine("📺 YouTube channel coming soon!", "text-[#ffa657]", 0);
          } else {
            addLine("🔗 Opening YouTube channel...", "text-[#7ee787]", 0);
            openLink(socialLinks.youtube);
          }
          break;
        case "twitter":
          if (socialLinks.twitter === "#") {
            addLine("🐦 Twitter profile coming soon!", "text-[#ffa657]", 0);
          } else {
            addLine("🔗 Opening Twitter profile...", "text-[#7ee787]", 0);
            openLink(socialLinks.twitter);
          }
          break;
        case "instagram":
          addLine("🔗 Opening Instagram profile...", "text-[#7ee787]", 0);
          openLink(socialLinks.instagram);
          break;
        case "qr":
        case "qrcode":
          addLine("🔗 Opening QR Code Generator...", "text-[#7ee787]", 0);
          openLink(projectLinks.qr);
          break;
        case "ping falcon98.com":
          simulatePing();
          break;
        case "echo hello":
          addLine("hello", "text-white", 0);
          break;
        case "uname":
          addLine("Falcon98OS 1.0.0", "text-white", 0);
          break;
        case "uptime":
          const uptimeSecs = Math.floor((Date.now() - (startTimeRef.current || Date.now())) / 1000);
          addLine(
            `up ${Math.floor(uptimeSecs / 3600)}:${Math.floor((uptimeSecs % 3600) / 60)
              .toString()
              .padStart(2, "0")}`,
            "text-white",
            0
          );
          break;
        case "":
          break;
        default:
          if (cleanCmd.startsWith("echo ")) {
            addLine(cleanCmd.substring(5), "text-white", 0);
          } else if (cleanCmd.startsWith("man ")) {
            const manCommand = cleanCmd.substring(4);
            if (manPages[manCommand]) {
              addLines(manPages[manCommand], "text-white", 40);
            } else {
              addLine(`No manual entry for ${manCommand}`, "text-[#ff7b72]", 0);
            }
          } else {
            addLine(`❌ Command not found: ${cmd}`, "text-[#ff7b72]", 0);
            addLine(
              `💡 Type 'help' for available commands`,
              "text-[#7d8590]",
              0
            );
          }
          break;
      }
    },
    [
      addLine,
      addLines,
      clearTerminal,
      commandHistory,
      displaySystemInfo,
      openLink,
      simulatePing,
      startMatrix,
    ]
  );

  // Handle password input
  const handlePasswordInput = useCallback(
    (password: string) => {
      if (password === secretPassword) {
        addLines(secret, "text-[#7ee787]", 80);
      } else {
        addLine("❌ Access denied. Wrong password.", "text-[#ff7b72]", 0);
      }
      setIsPasswordMode(false);
      setPrompt("visitor@falcon98:~$");
    },
    [addLine, addLines]
  );

  // Execute command
  const executeCommand = useCallback(
    (command: string) => {
      const trimmedCommand = command.trim();

      if (isPasswordMode) {
        // Show password dots in history
        addLine(
          `Password: ${"•".repeat(trimmedCommand.length)}`,
          "text-[#7d8590]",
          0
        );
        handlePasswordInput(trimmedCommand);
      } else {
        // Add command to history
        if (trimmedCommand) {
          setCommandHistory((prev) => [...prev, trimmedCommand]);
        }

        // Display command in terminal
        addLine(`visitor@falcon98:~$ ${trimmedCommand}`, "text-[#7d8590]", 0);

        // Process command
        processCommand(trimmedCommand);
      }

      // Reset history index and input
      setHistoryIndex(-1);
      setCurrentInput("");
    },
    [addLine, handlePasswordInput, isPasswordMode, processCommand]
  );

  // Tab completion - must be defined before handleKeyDown
  const handleTabCompletion = useCallback(() => {
    const matches = availableCommands.filter((cmd) =>
      cmd.startsWith(currentInput.toLowerCase())
    );
    if (matches.length === 1) {
      setCurrentInput(matches[0]);
    } else if (matches.length > 1) {
      addLine(
        `Possible completions: ${matches.join(", ")}`,
        "text-[#7d8590]",
        0
      );
    }
  }, [currentInput, addLine]);

  // Handle key press
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        executeCommand(currentInput);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex < commandHistory.length - 1
              ? historyIndex + 1
              : historyIndex;
          setHistoryIndex(newIndex);
          setCurrentInput(
            commandHistory[commandHistory.length - 1 - newIndex] || ""
          );
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setCurrentInput(
            commandHistory[commandHistory.length - 1 - newIndex] || ""
          );
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setCurrentInput("");
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        handleTabCompletion();
      } else if (e.key === "Escape") {
        setCurrentInput("");
      }
    },
    [currentInput, commandHistory, historyIndex, executeCommand, handleTabCompletion]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentInput(e.target.value);
    },
    []
  );

  // Get display text for password mode
  const getDisplayInput = useCallback(() => {
    if (isPasswordMode) {
      return "•".repeat(currentInput.length);
    }
    return currentInput;
  }, [isPasswordMode, currentInput]);

  return {
    lines,
    currentInput,
    prompt,
    isPasswordMode,
    inputRef,
    terminalRef,
    handleKeyDown,
    handleInputChange,
    focusInput,
    getDisplayInput,
  };
}
