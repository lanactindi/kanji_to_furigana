# Kanji to furigana
## About
### 日本語

Kanji to furiganaは、日本語のテキストにふりがなを表示する漢字翻訳サービスです。 
日本語を学んでいるベトナム人にとって、日本語を学ぶのは漢字の意味が理解できないため難しい場合がありますが、オンライン辞書やオンライン翻訳例で単語を調べるのは非常に面倒です.漢字を使用するだけ.フリガナにするには、ユーザーはダブルクリックするだけで表示できます.漢字の意味は、そのウェブサイトで正しく見つける必要があります。
なぜベトナム人でしょうか？それは、ベトナム人が中国語から学ぶという非常に興味深い漢字の学習方法を持っているからです。漢越音を学ぶことで、ベトナム人は習った漢字を覚えやすくなります。
また、このサービスでは、漢字の上にふりがなを表示することで、混乱する漢字を含む日本語テキストを読むことができます。

### Tiếng việt

Kanji to furigana là dịch vụ phiên dịch hán tự, hiển thị furigana lên các đoạn văn bản tiếng nhật. Đối với người Việt thì việc học tiếng Nhật đôi khi gặp khó khăn vì không thể nào hiểu nghĩa 1 số kanji, mà việc tra từ trên các từ điển online hay công dụ dịch online đều khá tốn nhiều thao tác.Chỉ cần sử dụng Kanji to Furigana, người dùng chỉ cần double click thì sẽ hiển thị đc nghĩa Kanji mình cần tìm ngay trên website đó. Ngoài ra, dịch vụ này còn cho phép người dùng đọc các đoạn văn bản tiếng nhật chứa các từ Kanji khó hiểu bằng cách hiển thị furigana lên trên các kanji. 
Tại sao lại là người việt ? Đó là vì người việt có 1 cách học hán tự rất thú vị đó là học theo người trung quốc, bằng cách học âm hán việt khiến người việt rất dễ nhớ hán tự mà mình đã học.

### インストール
まずはクローンします。<img width="1440" alt="Screen Shot 0004-09-21 at 0 42 34" src="https://user-images.githubusercontent.com/94335407/191303449-d69371d1-835e-4ddc-93a3-a3fa41aadab5.png">

```bash
git clone https://github.com/lanactindi/kanji_to_furigana.git
```
```bash
cd kanji_to_furigana
```
```bash
npm install
```
Chromeブラウザで```chrome://extensions/```にアクセスして、

<img width="190" alt="Screen Shot 0004-09-21 at 0 27 46" src="https://user-images.githubusercontent.com/94335407/191299998-05c61f80-5a8f-4969-bbba-d0fd8adff05b.png">

Developer modeをオンにしてください。

<img width="381" alt="Screen Shot 0004-09-21 at 0 31 18" src="https://user-images.githubusercontent.com/94335407/191300793-619b71c6-7c66-48dc-90c6-21e0fd25b526.png">

オンにすると、左側で```Load unpacked```というボタンが表示されます。そのボタンを押してください。

ボタンを押すと、他のウィンドウが表示されます。ここで、先ほどクローンしたレポ(kanji_to_furigana）を選択してください。

### 使い方
#### 漢字検索
漢字があるサイトで漢字を選択して、小さな青いアイコンをクリックしてください。

<img width="1440" alt="Screen Shot 0004-09-21 at 0 43 09" src="https://user-images.githubusercontent.com/94335407/191303558-79d4ac9f-0d22-43b3-a897-ba291e58844e.png">

クリックすると、言葉ページが表示されます。

<img width="1440" alt="Screen Shot 0004-09-21 at 0 45 27" src="https://user-images.githubusercontent.com/94335407/191304117-1707769d-45b0-4fef-8a8b-3519b53c67d7.png">

漢字のページもあります。

<img width="1440" alt="Screen Shot 0004-09-21 at 0 46 16" src="https://user-images.githubusercontent.com/94335407/191304327-d1cf9bf0-25ce-402c-a2fb-03b4407fea1b.png">
クリックすると、言葉ページが表示されます。

#### 漢字の上にひらがなを表示する

ときどき、日本語の文章が読みにくい（特に漢字が読めない）のでその文章を選択して、右クリックしてください。

<img width="1440" alt="Screen Shot 0004-09-21 at 0 54 45" src="https://user-images.githubusercontent.com/94335407/191306337-625e5e75-2350-4f24-8b0b-aa7ff4629c52.png">

```Translate ... to Hiragana```ボタンを押すと、漢字の上にひらがなが表示されます。

![Screen Shot 0004-09-21 at 0 58](https://user-images.githubusercontent.com/94335407/191307975-29ff671b-cc9e-43ad-99b3-03461c4f0e66.png)

## Credits

KanjiToFurigana は次の サービス に依存しています。

- **kuroshiro** *https://github.com/hexenq/kuroshiro*
- **dmak** *https://github.com/mbilbille/dmak*
- **tracau.vn** *https://tracau.vn*
- **kanjiapi.dev** *https://kanjiapi.dev/*

## License

[MIT](LICENSE)
