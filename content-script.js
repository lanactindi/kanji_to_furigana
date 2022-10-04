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
  buttonIcon.innerHTML = '<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="white" fill-rule="evenodd"/><path clip-rule="evenodd" d="M21 13H3V11H21V13Z" fill="white" fill-rule="evenodd"/><path clip-rule="evenodd" d="M11.2925 20.2933C11.2927 20.2931 11.2929 20.2929 12 21C12.7071 21.7071 12.7073 21.7069 12.7076 21.7066L12.7096 21.7046L12.7135 21.7007L12.7256 21.6884C12.7355 21.6782 12.7492 21.6642 12.7663 21.6464C12.8005 21.6108 12.8486 21.5599 12.9085 21.4946C13.0284 21.3641 13.196 21.1754 13.3954 20.9344C13.7935 20.4533 14.3224 19.7591 14.8517 18.8991C15.9014 17.1932 17 14.7582 17 12C17 9.24185 15.9014 6.8068 14.8517 5.1009C14.3224 4.24086 13.7935 3.54666 13.3954 3.06556C13.196 2.82458 13.0284 2.63589 12.9085 2.50537C12.8486 2.44008 12.8005 2.38925 12.7663 2.35361C12.7492 2.33579 12.7355 2.32176 12.7256 2.31161L12.7135 2.29931L12.7096 2.29536L12.7082 2.29394C12.7079 2.2937 12.7071 2.29289 12 3C11.2929 3.70711 11.2927 3.70691 11.2925 3.70672L11.2973 3.71164L11.3235 3.73867C11.3479 3.76407 11.3858 3.80406 11.4352 3.85791C11.5341 3.96567 11.679 4.12854 11.8546 4.34069C12.2065 4.76584 12.6776 5.38414 13.1483 6.1491C14.0986 7.6932 15 9.75815 15 12C15 14.2418 14.0986 16.3068 13.1483 17.8509C12.6776 18.6159 12.2065 19.2342 11.8546 19.6593C11.679 19.8715 11.5342 20.0343 11.4352 20.1421C11.3858 20.1959 11.3479 20.2359 11.3235 20.2613L11.2973 20.2884L11.2925 20.2933Z" fill="white" fill-rule="evenodd"/><path clip-rule="evenodd" d="M12.7075 20.2933C12.7073 20.2931 12.7071 20.2929 12 21C11.2929 21.7071 11.2927 21.7069 11.2924 21.7066L11.2904 21.7046L11.2865 21.7007L11.2744 21.6884C11.2645 21.6782 11.2508 21.6642 11.2337 21.6464C11.1995 21.6108 11.1514 21.5599 11.0915 21.4946C10.9716 21.3641 10.804 21.1754 10.6046 20.9344C10.2065 20.4533 9.6776 19.7591 9.14834 18.8991C8.09856 17.1932 7 14.7582 7 12C7 9.24185 8.09856 6.8068 9.14834 5.1009C9.6776 4.24086 10.2065 3.54666 10.6046 3.06556C10.804 2.82458 10.9716 2.63589 11.0915 2.50537C11.1514 2.44008 11.1995 2.38925 11.2337 2.35361C11.2508 2.33579 11.2645 2.32176 11.2744 2.31161L11.2865 2.29931L11.2904 2.29536L11.2918 2.29394C11.2921 2.2937 11.2929 2.29289 12 3C12.7071 3.70711 12.7073 3.70691 12.7075 3.70672L12.7027 3.71164L12.6765 3.73867C12.6521 3.76407 12.6142 3.80406 12.5648 3.85791C12.4659 3.96567 12.321 4.12854 12.1454 4.34069C11.7935 4.76584 11.3224 5.38414 10.8517 6.1491C9.90144 7.6932 9 9.75815 9 12C9 14.2418 9.90144 16.3068 10.8517 17.8509C11.3224 18.6159 11.7935 19.2342 12.1454 19.6593C12.321 19.8715 12.4658 20.0343 12.5648 20.1421C12.6142 20.1959 12.6521 20.2359 12.6765 20.2613L12.7027 20.2884L12.7075 20.2933Z" fill="white" fill-rule="evenodd"/></svg>';
  buttonWrapper.appendChild(buttonIcon);
  buttonWrapper.style.height = '24px'
  buttonWrapper.style.position = 'absolute';
  buttonWrapper.style.background = 'purple';
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
          .catch((error) => {
            renderErrorResult(error, left, top);
          });
      }
    });
  }
}

function renderErrorResult(error, left, top) {
  const buttonResult = document.createElement('div');
  buttonResult.id = 'kanji-to-furigana-result';
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('translator-result-ext-container');
  buttonContainer.innerHTML = `
  <div class="popup_rect">
    <div id="popup_tabs">
      ${error}
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
