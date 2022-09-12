let selectionText = "";
let resultVocabulary = "";
const bodyDOM = document.querySelector("body");
const japaneseRegex =
  /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uffef]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/g;
let globalLanguage = '';
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
  buttonWrapper.style.background = "blue";
  buttonWrapper.style.cursor = "pointer";
  buttonWrapper.style.padding = "4px";
  buttonWrapper.style.top = top;
  buttonWrapper.style.left = left;
  bodyDOM.appendChild(buttonWrapper);
  if (buttonWrapper) {
    buttonWrapper.addEventListener("click", async () => {
      if (selectionText.length > 0) {
        const result = await fetch(
          `http://localhost:3000/api/v1/words/${selectionText}/vietnamese`
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
          handlingMultipleKanjis(json["tratu"][0]["fields"]["word"]);
          handlingComment();
        });
      }
    });
  }
}

function renderButtonResultTranslator(
  selectionTextRange,
  selectionText,
  result,
  language = "jv"
) {
  globalLanguage = "jv";
  const buttonResult = document.createElement("div");
  buttonResult.id = "kanji-to-furigana-result";
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("translator-result-ext-container");
  const dumpElement = document.createElement("div");
  dumpElement.innerHTML = result["fulltext"];
  wordSpell = dumpElement.getElementsByClassName("pw")[0].innerHTML;
  const vocabulary = result["word"];
  resultVocabulary = vocabulary;
  const vocabularyElement = dumpElement.querySelector(`#${language}`);
  buttonContainer.innerHTML = `
  <meta name="google-signin-client_id" content="452813366788-67158ct37naeftogqtqchvb5kc6njfql.apps.googleusercontent.com">
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
              <div class="vocabulary_searched_pl">${vocabulary}</div>
              <div class="chinese_vietnamese_phonetic"></div>
              <div class="vocabulary_search_phonetic">${wordSpell}</div>
              <div id="vocabulary_mean_group" class="vocabulary_mean_group">
                ${renderVocabularyMeanings(vocabularyElement)}
              </div>
            </div>
          </div>
        </div>
        <button id="vocabulary_comment" class="active">Bình luận</button>
      </div>
      <div id="kanji" class="selection_bubble_content">
        <div id="dic_bubble_synonyms">
          <div class="vocabulary_detail_content_pl">
            <div class="kanji_entry">
              ${result["word"]
                .split("")
                .map((kanji, i) => {
                  if (i == 0)
                    return `<div data-tab="${kanji}" class="kanji_searched_pl active">${kanji}</div>`;
                  return `<div data-tab="${kanji}" class="kanji_searched_pl">${kanji}</div>`;
                })
                .join("")}
            </div>
            <div id="kanji_meanings">
              ${result["word"].split("").map((kanji, index) => {
                return renderKanjiContent(dumpElement, kanji, index);
              })}
            </div>
          </div>
        </div>
        <button id="kanji_comment">Bình luận</button>
      </div>
    </div>
    <div id="language_tabs" class="popup_language_type">
      <div id="tab_vietnamese" data-tab="jv" class="language_type vietnamese ${
        language == "jv" ? "tab_active" : ""
      }"> Vietnamese </div>
      <div id="tab_english" data-tab="je" class="language_type english ${
        language == "je" ? "tab_active" : ""
      }"> English</div>
    </div>
</div>
<div class="g-signin2" data-onsuccess="onSignIn"></div>
<div id="comment_section" class="popup_comment">
  <div class="comment_section_content active">
      <input id="comment_user" placeholder="Tên" type="text"/>
      <div id="comment_section_part">
        <textarea placeholder="Nội dung" id="comment_input" type="text"></textarea>
        <button class="kanji_comment_btn">Bình luận</button>
        <button class="vocabulary_comment_btn active">Bình luận</button>
      </div>
    <div><h3>Bình luận</h3></div>
    <div id="comments_div">
      <ul class="list" id="comments_list">
      </ul>
      <ul class="pagination"></ul>
    </div>
  </div>
</div>
  `;
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
  handlingLanguage(dumpElement, selectionText);
  commentOnVocabulary();
  commentOnKanji();
}

