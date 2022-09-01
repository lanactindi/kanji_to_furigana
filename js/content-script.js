let selectionText = "";

const bodyDOM = document.querySelector("body");

function getSelectedTextNode() {
  let selectedText = "";

  if (window.getSelection) {
    selectedText = window.getSelection();
  } else if (document.getSelection) {
    selectedText = document.getSelection();
  } else return "";
  return selectedText;
}

function getRangeSectionText() {
  const selectionTextNode = getSelectedTextNode();
  const getRange = selectionTextNode.getRangeAt(0);
  const selectionRect = getRange.getBoundingClientRect();
  return selectionRect;
}

function renderbuttonTranslator(selectionTextRange, selectionText) {
  const buttonWrapper = document.createElement("div");
  buttonWrapper.id = "kanji-to-furigana";
  const buttonIcon = document.createElement("div");
  buttonIcon.classList.add("kanji-translator-icon");
  buttonIcon.innerHTML =
    '<img src="chrome-extension://gckkkddkkdpaopiojcknljfbbnilooen/kanjitofurigana.svg"/>';
  buttonWrapper.appendChild(buttonIcon);
  const top = selectionTextRange.top + selectionTextRange.height + 6 + "px";
  const left =
    selectionTextRange.left +
    (selectionTextRange.width / 2 - buttonWrapper.offsetWidth / 2) +
    "px";
  buttonWrapper.style.position = "absolute";
  buttonWrapper.style.background = "green";
  buttonWrapper.style.cursor = "pointer";
  buttonWrapper.style.padding = "4px";
  buttonWrapper.style.top = top;
  buttonWrapper.style.left = left;
  bodyDOM.appendChild(buttonWrapper);
}

function renderbuttonResultTranslator(
  selectionTextRange,
  selectionText,
  selectionTextTranslated
) {
  const buttonWrapper = document.createElement("div");
  buttonWrapper.id = "translator-result-ext-rhpteam";
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("translator-result-ext-container");
  buttonContainer.innerHTML = chrome.runtime.getURL("popup.html");
  buttonWrapper.appendChild(buttonContainer);
  const top = selectionTextRange.top - selectionTextRange.height - 6 + "px";
  const left =
    selectionTextRange.left +
    (selectionTextRange.width / 2 - buttonWrapper.offsetWidth / 2) +
    "px";
  buttonWrapper.style.position = "absolute";
  buttonWrapper.style.background = "white";
  buttonWrapper.style.cursor = "pointer";
  buttonWrapper.style.padding = "4px";
  buttonWrapper.style.top = top;
  buttonWrapper.style.left = left;
  bodyDOM.appendChild(buttonWrapper);
}

bodyDOM.addEventListener("mouseup", () => {
  const buttonResult = document.querySelector(
    "div#translator-result-ext-rhpteam"
  );
  if (buttonResult) buttonResult.remove();

  selectionText = getSelectedTextNode().toString();

  if (selectionText.length > 0) {
    const selectionTextRange = getRangeSectionText();
    renderbuttonTranslator(selectionTextRange, selectionText);
    setTimeout(() => {
      const buttonWrapper = document.querySelector("div#kanji-to-furigana");
      if (buttonWrapper) buttonWrapper.remove();
    }, 3000);
  }
});
