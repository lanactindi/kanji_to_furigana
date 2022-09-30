let selectionText = '';
let resultVocabulary = '';
const bodyDOM = document.querySelector('body');
let globalLanguage = '';
function getSelectedTextNode() {
  let selectedText = '';
  if (window.getSelection) {
    selectedText = window.getSelection();
  } else if (document.getSelection) {
    selectedText = document.getSelection();
  } else return '';
  return selectedText;
}

function getRangeSectionText() {
  const selectionTextNode = getSelectedTextNode();
  const getRange = selectionTextNode.getRangeAt(0);
  const selectionRect = getRange.getBoundingClientRect();
  return selectionRect;
}

function renderButtonTranslator(selectionTextRange, selectionText, left, top) {
  const buttonWrapper = document.createElement('div');
  buttonWrapper.id = 'kanji-to-furigana';
  const buttonIcon = document.createElement('div');
  buttonIcon.classList.add('translator-ext-icon');
  buttonIcon.innerHTML = '<svg width="20px" height="20px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><g fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)"><path d="m16.5 8.5v-6c0-1.1045695-.8954305-2-2-2h-6c-1.1045695 0-2 .8954305-2 2v6c0 1.1045695.8954305 2 2 2h6c1.1045695 0 2-.8954305 2-2z"/><path d="m4.5 6.50344846h-2.00001427c-1.1045695 0-2 .8954305-2 2v5.99943324c0 1.1045695.8954305 2 2 2h.00345627l6.00001428-.0103718c1.10321833-.0019065 1.99654372-.8967771 1.99654372-1.999997v-1.9925129"/><g transform="translate(2.502 9.5)"><path d="m2.998 1.003h-3"/><path d="m4.49841597 2.5c-.33333333.33333333-.66666667.66666667-1 1s-1.16666667.83333333-2.5 1.5"/><path d="m.99841597 1.00316806c.33333333 1.16613866.83333333 1.99894398 1.5 2.49841597s1.5.99894398 2.5 1.49841597"/></g><g transform="translate(8.5 2.5)"><path d="m3 0-3 6"/><path d="m3 0 3 6"/><path d="m3 2v4" transform="matrix(0 1 -1 0 7 1)"/></g></g></svg>';
  buttonWrapper.appendChild(buttonIcon);
  buttonWrapper.style.position = 'absolute';
  buttonWrapper.style.background = 'blue';
  buttonWrapper.style.cursor = 'pointer';
  buttonWrapper.style.padding = '4px';
  buttonWrapper.style.top = top;
  buttonWrapper.style.left = left;
  bodyDOM.appendChild(buttonWrapper);
  const dumpElement = document.createElement('div');
  if (buttonWrapper) {
    buttonWrapper.addEventListener('click', () => {
      if (selectionText.length > 0) {
        fetch(
          `https://kanjitofurigana.tk/api/vietnamese/${selectionText}`,
        )
          .then((res) => res.json())
          .then((json) => {
            if (json.tratu && json.tratu.length > 0) {
              dumpElement.innerHTML = json.tratu[0].fields.fulltext;
              const vocabulary = json.tratu[0].fields.word;
              renderButtonResultTranslator(
                selectionTextRange,
                selectionText,
                dumpElement,
                vocabulary,
                left,
                top,
              );
              buttonWrapper.remove();
              buttonIcon.remove();
              handlingTabs();
              handlingMultipleKanjis(dumpElement, json.tratu[0].fields.word);
            } else {
              throw new Error(`Cannot find ${selectionText} meaning`);
            }
          })
          .catch(() => {
            renderErrorResult(selectionText, left, top);
          });
      }
    });
  }
}

function renderErrorResult(selectionText, left, top) {
  const buttonResult = document.createElement('div');
  buttonResult.id = 'kanji-to-furigana-result';
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('translator-result-ext-container');
  buttonContainer.innerHTML = `
  <div class="popup_rect">
    <div id="popup_tabs">
      Cannot find ${selectionText} meaning
    </div>
  </div>
  `;
  buttonResult.style.position = 'absolute';
  buttonResult.style.cursor = 'pointer';
  buttonResult.style.padding = '4px';
  buttonResult.style.top = top;
  buttonResult.style.left = left;
  buttonResult.appendChild(buttonContainer);
  bodyDOM.appendChild(buttonResult);
}

