document.addEventListener("DOMContentLoaded", () => {
  const summarizeBtn = document.getElementById("summarize");
  const copyBtn = document.getElementById("copy-btn");
  const resultDiv = document.getElementById("result");

  summarizeBtn.addEventListener("click", async () => {
    resultDiv.innerHTML =
      '<div class="loading"><div class="loader"></div></div>';
    const summaryType = document.getElementById("summary-type").value;

    chrome.storage.sync.get(["geminiApiKey"], async (result) => {
      const apiKey = result.geminiApiKey;
      if (!apiKey) {
        resultDiv.innerHTML =
          "API key not found. Please set your API key in the extension options.";
        return;
      }

      chrome.tabs.query(
        { active: true, currentWindow: true },
        async ([tab]) => {
          if (!tab) {
            resultDiv.innerText = "No active tab found.";
            return;
          }

          try {
            chrome.tabs.sendMessage(
              tab.id,
              { type: "GET_ARTICLE_TEXT" },
              async (res) => {
                if (chrome.runtime.lastError || !res || !res.text) {
                  console.warn(
                    "Content script might not be loaded. Injecting manually..."
                  );
                  chrome.scripting.executeScript(
                    {
                      target: { tabId: tab.id },
                      files: ["content.js"],
                    },
                    () => {
                      chrome.tabs.sendMessage(
                        tab.id,
                        { type: "GET_ARTICLE_TEXT" },
                        async (res2) => {
                          if (!res2 || !res2.text) {
                            resultDiv.innerText =
                              "Could not extract article text from this page.";
                            return;
                          }
                          await handleSummary(
                            res2.text,
                            summaryType,
                            apiKey,
                            resultDiv
                          );
                        }
                      );
                    }
                  );
                } else {
                  await handleSummary(res.text, summaryType, apiKey, resultDiv);
                }
              }
            );
          } catch (err) {
            console.error("Unexpected error:", err);
            resultDiv.innerText = "An error occurred. Please try again.";
          }
        }
      );
    });
  });

  copyBtn.addEventListener("click", () => {
    const summaryText = resultDiv.innerText;
    if (summaryText && summaryText.trim() !== "") {
      navigator.clipboard
        .writeText(summaryText)
        .then(() => {
          copyBtn.innerText = "Copied!";
          setTimeout(() => (copyBtn.innerText = "Copy Summary"), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  });
});

async function handleSummary(text, summaryType, apiKey, resultDiv) {
  const truncatedText =
    text.length > 5000 ? text.substring(0, 5000) + "..." : text;
  let prompt;

  switch (summaryType) {
    case "brief":
      prompt = `Provide a brief summary of the following article in 2-3 sentences:\n\n${truncatedText}`;
      break;
    case "detailed":
      prompt = `Provide a detailed summary of the following article, covering all main points and key details:\n\n${truncatedText}`;
      break;
    case "bullets":
      prompt = `Summarize the following article in 5-7 key points. Format each point as a line starting with "- ":\n\n${truncatedText}`;
      break;
    default:
      prompt = `Summarize the following article:\n\n${truncatedText}`;
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2 },
        }),
      }
    );

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error?.message || "API request failed");
    }

    const data = await res.json();
    resultDiv.innerText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary available.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    resultDiv.innerText = "Failed to generate summary. Please try again later.";
  }
}
