let selectionText = "";
const bodyDOM = document.querySelector("body");
const japaneseRegex = /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uffef]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/g;

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

function renderButtonTranslator(selectionTextRange, selectionText) {
  const buttonWrapper = document.createElement("div");
  buttonWrapper.id = "kanji-to-furigana";
  const buttonIcon = document.createElement("div");
  buttonIcon.classList.add("translator-ext-icon");
  buttonIcon.innerHTML = `<svg width="20px" height="20px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><g fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)"><path d="m16.5 8.5v-6c0-1.1045695-.8954305-2-2-2h-6c-1.1045695 0-2 .8954305-2 2v6c0 1.1045695.8954305 2 2 2h6c1.1045695 0 2-.8954305 2-2z"/><path d="m4.5 6.50344846h-2.00001427c-1.1045695 0-2 .8954305-2 2v5.99943324c0 1.1045695.8954305 2 2 2h.00345627l6.00001428-.0103718c1.10321833-.0019065 1.99654372-.8967771 1.99654372-1.999997v-1.9925129"/><g transform="translate(2.502 9.5)"><path d="m2.998 1.003h-3"/><path d="m4.49841597 2.5c-.33333333.33333333-.66666667.66666667-1 1s-1.16666667.83333333-2.5 1.5"/><path d="m.99841597 1.00316806c.33333333 1.16613866.83333333 1.99894398 1.5 2.49841597s1.5.99894398 2.5 1.49841597"/></g><g transform="translate(8.5 2.5)"><path d="m3 0-3 6"/><path d="m3 0 3 6"/><path d="m3 2v4" transform="matrix(0 1 -1 0 7 1)"/></g></g></svg>`;
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
  if (buttonWrapper) {
    buttonWrapper.addEventListener("click", async () => {
      if (selectionText.length > 0) {
        const result = await fetch(
          `http://localhost:3000/api/v1/search/${selectionText}`
        );
        result.json().then((json) => {
          renderButtonResultTranslator(
            selectionTextRange,
            selectionText,
            json["tratu"][0]["fields"]
          );
          buttonWrapper.remove();
          buttonIcon.remove();
          handlingTabs();
        });
      }
    });
  }
}