function renderButtonResultTranslator(
  selectionTextRange,
  selectionText,
  dumpElement,
  vocabulary,
  left,
  top,
  language = 'jv',
) {
  globalLanguage = 'jv';
  const buttonResult = document.createElement('div');
  buttonResult.id = 'kanji-to-furigana-result';
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('translator-result-ext-container');
  const wordSpell = dumpElement.getElementsByClassName('pw')[0].innerHTML;
  resultVocabulary = vocabulary;
  const vocabularyElement = dumpElement.querySelector(`#${language}`);
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
              <div class="vocabulary_searched_pl">${vocabulary}</div>
              <div class="chinese_vietnamese_phonetic"></div>
              <div class="vocabulary_search_phonetic">${wordSpell}</div>
              <div id="vocabulary_mean_group" class="vocabulary_mean_group">
                ${renderVocabularyMeanings(vocabularyElement)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="kanji" class="selection_bubble_content">
        <div id="dic_bubble_synonyms">
          <div class="vocabulary_detail_content_pl">
            <div class="kanji_entry">
              ${vocabulary
    .split('')
    .map((kanji, i) => {
      if (i === 0) return `<div data-tab="${kanji}" class="kanji_searched_pl active">${kanji}</div>`;
      return `<div data-tab="${kanji}" class="kanji_searched_pl">${kanji}</div>`;
    })
    .join('')}
            </div>
            <div id="kanji_meanings">
              ${vocabulary.split('').map((kanji, index) => renderKanjiContent(dumpElement, kanji, index)).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="language_tabs" class="popup_language_type">
      <div id="tab_vietnamese" data-tab="jv" class="language_type vietnamese ${
  language === 'jv' ? 'tab_active' : ''
}"> Vietnamese </div>
      <div id="tab_english" data-tab="je" class="language_type english ${
  language === 'je' ? 'tab_active' : ''
}"> English</div>
    </div>
</div>
</div>
  `;
  buttonResult.appendChild(buttonContainer);
  buttonResult.style.position = 'absolute';
  buttonResult.style.cursor = 'pointer';
  buttonResult.style.padding = '4px';
  buttonResult.style.top = top;
  buttonResult.style.left = left;
  bodyDOM.appendChild(buttonResult);
  handlingLanguage(dumpElement, selectionText);
}

function renderKanjiContent(dumpElement, kanji, kanjiNumber) {
  let component = '';
  const kanjiInformations = Array.from(dumpElement.querySelectorAll('span.mdl'));
  const index = kanjiInformations.findIndex((info) => info.innerHTML.includes(kanji));
  const chineseVietnameseMeaning = kanjiInformations[index].innerHTML;
  const kunyomiReading = kanjiInformations[index + 1].innerHTML;
  const onyomiReading = kanjiInformations[index + 2].innerHTML;
  const parentElement = kanjiInformations[index].closest('.stc');
  const componentElement = parentElement.querySelector('.kc');
  if (componentElement) {
    component = componentElement.innerHTML;
  }
  const meaningsSpanElements = Array.from(
    dumpElement.querySelectorAll('span.kt'),
  ).filter((element) => element.innerHTML === 'Nghĩa:');
  const currentKanjiMeaningElements = Array.from(
    meaningsSpanElements[kanjiNumber].parentNode.querySelectorAll('div.mdl'),
  );
  const status = kanjiNumber === 0 ? 'active' : '';
  const html = `
    <div id="${kanji}" class="kanji_content ${status}">
      <div id="draw-${kanji}" class="draw"></div>
      <div class="kanji_chinese_meaning">${chineseVietnameseMeaning
    .split(kanji)[1]
    .slice(3)}</div>
      <div class="kunyomi">Kun(訓): ${kunyomiReading}</div>
      <div class="onyomi">On(音): ${onyomiReading}</div>
      <div class="component">Bộ: ${component}</div>
      <div id="kanji_mean_group">Nghĩa:
        ${currentKanjiMeaningElements
    .map((meaning) => `<div class="vocabulary_meaning">${meaning.innerHTML}</div>`)
    .join('')}
      </div>
    </div>
  `;
  // eslint-disable-next-line no-unused-vars, no-undef
  const handwriting = new Dmak(kanji, {
    element: `draw-${kanji}`,
  });
  return html;
}

function handlingTabs() {
  const tabs = document.querySelector('.popup_tab_type');
  const tab = document.querySelectorAll('div.tab_type');
  const contents = document.querySelectorAll('.selection_bubble_content');
  tabs.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === 'DIV') {
      const tabId = e.target.dataset.tab;
      const activeTab = document.getElementById(tabId);
      if (!activeTab) {
        return;
      }
      for (let i = 0; i < tab.length; i += 1) {
        tab[i].classList.remove('tab_active');
      }
      e.target.classList.toggle('tab_active');
      for (let i = 0; i < contents.length; i += 1) {
        contents[i].classList.remove('active');
      }
      activeTab.classList.toggle('active');
    }
  });
}

function handlingMultipleKanjis(dumpElement, kanjis) {
  const tabs = document.querySelector('.kanji_entry');
  tabs.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === 'DIV' && e.target.className === 'kanji_searched_pl') {
      const tab = document.querySelectorAll('div.kanji_searched_pl');
      let contents = document.querySelectorAll('.kanji_content');
      // eslint-disable-next-line no-unused-vars, no-undef
      const firstHandwriting = new Dmak(kanji, {
        element: `draw-${kanjis.split('')[0]}`,
      });
      for (let i = 0; i < tab.length; i += 1) {
        tab[i].classList.remove('active');
      }
      e.target.classList.toggle('active');
      for (let i = 0; i < contents.length; i += 1) {
        contents[i].classList.remove('active');
      }
      const tabId = e.target.dataset.tab;
      const activeTab = document.getElementById(tabId);
      // eslint-disable-next-line no-unused-vars, no-undef
      const secondHandwriting = new Dmak(kanji, {
        element: `draw-${tabId}`,
      });
      const currentKanji = document.querySelector(
        '.kanji_searched_pl.active',
      );
      if (globalLanguage === 'jv' && currentKanji) {
        const currentKanjiContent = currentKanji.innerHTML;
        document.getElementById(
          'kanji_meanings',
        ).innerHTML = `${resultVocabulary.split('').map((kanji, i) => renderKanjiContent(dumpElement, kanji, i)).join('')}`;
        if (activeTab) {
          document.getElementById(tabId).classList.toggle('active');
        }
        contents = document.querySelectorAll('.kanji_content');
        for (let i = 0; i < contents.length; i += 1) {
          contents[i].classList.remove('active');
        }
        document.querySelector(`#${currentKanjiContent}`).classList.toggle('active');
      } else if (globalLanguage === 'je' && currentKanji) {
        const currentKanjiContent = currentKanji.innerHTML;
        getKanjiMeanings(currentKanjiContent).then((json) => {
          if (activeTab) {
            document.getElementById(tabId).classList.toggle('active');
          }
          document.querySelector(
            `#${currentKanjiContent} > .kanji_chinese_meaning`,
          ).innerHTML = json.heisig_en.toUpperCase();
          const currentKanjiComponent = document.querySelector(`#${currentKanjiContent} > .component`);
          if (currentKanjiComponent) {
            currentKanjiComponent.remove();
          }
          document.querySelector(
            `#${currentKanjiContent} > #kanji_mean_group`,
          ).innerHTML = `Meaning: ${json.meanings
            .map((meaning) => `<div class="vocabulary_meaning">${meaning}</div>`)
            .join('')}`;
        });
      }
    }
  });
}

