// Terminal Caret and Input Handling

function $(elid) {
  return document.getElementById(elid);
}

var cursor;
var typer;
var textarea;

// Initialize when DOM is ready
window.onload = function() {
  init();
};

function init() {
  cursor = $("cursor");
  typer = $("typer");
  textarea = $("texter");

  if (cursor) {
    cursor.style.left = "0px";
  }
}

// Handle text input and display
function typeIt(from, e) {
  e = e || window.event;

  if (!typer || !from) return;

  var inputText = from.value;

  // Don't show password characters in normal mode
  if (!pw) {
    typer.innerHTML = sanitizeInput(inputText);
  }

  // Update cursor position
  updateCursorPosition();
}

// Handle cursor movement with arrow keys
function moveIt(count, e) {
  e = e || window.event;
  var keycode = e.keyCode || e.which;

  if (!cursor) return;

  var currentLeft = parseInt(cursor.style.left) || 0;
  var charWidth = 9; // Approximate character width in pixels
  var maxLeft = 0;
  var minLeft = -(count * charWidth);

  if (keycode === 37 && currentLeft > minLeft) { // Left arrow
    cursor.style.left = (currentLeft - charWidth) + "px";
  } else if (keycode === 39 && currentLeft < maxLeft) { // Right arrow
    cursor.style.left = (currentLeft + charWidth) + "px";
  }
}

// Update cursor position based on text length
function updateCursorPosition() {
  if (!cursor || !typer) return;

  var textWidth = getTextWidth(typer.innerHTML);
  cursor.style.left = textWidth + "px";
}

// Calculate text width (approximate)
function getTextWidth(text) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.font = '14px "Courier New", monospace';
  return context.measureText(text).width;
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Focus management
function focusTerminal() {
  if (textarea) {
    textarea.focus();
  }
}

// Enhanced alert function (replaces browser alert)
function alert(txt) {
  console.log('Terminal Alert:', txt);

  // Could be extended to show in-terminal notifications
  if (typeof addLine === 'function') {
    addLine('⚠️ ' + txt, 'color-warning', 0);
  }
}

// Keyboard event handling improvements
function handleSpecialKeys(e) {
  var keyCode = e.keyCode || e.which;

  // Ctrl+Shift+C - Copy selected text
  if (e.ctrlKey && e.shiftKey && keyCode === 67) {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      navigator.clipboard.writeText(selection.toString()).then(function() {
        console.log('📋 Text copied to clipboard');
      }).catch(function(err) {
        console.error('Failed to copy text:', err);
      });
    }
    return;
  }

  switch(keyCode) {
    case 27: // Escape
      if (textarea) textarea.value = '';
      if (typer) typer.innerHTML = '';
      break;

    case 116: // F5
      e.preventDefault();
      location.reload();
      break;

    case 123: // F12 (Developer tools)
      console.log('🚀 Welcome to Falcon 98 Terminal Developer Mode!');
      console.log('Available functions: typeIt(), moveIt(), focusTerminal()');
      break;
  }
}

// Add event listener for special keys
document.addEventListener('keydown', handleSpecialKeys);

// Auto-focus terminal on page load and click
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(focusTerminal, 100);
});

document.addEventListener('click', function(e) {
  // Only focus if not clicking on a link
  if (e.target.tagName !== 'A') {
    focusTerminal();
  }
});

// Allow right-click context menu for copying text
document.addEventListener('contextmenu', function(e) {
  // Allow default context menu for text selection (copy functionality)
  const selection = window.getSelection();
  if (selection && selection.toString().length > 0) {
    // Allow copy when text is selected
    return true;
  }
  // Otherwise focus terminal
  e.preventDefault();
  focusTerminal();
});

// Handle paste events
document.addEventListener('paste', function(e) {
  e.preventDefault();

  var paste = (e.clipboardData || window.clipboardData).getData('text');

  if (textarea && paste) {
    // Clean and limit pasted content
    paste = paste.replace(/[\r\n]/g, ' ').substring(0, 200);
    textarea.value += paste;

    if (typer) {
      typer.innerHTML = sanitizeInput(textarea.value);
    }

    updateCursorPosition();
  }
});

// Export functions for global use
window.typeIt = typeIt;
window.moveIt = moveIt;
window.focusTerminal = focusTerminal;
window.updateCursorPosition = updateCursorPosition;