function renderKanjiContent(dumpElement, kanji, kanjiNumber) {
  let chineseVietnameseMeaning,
    kunyomiReading,
    onyomiReading,
    componentElement;
  let component = "";
  kanjiInformations = Array.from(dumpElement.querySelectorAll("span.mdl"));
  const index = kanjiInformations.findIndex((info) =>
    info.innerHTML.includes(kanji)
  );
  chineseVietnameseMeaning = kanjiInformations[index].innerHTML;
  kunyomiReading = kanjiInformations[index + 1].innerHTML;
  onyomiReading = kanjiInformations[index + 2].innerHTML;
  let parentElement = kanjiInformations[index].closest(".stc");
  componentElement = parentElement.querySelector(".kc");
  if (componentElement) {
    component = componentElement.innerHTML;
  }
  meaningsSpanElements = Array.from(
    dumpElement.querySelectorAll("span.kt")
  ).filter((element) => element.innerHTML === "Nghĩa:");
  let currentKanjiMeaningElements = Array.from(
    meaningsSpanElements[kanjiNumber].parentNode.querySelectorAll("div.mdl")
  );
  let status = kanjiNumber == 0 ? "active" : "";
  let html = `
    <div id="${kanji}" class="kanji_content ${status}">
      <div id="draw-${kanji}" class="draw ${status}"></div>
      <div class="kanji_chinese_vietnamese_meaning">${chineseVietnameseMeaning
        .split(kanji)[1]
        .slice(3)}</div>
      <div class="kunyomi">Kun(訓): ${kunyomiReading}</div>
      <div class="onyomi">On(音): ${onyomiReading}</div>
      <div class="component">Bộ: ${component}</div>
      <div id="kanji_mean_group">Nghĩa:
        ${currentKanjiMeaningElements
          .map((meaning) => {
            return `<div class="vocabulary_meaning">${meaning.innerHTML}</div>`;
          })
          .join("")}
      </div>
    </div>
  `;
  new Dmak(kanji, {
    element: `draw-${kanji}`,
  });
  return html;
}

function handlingTabs() {
  let tabs = document.querySelector(".popup_tab_type");
  let tab = document.querySelectorAll("div.tab_type");
  let contents = document.querySelectorAll(".selection_bubble_content");
  let kanjiCommentBtn = document.getElementById("kanji_comment");
  let vocabularyCommentBtn = document.getElementById("vocabulary_comment");
  let commentSectionKanjiCommentBtn = document.getElementsByClassName("kanji_comment_btn")[0];
  let commentSectionVocabularyCommentBtn = document.getElementsByClassName("vocabulary_comment_btn")[0];
  tabs.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName === "DIV") {
      for (var i = 0; i < tab.length; i++) {
        tab[i].classList.remove("tab_active");
      }
      e.target.classList.toggle("tab_active");
      for (i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
      }
      kanjiCommentBtn.classList.remove("active");
      vocabularyCommentBtn.classList.remove("active");
      var tabId = e.target.dataset.tab;
      document.getElementById(tabId).classList.toggle("active");
      commentSectionKanjiCommentBtn.classList.remove("active");
      commentSectionVocabularyCommentBtn.classList.remove("active");
      document.getElementsByClassName(`${tabId}_comment_btn`)[0].classList.toggle("active");
      document.getElementById(`${tabId}_comment`).classList.toggle("active");
      resetPagination();
      if(tabId == "vocabulary")
        listComments("vocabularies");
      else
        listComments("kanjis");
    }
  });
}

function handlingMultipleKanjis(kanjis) {
  let tabs = document.querySelector(".kanji_entry");
  tabs.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName === "DIV") {
      let tab = document.querySelectorAll("div.kanji_searched_pl");
      let contents = document.querySelectorAll(".kanji_content");
      let draws = document.querySelectorAll("div.draw");
      new Dmak(kanji, {
        element: `draw-${kanjis.split("")[0]}`,
      });
      for (var i = 0; i < tab.length; i++) {
        tab[i].classList.remove("active");
      }
      e.target.classList.toggle("active");
      for (i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
      }
      for (let i = 0; i < draws.length; i++) {
        draws[i].classList.remove("active");
      }
      var tabId = e.target.dataset.tab;
      document.getElementById(tabId).classList.toggle("active");
      document.getElementById(`draw-${tabId}`).classList.toggle("active");
      new Dmak(kanji, {
        element: `draw-${tabId}`,
      });
      let currentKanji = document.querySelector(".kanji_searched_pl.active").innerHTML;
      resetPagination();
      listComments("kanjis");
      if(globalLanguage == 'je'){
        renderKanjiMeanings(currentKanji).then(html => {
          document.querySelector(`#${currentKanji} > #kanji_mean_group`).innerHTML = `Meaning: ${html}`;
        })
      }  
    }
  });
}

function handlingComment() {
  const vocabularyCommentBtn = document.getElementById("vocabulary_comment");
  const kanjiCommentBtn = document.getElementById("kanji_comment");
  const commentSection = document.getElementById("comment_section");
  vocabularyCommentBtn.addEventListener("click", (e) => {
    if (commentSection.classList.contains("active")) {
      return commentSection.classList.remove("active");
    }
    resetPagination();
    listComments("vocabularies");
    commentSection.classList.toggle("active");
  });
  kanjiCommentBtn.addEventListener("click", (e)=> {
    if (commentSection.classList.contains("active")){
      return commentSection.classList.remove("active");
    }
    resetPagination();
    listComments("kanjis");
    commentSection.classList.toggle("active");
  })
}
function handlingLanguage(dumpElement) {
  let tabs = document.querySelector(".popup_language_type");
  let tab = document.querySelectorAll("div.language_type");
  tabs.addEventListener("click", async function (e) {
    if (e.target && e.target.nodeName === "DIV") {
      let currentKanji = document.querySelector(".kanji_searched_pl.active").innerHTML;
      const newLanguage = e.target.dataset.tab;
      globalLanguage = newLanguage;
      for (let i = 0; i < tab.length; i++) {
        tab[i].classList.remove("tab_active");
      }
      e.target.classList.toggle("tab_active");
      const vocabularyElement = dumpElement.querySelector(`#${newLanguage}`);
      document.getElementById("vocabulary_mean_group").innerHTML =
        renderVocabularyMeanings(vocabularyElement);
      if(globalLanguage == "jv"){
        document.getElementById("kanji_meanings").innerHTML =  `${resultVocabulary.split("").map((kanji, index) => {
          return renderKanjiContent(dumpElement, kanji, index);
        }).join("")}`
      }
      else {
        renderKanjiMeanings(currentKanji).then(html => {
        document.querySelector(`#${currentKanji} > #kanji_mean_group`).innerHTML = `Meaning: ${html}`;
      })}
    }
  });
}

