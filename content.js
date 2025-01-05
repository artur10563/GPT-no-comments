document.body.addEventListener("click", async (event) => {
  if (event.target.tagName === "BUTTON" && event.target.closest("pre")) {
    const pre = event.target.closest("pre");
    await handleCopyClick(pre);
  }
});

function removeComments(text, language) {
  //  (// ...)
  const jsSingleLineCommentRegex = /\/\/.*$/gm;

  // (/* ... */)
  const jsMultiLineCommentRegex = /\/\*[\s\S]*?\*\//g;

  // (-- ...)
  const sqlSingleLineCommentRegex = /--.*$/gm;

  //  (<!-- ... -->)
  const htmlCommentRegex = /<!--[\s\S]*?-->/g;

  // (# ...)
  const pythonSingleLineCommentRegex = /^\s*#.*$/gm;

  // (''' ... ''')
  const pythonMultiLineCommentRegex1 = /'''[\s\S]*?'''/g;

  // ( """ ... """)
  const pythonMultiLineCommentRegex2 = /"""[\s\S]*?"""/g;

  switch (language) {
    case "csharp":
    case "javascript":
    case "typescript":
    case "css":
      text = text.replace(jsSingleLineCommentRegex, "");
      text = text.replace(jsMultiLineCommentRegex, "");
      break;

    case "sql":
      text = text.replace(sqlSingleLineCommentRegex, "");
      break;

    case "html":
      text = text.replace(htmlCommentRegex, "");
      break;

    case "python":
      text = text.replace(pythonSingleLineCommentRegex, "");
      text = text.replace(pythonMultiLineCommentRegex1, "");
      text = text.replace(pythonMultiLineCommentRegex2, "");
      break;

    default:
      console.log("Unsupported language:", language);
      break;
  }

  text = text.trim();
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