function handlingLanguage(dumpElement) {
  const tabs = document.querySelector('.popup_language_type');
  const tab = document.querySelectorAll('div.language_type');
  tabs.addEventListener('click', async (e) => {
    if (e.target && e.target.nodeName === 'DIV') {
      const currentKanji = document.querySelector(
        '.kanji_searched_pl.active',
      ).innerHTML;
      const newLanguage = e.target.dataset.tab;
      globalLanguage = newLanguage;
      for (let i = 0; i < tab.length; i += 1) {
        tab[i].classList.remove('tab_active');
      }
      e.target.classList.toggle('tab_active');
      const vocabularyElements = Array.from(dumpElement.querySelectorAll(`#${newLanguage}`));
      document.getElementById('vocabulary_mean_group').innerHTML = vocabularyElements.map((e) => renderVocabularyMeanings(e)).join('');
      if (globalLanguage === 'jv') {
        document.getElementById(
          'kanji_meanings',
        ).innerHTML = `${resultVocabulary
          .split('')
          .map((kanji, index) => renderKanjiContent(dumpElement, kanji, index))
          .join('')}`;
        const contents = document.querySelectorAll('.kanji_content');
        for (let i = 0; i < contents.length; i += 1) {
          contents[i].classList.remove('active');
        }
        document.querySelector(`#${currentKanji}`).classList.toggle('active');
      } else {
        getKanjiMeanings(currentKanji).then((json) => {
          document.querySelector(
            `#${currentKanji} > .kanji_chinese_meaning`,
          ).innerHTML = json.heisig_en.toUpperCase();
          const currentKanjiComponent = document.querySelector(`#${currentKanji} > .component`);
          if (currentKanjiComponent) {
            currentKanjiComponent.remove();
          }
          document.querySelector(
            `#${currentKanji} > #kanji_mean_group`,
          ).innerHTML = `Meaning: ${json.meanings
            .map((meaning) => `<div class="vocabulary_meaning">${meaning}</div>`)
            .join('')}`;
        });
      }
    }
  });
}

