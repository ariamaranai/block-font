chrome.action.onClicked.addListener(async () => {
  let path = "on.png";
  chrome.declarativeNetRequest.updateEnabledRulesets({
    [(await chrome.declarativeNetRequest.getEnabledRulesets()).length ? (path = "off.png", "disableRulesetIds") : "enableRulesetIds"]: ["0"]
  });
  chrome.action.setIcon({ path });
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
      chrome.action.setIcon({ path: (await chrome.declarativeNetRequest.getEnabledRulesets()).length ? "on.png" : "off.png" }),
      chrome.action.setBadgeBackgroundColor({ color: "#500" }),
      chrome.action.setBadgeTextColor({ color: "#fff" }),
      0
    )
  );
}
chrome.runtime.onStartup.dispatch();