function renderButtonResultTranslator(
  selectionTextRange,
  selectionText,
  result
) {
  const buttonResult = document.createElement("div");
  buttonResult.id = "kanji-to-furigana-result";
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("translator-result-ext-container");
  const dumpElement = document.createElement("div");
  dumpElement.innerHTML = result["fulltext"];
  wordSpell = dumpElement.getElementsByClassName("pw")[0].innerHTML;
  wordMeanings = Array.from(dumpElement.getElementsByClassName("fw")).map((e) =>
    e.innerHTML[0] == "▪" ? e.innerHTML.slice(1) : e.innerHTML
  );
  let chinese_vietnamese_meaning, kunyomi_reading, onyomi_reading, componentElement, meanings;
  let component = '';
  meanings = Array.from(dumpElement.querySelectorAll("div.mdl"));
  kanjiMeanings = Array.from(dumpElement.getElementsByClassName("mdl"));
  chinese_vietnamese_meaning = kanjiMeanings[0].innerHTML;
  let kanji = chinese_vietnamese_meaning.match(japaneseRegex)[0];
  kunyomi_reading = kanjiMeanings[1].innerHTML;
  onyomi_reading = kanjiMeanings[2].innerHTML;
  componentElement = dumpElement.getElementsByClassName("kc")[0];
  let parentElement = kanjiMeanings[0].parentNode;
  if(parentElement && componentElement && parentElement.contains(componentElement)){
    component = componentElement.innerHTML;
  }
  buttonContainer.innerHTML = `
  <div class="popup_rect">
  <div id="popup_tabs">
    <div class="popup_tab_type">
      <div id="tab_vocabulary" data-tab="vocabulary" class="tab_type tab_vocabulary tab_active"> Từ vựng </div>
      <div id="tab_kanji" data-tab="kanji" class="tab_type tab_kanji"> Kanji</div>
    </div>
    <div class="selection_bubble_vocabulary" id="selection_bubble_vocabulary"> <span id="selection_bubble_close"
        align="right" alt="Đóng"></span> </div>
    <div id="vocabulary" class="selection_bubble_content active">
      <div id="dic_bubble_synonyms">
        <div class="vocabulary_detail_content_pl">
          <div class="vocabulary_entry">
            <div class="vocabulary_searched_pl">${result["word"]}</div>
            <div class="chinese_vietnamese_phonetic"></div>
            <div class="vocabulary_search_phonetic">${wordSpell}</div>
            <div class="vocabulary_mean_group">
              ${wordMeanings
              .map((word) => {
              return `<div class="vocabulary_meaning">${word}</div>`;
              })
              .join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="kanji" class="selection_bubble_content">
      <div id="dic_bubble_synonyms">
        <div class="vocabulary_detail_content_pl">
          <div class="kanji_entry">
            ${result["word"]
            .split("")
            .map((kanji, i) => {
            if (i == 0)
            return `<div class="kanji_searched_pl active">${kanji}</div>`;
            return `<div class="kanji_searched_pl">${kanji}</div>`;
            })
            .join("")}
          </div>
          <div class="kanji_content">
            <div id="draw"></div>
            <div class="kanji_chinese_vietnamese_meaning">${chinese_vietnamese_meaning.split(kanji)[1].slice(3)}</div>
            <div class="kunyomi">Kun(訓): ${kunyomi_reading}</div>
            <div class="onyomi">On(音): ${onyomi_reading}</div>
            <div class="component">Bộ: ${component}</div>
            <div class="vocabulary_mean_group">Nghĩa:
              ${meanings
              .map((meaning) => {
              return `<div class="vocabulary_meaning">${meaning.innerHTML}</div>`;
              }).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  var dmak = new Dmak(kanji, {
    'element' : "draw"
  });
  buttonResult.appendChild(buttonContainer);
  const top = selectionTextRange.top - selectionTextRange.height - 6 + "px";
  const left =
    selectionTextRange.left +
    (selectionTextRange.width / 2 - buttonResult.offsetWidth / 2) +
    "px";
  buttonResult.style.position = "absolute";
  buttonResult.style.cursor = "pointer";
  buttonResult.style.padding = "4px";
  buttonResult.style.top = top;
  buttonResult.style.left = left;
  bodyDOM.appendChild(buttonResult);
}
function handlingTabs() {
  (tabs = document.querySelector(".popup_tab_type")),
    (tab = document.querySelectorAll("div.kanji_searched_pl")),
    (contents = document.querySelectorAll(".selection_bubble_content"));
  tabs.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName === "DIV") {
      for (var i = 0; i < tab.length; i++) {
        tab[i].classList.remove("tab_active");
      }
      e.target.classList.toggle("tab_active");
      for (i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
      }
      var tabId = e.target.dataset.tab;
      document.getElementById(tabId).classList.toggle("active");
    }
  });
}

function handlingMultipleKanjis() {
  (tabs = document.querySelector(".kanji_entry")),
    (tab = document.querySelectorAll("div.tab_type")),
    (contents = document.querySelectorAll(".selection_bubble_content"));
  tabs.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName === "DIV") {
      for (var i = 0; i < tab.length; i++) {
        tab[i].classList.remove("tab_active");
      }
      e.target.classList.toggle("tab_active");
      for (i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
      }
      var tabId = e.target.dataset.tab;
      document.getElementById(tabId).classList.toggle("active");
    }
  });
}

bodyDOM.addEventListener("mouseup", (event) => {
  const buttonResult = document.querySelector("div#kanji-to-furigana-result");
  if (buttonResult && buttonResult.contains(event.target)) {
    return event.preventDefault();
  }
  if (buttonResult) buttonResult.remove();
  selectionText = getSelectedTextNode().toString();
  if (selectionText.length > 0) {
    const selectionTextRange = getRangeSectionText();
    renderButtonTranslator(selectionTextRange, selectionText);
  }
});
