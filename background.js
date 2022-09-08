//define contextMenuItem
var contextMenuItem = {

  "id": "OpenSN",
  "title": "Open %s in ServiceNow",
  "contexts": ["selection"]
};

//on installation of chrome extension: create contextMenuItem
chrome.runtime.onInstalled.addListener(() => {
chrome.contextMenus.create({
  id: "OpenSN",
  title: "Open %s in Service-Now",
  contexts: ["selection"]
});
});



//add listener for click on self defined menu item
chrome.contextMenus.onClicked.addListener(function(clickData){
  console.log(clickData)
  if (clickData.menuItemId == "OpenSN" && clickData.selectionText) {
      debugger
  }
})