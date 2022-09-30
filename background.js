chrome.contextMenus.create({
  id: 'KanjiToFurigana',
  title: 'Translate %s to Hiragana',
  contexts: ['selection'],
});

chrome.contextMenus.onClicked.addListener(async (clickData) => {
  if (clickData.menuItemId === 'KanjiToFurigana' && clickData.selectionText) {
    const result = await fetch(
      `https://kanjitofurigana.tk/api/furigana/${clickData.selectionText}`,
    );
    result.json().then((json) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { content: json.translated, selectionText: clickData.selectionText },
        );
      });
    });
  }
});
