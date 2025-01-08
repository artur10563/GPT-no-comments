document.body.addEventListener("click", async (event) => {
  if (event.target.tagName === "BUTTON" && event.target.closest("pre")) {
    const pre = event.target.closest("pre");
    await handleCopyClick(pre);
  }
});

document.addEventListener("copy", async (event) => {
  const selection = window.getSelection();
  if (selection && selection.toString()) {
    const selectedText = selection.toString();
    let pre = null;

    // Traverse up the DOM tree if the anchorNode is a Text node
    if (
      selection.anchorNode &&
      selection.anchorNode.nodeType === Node.TEXT_NODE
    ) {
      pre = selection.anchorNode.parentElement.closest("pre");
    }

    if (pre) {
      const languageDiv = pre.querySelector(`.text-token-text-secondary`);
      if (!languageDiv) {
        console.error("Language information is missing.");
        return;
      }

      const language = languageDiv.textContent.trim().toLowerCase();
      const cleanedText = removeComments(selectedText, language);

      event.preventDefault();

      event.clipboardData.setData("text/plain", cleanedText);

      console.log("Text cleaned and copied successfully.");
    }
  }
});

function removeComments(text, language) {
  const commentPatterns = {
    csharp: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    javascript: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    typescript: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    css: [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
    sql: [/--.*$/gm],
    html: [/<!--[\s\S]*?-->/g],
    python: [/^\s*#.*$/gm, /'''[\s\S]*?'''/g, /"""[\s\S]*?"""/g],
  };

  const patterns = commentPatterns[language];

  if (patterns) {
    patterns.forEach((regex) => {
      text = text.replace(regex, "");
    });
  } else {
    console.log("Unsupported language:", language);
  }

  text = text.trim();
  text = text.replace(/\n\s*\n/g, "\n");
  return text;
}

async function handleCopyClick(pre) {
  setTimeout(async () => {
    try {
      const languageDiv = pre.querySelector(`.text-token-text-secondary`);
      if (!languageDiv) {
        console.error("Language information is missing.");
        return;
      }

      const language = languageDiv.textContent.trim().toLowerCase();
      const clipboardText = await navigator.clipboard.readText();
      const cleanedText = removeComments(clipboardText, language);
      await navigator.clipboard.writeText(cleanedText);

      console.log("Text cleaned and copied successfully.");
    } catch (error) {
      console.error("Failed to clean and copy text:", error);
    }
  }, 100);
}
