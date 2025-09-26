// Terminal Elements
var before = document.getElementById("before");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");
var cursor = document.getElementById("cursor");

// Terminal State
var git = 0;
var pw = false;
var pwd = false;
var commands = [];
var isInitialized = false;

// Initialize terminal
function initTerminal() {
  if (isInitialized) return;
  isInitialized = true;

  // Input event for real-time typing feedback
  if (textarea) {
    textarea.addEventListener("input", function() {
      if (!pw) {
        command.innerHTML = textarea.value;
        updateCursor();
      }
    });
  }

  setTimeout(function() {
    displayBanner();
    textarea.focus();
    updateCursor();
  }, 500);
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTerminal);
} else {
  initTerminal();
}

// Event listeners
window.addEventListener("keyup", handleKeyPress);
window.addEventListener("keydown", function(e) {
  // Prevent default for special keys
  if (e.keyCode === 9) { // Tab
    e.preventDefault();
  }
});

document.addEventListener("click", function() {
  textarea.focus();
});

// Console easter egg
console.log(
  "%c🚀 Welcome to Falcon 98 Terminal!",
  "color: #58a6ff; font-weight: bold; font-size: 16px;"
);
console.log(
  "%cType 'help' to get started. Password hint: " + password,
  "color: #7d8590; font-size: 12px;"
);

// Initialize
textarea.value = "";
command.innerHTML = "";

function handleKeyPress(e) {
  // F5 to refresh
  if (e.keyCode === 116) {
    document.location.reload(true);
    return;
  }

  if (pw) {
    handlePasswordMode(e);
  } else {
    handleCommandMode(e);
  }

  updateCursor();
}

function handlePasswordMode(e) {
  let et = "•";
  let w = textarea.value.length;
  command.innerHTML = et.repeat(w);

  if (textarea.value === password) {
    pwd = true;
  }

  if (pwd && e.keyCode === 13) {
    displayLines(secret, "color-success", 80);
    clearInput();
    exitPasswordMode();
  } else if (e.keyCode === 13) {
    addLine("❌ Access denied. Wrong password.", "color-error", 0);
    clearInput();
    exitPasswordMode();
  }
}

function handleCommandMode(e) {
  if (e.keyCode === 13) { // Enter
    executeCommand();
  } else if (e.keyCode === 38 && git > 0) { // Up arrow
    git--;
    loadCommand(commands[git]);
  } else if (e.keyCode === 40 && git < commands.length) { // Down arrow
    git++;
    loadCommand(commands[git] || "");
  } else if (e.keyCode === 9) { // Tab
    e.preventDefault();
    handleTabCompletion();
  } else {
    // Update command display for regular typing
    setTimeout(function() {
      command.innerHTML = textarea.value;
      updateCursor();
    }, 10);
  }
}

function executeCommand() {
  const cmd = command.innerHTML.trim();
  commands.push(cmd);
  git = commands.length;

  addLine(`visitor@falcon98:~$ ${cmd}`, "color-secondary", 0);
  processCommand(cmd.toLowerCase());
  clearInput();
}

function loadCommand(cmd) {
  textarea.value = cmd;
  command.innerHTML = cmd;
}

function clearInput() {
  command.innerHTML = "";
  textarea.value = "";
}

function exitPasswordMode() {
  pw = false;
  pwd = false;
  document.getElementById("prompt").innerHTML = "visitor@falcon98:~$";
}

function updateCursor() {
  const commandWidth = command.getBoundingClientRect().width;
  cursor.style.left = commandWidth + "px";
}

