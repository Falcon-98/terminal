"use client";

import { useTerminal } from "@/hooks/useTerminal";
import { useCallback, useEffect } from "react";

const basePath = process.env.NODE_ENV === "production" ? "/terminal" : "";

export function Terminal() {
  const {
    lines,
    currentInput,
    prompt,
    inputRef,
    terminalRef,
    handleKeyDown,
    handleInputChange,
    focusInput,
    getDisplayInput,
  } = useTerminal();

  // Handle Ctrl+Shift+C for copy
  const handleCopy = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === "C") {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        navigator.clipboard.writeText(selection.toString()).then(() => {
          console.log("📋 Text copied to clipboard");
        }).catch((err) => {
          console.error("Failed to copy text:", err);
        });
      }
    }
  }, []);

  // Add global keyboard listener for copy
  useEffect(() => {
    window.addEventListener("keydown", handleCopy);
    return () => window.removeEventListener("keydown", handleCopy);
  }, [handleCopy]);

  // Handle context menu - allow if text is selected
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      // Allow default context menu for copying
      return;
    }
    e.preventDefault();
    focusInput();
  }, [focusInput]);

  return (
    <div className="terminal-window bg-[#161b22] border border-[#30363d] rounded-lg w-[95vw] max-w-[1400px] h-[90vh] max-h-[1000px] shadow-2xl flex flex-col overflow-hidden">
      {/* Terminal Header */}
      <div className="terminal-header bg-gradient-to-r from-[#21262d] to-[#30363d] px-4 py-3 border-b border-[#30363d] flex items-center justify-between">
        <div className="window-controls flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] cursor-pointer hover:opacity-80" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] cursor-pointer hover:opacity-80" />
          <div className="w-3 h-3 rounded-full bg-[#27ca3f] cursor-pointer hover:opacity-80" />
        </div>
        <div className="terminal-title text-[#f0f6fc] text-sm font-medium">
          falcon98@terminal: ~
        </div>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {/* Logo Section */}
      <div className="logo-section text-center py-2 border-b border-[#30363d]">
        <a
          href="https://falcon98.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/logo.png`}
            alt="Falcon 98 Logo"
            width={60}
            height={60}
            className="opacity-80 hover:opacity-100 transition-opacity mx-auto"
          />
        </a>
        <h1 className="text-[#58a6ff] text-sm font-normal mt-1">
          Falcon 98 Terminal
        </h1>
        <div className="text-[#7d8590] text-xs">
          Web-based interactive terminal interface
        </div>
      </div>

      {/* Mobile Message */}
      <div className="mobile-message hidden max-[600px]:block text-center p-5 text-[#ffa657]">
        <p>⚠️ This terminal interface works best on desktop or tablet devices.</p>
        <p className="mt-2">Please use a larger screen for the optimal experience.</p>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="terminal-content flex-1 p-4 overflow-y-auto bg-[#0d1117] text-base leading-relaxed max-[600px]:hidden"
        onClick={focusInput}
        onContextMenu={handleContextMenu}
      >
        {/* Terminal Output */}
        <div id="terminal" className="min-h-full">
          {lines.map((line) => (
            <div
              key={line.id}
              className={`terminal-line my-0.5 whitespace-pre-wrap break-words ${line.className}`}
              dangerouslySetInnerHTML={{ __html: line.content }}
            />
          ))}
        </div>

        {/* Command Input Area */}
        <div className="input-area flex items-center mt-2 relative">
          <span className="prompt text-[#7ee787] mr-2 font-bold">{prompt}</span>
          <div className="relative flex-1">
            <span className="text-[#f0f6fc]">{getDisplayInput()}</span>
            <span className="cursor bg-[#58a6ff] text-[#0d1117] px-px animate-blink">
              █
            </span>
          </div>
          <textarea
            ref={inputRef}
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="absolute -left-[9999px] opacity-0"
            aria-label="Terminal command input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