function renderVocabularyMeanings(element) {
  const wordMeanings = Array.from(element.querySelectorAll('.fw')).map((e) => (e.innerHTML[0] === '▪' ? e.innerHTML.slice(1) : e.innerHTML``));
  const html = wordMeanings
    .map((word) => `<div class="vocabulary_meaning">${word}</div>`)
    .join('');
  return html;
}

async function getKanjiMeanings(kanji) {
  const result = await fetch(
    `https://kanjitofurigana.tk/api/english/${kanji}`,
  );
  return result.json();
}

function furigana(japanese, hiragana) {
  const diffs = Array.from(
    // eslint-disable-next-line new-cap, no-undef
    new diff_match_patch().diff_main(japanese, hiragana),
  );
  let html = '';
  const ruby = { furigana: null, text: null };
  diffs.push([0, '']);
  diffs.forEach((diff) => {
    if (diff[0] === 0) {
      if (ruby.furigana || ruby.text) {
        html += `<ruby>${ruby.text}<rp>(</rp><rt>${ruby.furigana}</rt><rp>)</rp></ruby>`;
        ruby.furigana = null;
        ruby.text = null;
      }
      html += diff[1];
    } else {
      // eslint-disable-next-line prefer-destructuring
      ruby[diff[0] === 1 ? 'furigana' : 'text'] = diff[1];
    }
  });
  return html;
}

bodyDOM.addEventListener('mouseup', (event) => {
  const buttonResult = document.querySelector('div#kanji-to-furigana-result');
  if (buttonResult && buttonResult.contains(event.target)) {
    return event.preventDefault();
  }
  if (buttonResult) buttonResult.remove();
  selectionText = getSelectedTextNode().toString();
  if (selectionText.length > 0) {
    const selectionTextRange = getRangeSectionText();
    const left = `${event.pageX}px`;
    const top = `${event.pageY}px`;
    renderButtonTranslator(selectionTextRange, selectionText, left, top);
    setTimeout(() => {
      const icon = document.getElementById('kanji-to-furigana');
      if (icon) {
        icon.remove();
      }
    }, (3000));
  }
  return undefined;
});

chrome.runtime.onMessage.addListener((request) => {
  const webStr = document.body.outerHTML.replace(
    request.selectionText,
    furigana(request.selectionText, request.content),
  );
  document.body.outerHTML = webStr;
});