function processCommand(cmd) {
  // Remove extra spaces
  cmd = cmd.replace(/\s+/g, " ").trim();

  switch (cmd) {
    case "help":
      displayLines(help, "color-primary", 60);
      break;
    case "help --all":
    case "help -a":
      displayLines([...help, ...advancedHelp], "color-primary", 60);
      break;
    case "whois":
      displayLines(whois, "color-white", 60);
      break;
    case "whoami":
      displayLines(whoami, "color-cyan", 60);
      break;
    case "about":
    case "info":
      displayLines(about, "color-primary", 60);
      break;
    case "skills":
    case "tech":
      displayLines(skills, "color-warning", 60);
      break;
    case "experience":
    case "exp":
      displayLines(experience, "color-success", 60);
      break;
    case "education":
    case "edu":
      displayLines(education, "color-cyan", 60);
      break;
    case "leadership":
    case "achievements":
      displayLines(leadership, "color-warning", 60);
      break;
    case "projects":
    case "portfolio":
      displayLines(projects, "color-primary", 60);
      break;
    case "social":
    case "links":
      displayLines(social, "color-primary", 60);
      break;
    case "contact":
    case "reach":
      displayLines(contact, "color-success", 60);
      break;
    case "secret":
    case "sudo":
      enterPasswordMode();
      break;
    case "history":
      displayCommandHistory();
      break;
    case "clear":
    case "cls":
      clearTerminal();
      break;
    case "banner":
    case "logo":
      displayBanner();
      break;
    case "date":
      addLine(new Date().toString(), "color-white", 0);
      break;
    case "whoami --system":
      addLine("System: " + navigator.userAgent, "color-secondary", 0);
      break;
    case "pwd":
      addLine("/home/visitor", "color-white", 0);
      break;
    case "ls":
    case "dir":
      displayLines(["projects/", "documents/", "contact.txt", "resume.pdf"], "color-primary", 40);
      break;
    case "neofetch":
      displaySystemInfo();
      break;
    case "matrix":
      startMatrix();
      break;
    case "github":
      addLine("🔗 Opening GitHub profile...", "color-success", 0);
      openLink(github);
      break;
    case "linkedin":
      addLine("🔗 Opening LinkedIn profile...", "color-success", 0);
      openLink(linkedin);
      break;
    case "website":
    case "site":
      addLine("🔗 Opening website...", "color-success", 0);
      openLink(website);
      break;
    case "email":
    case "mail":
      addLine("📧 Opening email client...", "color-success", 0);
      openLink(email);
      break;
    case "youtube":
    case "video":
      if (youtube === "#") {
        addLine("📺 YouTube channel coming soon!", "color-warning", 0);
      } else {
        addLine("🔗 Opening YouTube channel...", "color-success", 0);
        openLink(youtube);
      }
      break;
    case "twitter":
      if (twitter === "#") {
        addLine("🐦 Twitter profile coming soon!", "color-warning", 0);
      } else {
        addLine("🔗 Opening Twitter profile...", "color-success", 0);
        openLink(twitter);
      }
      break;
    case "instagram":
      addLine("🔗 Opening Instagram profile...", "color-success", 0);
      openLink(instagram);
      break;
    case "qr":
    case "qrcode":
      addLine("🔗 Opening QR Code Generator...", "color-success", 0);
      openLink(qr);
      break;
    case "ping falcon98.com":
      simulatePing();
      break;
    case "echo hello":
      addLine("hello", "color-white", 0);
      break;
    case "uname":
      addLine("Falcon98OS 1.0.0", "color-white", 0);
      break;
    case "uptime":
      const uptime = Math.floor(performance.now() / 1000);
      addLine(`up ${Math.floor(uptime/3600)}:${Math.floor((uptime%3600)/60).toString().padStart(2,'0')}`, "color-white", 0);
      break;
    case "":
      break;
    default:
      if (cmd.startsWith("echo ")) {
        addLine(cmd.substring(5), "color-white", 0);
      } else if (cmd.startsWith("man ")) {
        showManPage(cmd.substring(4));
      } else {
        addLine(`❌ Command not found: ${cmd}`, "color-error", 0);
        addLine(`💡 Type 'help' for available commands`, "color-secondary", 0);
      }
      break;
  }
}

function enterPasswordMode() {
  pw = true;
  document.getElementById("prompt").innerHTML = "Password:";
  addLine("🔐 Enter the secret password:", "color-warning", 0);
}

function displayCommandHistory() {
  addLine("", "", 0);
  commands.forEach((cmd, index) => {
    addLine(`${index + 1}  ${cmd}`, "color-secondary", 20);
  });
  addLine("", "", 0);
}

