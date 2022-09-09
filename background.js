chrome.contextMenus.create({
  id: "OpenSN",
  title: "Open %s in Service-Now",
  contexts: ["selection"]
});



//add listener for click on self defined menu item
chrome.contextMenus.onClicked.addListener(async function(clickData){
  if (clickData.menuItemId == "OpenSN" && clickData.selectionText) {
    const result = await fetch(
      `http://localhost:3000/api/v1/words/${clickData.selectionText}/furigana`
    );
    result.json().then((json) => {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {content: json["translated"], selectionText: clickData.selectionText}, function(response) {
        });
     });
    });
  }
})

