onunhandledrejection = e => e.preventDefault();

{
  let { action, declarativeNetRequest, runtime } = chrome;
  action.onClicked.addListener(() =>
    declarativeNetRequest.getEnabledRulesets((rulesets, path) => (
      declarativeNetRequest.updateEnabledRulesets({
        [rulesets.length ? (path = "off.png", "disableRulesetIds") : (path = "on.png", "enableRulesetIds")]: ["0"]
      }),
      action.setIcon({ path })
    ))
  );
  declarativeNetRequest.onRuleMatchedDebug.addListener(info =>
    info.rule.ruleId > 1 &&
    declarativeNetRequest.setExtensionActionOptions({
      displayActionCountAsBadgeText: !0,
      tabUpdate: {
        increment: 1,
        tabId: info.request.tabId
      }
    })
  );

  let isCalled;
  runtime.onStartup.addListener(() =>
    isCalled ??= (
      declarativeNetRequest.getEnabledRulesets(rulesets => (
        action.setIcon({ path: rulesets.length ? "on.png" : "off.png" }),
        action.setBadgeBackgroundColor({ color: "#500" }),
        action.setBadgeTextColor({ color: "#fff" })
      )),
      0
    )
  );
  runtime.onStartup.dispatch();
}