function clearTerminal() {
  setTimeout(function() {
    terminal.innerHTML = '<div id="before"></div>';
    before = document.getElementById("before");
  }, 50);
}

function displayBanner() {
  displayLines(banner, "color-primary", 40);
}

function displaySystemInfo() {
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
    "│ Memory: " + (performance.memory ? Math.round(performance.memory.usedJSHeapSize/1024/1024) + "MB" : "Unknown") + "               │",
    "│ Uptime: " + Math.floor(performance.now()/1000) + "s                 │",
    "╰─────────────────────────────╯",
    ""
  ];
  displayLines(info, "color-cyan", 30);
}

function simulatePing() {
  addLine("PING falcon98.com (185.199.108.153): 56 data bytes", "color-white", 0);
  const delays = [23, 19, 31, 27, 22];
  delays.forEach((delay, i) => {
    setTimeout(() => {
      addLine(`64 bytes from falcon98.com: icmp_seq=${i+1} time=${delay}ms`, "color-success", 0);
      if (i === delays.length - 1) {
        setTimeout(() => {
          addLine("--- falcon98.com ping statistics ---", "color-white", 0);
          addLine("5 packets transmitted, 5 received, 0% packet loss", "color-success", 0);
        }, 200);
      }
    }, i * 1000);
  });
}

function startMatrix() {
  addLine("Entering the Matrix...", "color-success", 0);
  const matrixChars = "01";
  for(let i = 0; i < 10; i++) {
    setTimeout(() => {
      let line = "";
      for(let j = 0; j < 80; j++) {
        line += matrixChars[Math.floor(Math.random() * 2)];
      }
      addLine(line, "color-success", 0);
    }, i * 100);
  }
  setTimeout(() => {
    addLine("Welcome to the real world, Neo.", "color-white", 0);
  }, 1500);
}

function showManPage(command) {
  const manPages = {
    help: ["HELP(1)", "", "NAME", "    help - display available commands", "", "DESCRIPTION", "    Shows list of available terminal commands"],
    clear: ["CLEAR(1)", "", "NAME", "    clear - clear terminal screen", "", "DESCRIPTION", "    Clears the terminal display"],
    history: ["HISTORY(1)", "", "NAME", "    history - display command history", "", "DESCRIPTION", "    Shows previously executed commands"]
  };

  if (manPages[command]) {
    displayLines(manPages[command], "color-white", 40);
  } else {
    addLine(`No manual entry for ${command}`, "color-error", 0);
  }
}

function handleTabCompletion() {
  const currentInput = textarea.value;
  const availableCommands = [
    "help", "whois", "whoami", "about", "skills", "experience", "education",
    "leadership", "projects", "social", "contact", "clear", "history", "banner",
    "github", "linkedin", "website", "email", "date", "pwd", "ls", "neofetch", "matrix"
  ];

  const matches = availableCommands.filter(cmd => cmd.startsWith(currentInput));
  if (matches.length === 1) {
    textarea.value = matches[0];
    command.innerHTML = matches[0];
  } else if (matches.length > 1) {
    addLine(`Possible completions: ${matches.join(", ")}`, "color-secondary", 0);
  }
}

function openLink(url) {
  setTimeout(function() {
    try {
      if (url && url !== "#") {
        window.open(url, "_blank");
      } else {
        addLine("🚫 Link not available yet", "color-error", 0);
      }
    } catch (error) {
      addLine("❌ Error opening link", "color-error", 0);
      console.error("Error opening link:", error);
    }
  }, 300);
}

function addLine(text, className, delay) {
  setTimeout(function() {
    const line = document.createElement("div");
    line.className = `terminal-line ${className}`;
    line.innerHTML = text;
    before.parentNode.insertBefore(line, before);
    terminal.scrollTop = terminal.scrollHeight;
  }, delay);
}

function displayLines(lines, className, delay) {
  lines.forEach(function(line, index) {
    addLine(line, className, index * delay);
  });
}