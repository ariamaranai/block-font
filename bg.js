chrome.action.onClicked.addListener(async () => {
  let len = (await chrome.declarativeNetRequest.getEnabledRulesets()).length;
  chrome.action.setIcon({
    path: len ? "off.png": "on.png"
  });
  chrome.declarativeNetRequest.updateEnabledRulesets({
    [len ? "disableRulesetIds" : "enableRulesetIds"] : ["0"]
  });
});
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(async info => {
  if (info.rule.ruleId > 1)
    try {
      await chrome.declarativeNetRequest.setExtensionActionOptions({
        displayActionCountAsBadgeText: !0,
        tabUpdate: {
          increment: 1,
          tabId: info.request.tabId
        }
      })
    } catch {}
});
{
  let isCalled;
  chrome.runtime.onStartup.addListener(async () =>
    isCalled ??= (
      chrome.action.setIcon({
        path: (await chrome.declarativeNetRequest.getEnabledRulesets()).length ? "on.png" : "off.png"
      }),
      chrome.action.setBadgeBackgroundColor({
        color: "#500"
      }),
      chrome.action.setBadgeTextColor({
        color: "#fff"
      })
    )
  );
}
chrome.runtime.onStartup.dispatch();