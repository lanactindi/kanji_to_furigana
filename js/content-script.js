const bodyDOM = document.querySelector("body");

function getSelectedNode() {
  let selectedText = "";

  if (window.getSelection) {
    selectedText = window.getSelection();
  }
  else if (document.getSelection) {
    selectedText = document.getSelection();
  }
  else if (document.selection) {
    selectedText = document.selection.createRange();
  } else return "";

  return selectedText;
}

function getRangeSectionText() {
  const selectionTextNode = getSelectedNode();
  const getRange = selectionTextNode.getRangeAt(0);
  const selectionRect = getRange.getBoundingClientRect();

  return selectionRect;
}

function renderTranslateButton(selectionTextRange) {
  const buttonWrapper = document.createElement("div");
  buttonWrapper.id = "kanji-to-furigana-translator";
  const buttonIcon = document.createElement("div");
  buttonIcon.classList.add("kanji-translator-icon");
  buttonIcon.innerHTML = '<img src="favicon.png">';
  buttonWrapper.appendChild(buttonIcon);
  const top = selectionTextRange.top + selectionTextRange.height + 6 + "px";
  const left =
    selectionTextRange.left +
    (selectionTextRange.width / 2 - buttonWrapper.offsetWidth / 2) +
    "px";
  buttonWrapper.style.position = "absolute";
  buttonWrapper.style.cursor = "pointer";
  buttonWrapper.style.padding = "4px";
  buttonWrapper.style.top = top;
  buttonWrapper.style.left = left;
  bodyDOM.appendChild(buttonWrapper);
}

bodyDOM.addEventListener("mouseup", () => {
    const buttonIcon = document.querySelector(
        "div#kanji-to-furigana-translator"
      );
    if (buttonIcon) buttonIcon.remove();

    selectionText = getSelectedNode().toString();

    if (selectionText.length > 0) {
    const selectionTextRange = getRangeSectionText();

    renderTranslateButton(selectionTextRange, selectionText);

    setTimeout(() => {
        const buttonWrapper = document.querySelector(
        "div#kanji-to-furigana-translator"
        );

        if (buttonWrapper) buttonWrapper.remove();
    }, 3000);
    }
});