# AI Summary for Articles - Chrome Extension

A powerful Chrome extension that uses Google's Gemini AI to generate intelligent summaries of web articles and content. Get instant summaries in multiple formats with just one click.

## ✨ Features

- **Multiple Summary Types**: Choose from three different summary formats
  - **Brief**: Quick 2-3 sentence overview
  - **Detailed**: Comprehensive summary covering all main points
  - **Bullet Points**: Key takeaways in 5-7 bullet format
  
- **One-Click Summarization**: Instantly summarize any article or web page
- **Copy to Clipboard**: Easy copying of generated summaries
- **Smart Content Extraction**: Automatically extracts article text from web pages
- **Powered by Gemini AI**: Uses Google's Gemini 1.5 Flash model for high-quality summaries

## 📋 Prerequisites

- Google Chrome browser (or any Chromium-based browser)
- A Gemini API key from Google AI Studio

## 🚀 Installation

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key (you'll need it in Step 3)

### Step 2: Install the Extension

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked"
5. Select the folder containing the extension files
6. The extension icon should now appear in your Chrome toolbar

### Step 3: Configure Your API Key

1. Click the extension icon in your toolbar
2. Right-click and select "Options" (or access via Chrome's extension settings)
3. Paste your Gemini API key in the input field
4. Click "Save Settings"
5. You're ready to start summarizing!

## 💡 Usage

1. **Navigate to any article or web page** you want to summarize
2. **Click the extension icon** in your Chrome toolbar
3. **Select a summary type** from the dropdown:
   - Brief Summary
   - Detailed Summary
   - Bullet Points
4. **Click "Summarize This Page"** button
5. Wait a few seconds for the AI to generate your summary
6. **Copy the summary** using the "Copy Summary" button if needed

## 📁 Project Structure

```
Chrome-Extension-Summarizer/
├── manifest.json          # Extension configuration and permissions
├── popup.html            # Main popup interface
├── popup.js              # Popup logic and API interaction
├── content.js            # Content script for extracting page text
├── options.html          # Settings page for API key
├── option.js             # Settings page logic
├── background.js         # Background service worker
├── icon.png              # Extension icon
└── README.md             # Documentation
```

## 🔧 Technical Details

### Permissions

The extension requires the following permissions:
- `scripting`: To inject content scripts and extract page text
- `activeTab`: To access the current tab's content
- `storage`: To securely store your API key
- `host_permissions`: To access web pages

### API Integration

- **Model**: Gemini 1.5 Flash
- **API Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`
- **Temperature**: 0.2 (for consistent, focused summaries)
- **Text Limit**: 5000 characters (automatically truncated if longer)

### Content Extraction

The extension uses two methods to extract article text:
1. Searches for `<article>` tags first (semantic HTML)
2. Falls back to collecting all `<p>` paragraph elements

## 🛠️ Development

### Modifying the Extension

1. Make your changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

### Customization Options

You can customize:
- Summary prompts in `popup.js` (lines 96-108)
- UI styling in `popup.html` and `options.html`
- Content extraction logic in `content.js`
- Text length limit (currently 5000 characters in `popup.js`)

## ⚠️ Troubleshooting

### "API key not found" error
- Make sure you've saved your API key in the extension options
- Try removing and re-entering your API key

### "Could not extract article text" error
- The page may not contain article content or proper HTML structure
- Try a different page or website

### Extension not working
1. Check that Developer mode is enabled
2. Reload the extension from `chrome://extensions/`
3. Check the browser console for error messages (F12)
4. Ensure your API key is valid and has not exceeded quota

### Slow summarization
- Large articles take longer to process
- Check your internet connection
- The Gemini API may be experiencing high load

## 🔒 Privacy & Security

- Your API key is stored locally in Chrome's secure storage
- Article text is sent to Google's Gemini API for processing
- No data is stored or tracked by this extension
- Review [Google's Gemini API Terms](https://ai.google.dev/terms) for API usage policies

## 📝 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 🙏 Acknowledgments

- Powered by Google's Gemini AI
- Built with Chrome Extension Manifest V3
- Uses the Gemini 1.5 Flash model for fast, efficient summaries

## 📧 Support

If you encounter any issues or have questions:
1. Check the Troubleshooting section above
2. Review your browser's console for error messages
3. Ensure your Gemini API key is valid and active
4. Verify you have an active internet connection

---

**Happy Summarizing! 📚✨**

# Chrome-Extention-summarizer
<img width="1288" alt="Screenshot 2025-05-18 at 12 16 55 AM" src="https://github.com/user-attachments/assets/2e1ae8a4-dd1e-4a7a-b7ce-719318376679" />