function renderVocabularyMeanings(element) {
  wordMeanings = Array.from(element.querySelectorAll(".fw")).map((e) =>
    e.innerHTML[0] == "▪" ? e.innerHTML.slice(1) : e.innerHTML``
  );
  const html = wordMeanings
    .map((word) => {
      return `<div class="vocabulary_meaning">${word}</div>`;
    })
    .join("");
  return html;
}

async function renderKanjiMeanings(kanji) {
  const result = await fetch(
    `http://localhost:3000/api/v1/words/${kanji}/english`
  );
  return result.json().then((json) => {
    return json["meanings"]
      .map((meaning) => {
        return `<div class="vocabulary_meaning">${meaning}</div>`;
      })
      .join("");
  });
}

function furigana(japanese, hiragana) {
  const diffs = Array.from(
    new diff_match_patch().diff_main(japanese, hiragana)
  );
  let html = "",
    ruby = { furigana: null, text: null };
  diffs.push([0, ""]);
  diffs.map((diff) => {
    if (diff[0] == 0) {
      if (ruby.furigana || ruby.text) {
        html += `<ruby>${ruby.text}<rp>(</rp><rt>${ruby.furigana}</rt><rp>)</rp></ruby>`;
        ruby.furigana = null;
        ruby.text = null;
      }
      html += diff[1];
    } else {
      ruby[diff[0] == 1 ? "furigana" : "text"] = diff[1];
    }
  });
  return html;
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

chrome.runtime.onMessage.addListener((request) => {
  let webStr = document.body.outerHTML.replace(
    request.selectionText,
    furigana(request.selectionText, request.content)
  );
  document.body.outerHTML = webStr;
});

function commentOnVocabulary() {
  const commentBtn = document.getElementsByClassName("vocabulary_comment_btn")[0];
  commentBtn.addEventListener("click", async () => {
    const vocabulary = document.getElementsByClassName("vocabulary_searched_pl")[0].innerHTML;
    const contentElement = document.getElementById("comment_input");
    const user = document.getElementById("comment_user").value;
    let content = contentElement.value;
    const response = await fetch(
      `http://localhost:3000/api/v1/vocabularies/${vocabulary}/comments`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ content, user })
      }
    );
    response.json().then((json) => {
      let html = document.getElementById(
        "comments_list"
      ).innerHTML;
      resetPagination();
      listComments("vocabularies");
      contentElement.value = '';
    });
  });
}

function commentOnKanji() {
  const commentBtn = document.getElementsByClassName("kanji_comment_btn")[0];
  commentBtn.addEventListener("click", async () => {
    const kanji = document.querySelector(".kanji_searched_pl.active").innerHTML;
    const contentElement = document.getElementById("comment_input");
    const user = document.getElementById("comment_user").value;
    let content = contentElement.value;
    const response = await fetch(
      `http://localhost:3000/api/v1/kanjis/${kanji}/comments`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ content, user })
      }
    );
    response.json().then((json) => {
      let html = document.getElementById(
        "comments_list"
      ).innerHTML;
      resetPagination();
      listComments("kanjis");
      contentElement.value = '';
    });
  });
}

async function listComments(wordClass) {
  let word = '';
  if(wordClass == "vocabularies"){
    word = document.getElementsByClassName("vocabulary_searched_pl")[0].innerHTML;
  }
  else{
    word = document.querySelector(".kanji_searched_pl.active").innerHTML;
  }
  const result = await fetch(
    `http://localhost:3000/api/v1/${wordClass}/${word}/comments`
  );
  result.json().then((json) => {
    let commentsList = document.getElementById("comments_list");
    const comments = json
      .map((comment) => {
        return `<li><h3 class="username">${comment.user}:</h3><p class="comment_content">${comment.content}</p></li>`;
      })
      .join("");
    commentsList.innerHTML = comments;
    if(json && json.length > 0){
      var options = {
        valueNames: ["username", "comment_content"],
        page: 3,
        pagination: true,
      };
      new List("comments_div", options);
    }
  });
}

function resetPagination(){
  const paginationElement = document.getElementsByClassName("pagination");
  if(paginationElement && paginationElement[0])
    paginationElement[0].innerHTML = '';
}