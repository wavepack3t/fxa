user_pref("browser.shell.checkDefaultBrowser", false);
user_pref("devtools.chrome.enabled", true);
user_pref("devtools.debugger.remote-enabled", true);
user_pref("devtools.debugger.prompt-connection", false);
user_pref("general.warnOnAboutConfig", false);
user_pref("xpinstall.signatures.required", false);
user_pref("xpinstall.whitelist.required", false);
user_pref("services.sync.prefs.sync.xpinstall.whitelist.required", false);
user_pref("extensions.checkCompatibility.nightly", false);
user_pref("browser.pocket.enabled", true);
user_pref("identity.fxaccounts.log.appender.dump", "Debug");
user_pref("identity.fxaccounts.loglevel", "Debug");
user_pref("services.sync.log.appender.file.logOnSuccess", true);
user_pref("services.sync.log.appender.console", "Debug");
user_pref(
  "browser.uitour.testingOrigins",
  "http://127.0.0.1:8001,http://127.0.0.1:8000,https://www.mozilla.org,https://www.allizom.org,https://www-demo5.allizom.org,https://www-dev.allizom.org"
);
user_pref("browser.uitour.requireSecure", false);
user_pref("services.sync.log.appender.dump", "Debug");
user_pref("identity.fxaccounts.auth.uri", "http://127.0.0.1:9000/v1");
user_pref("identity.fxaccounts.allowHttp", true);
user_pref("identity.fxaccounts.remote.root", "http://127.0.0.1:3030/");
user_pref(
  "identity.fxaccounts.remote.force_auth.uri",
  "http://127.0.0.1:3030/force_auth?service=sync&context=fx_desktop_v3"
);
user_pref(
  "identity.fxaccounts.remote.signin.uri",
  "http://127.0.0.1:3030/signin?service=sync&context=fx_desktop_v3"
);
user_pref(
  "identity.fxaccounts.remote.signup.uri",
  "http://127.0.0.1:3030/signup?service=sync&context=fx_desktop_v3"
);
user_pref(
  "identity.fxaccounts.remote.webchannel.uri",
  "http://127.0.0.1:3030/"
);
user_pref("identity.fxaccounts.remote.oauth.uri", "http://127.0.0.1:9010/v1");
user_pref("identity.fxaccounts.remote.profile.uri", "http://localhost:1111/v1");
user_pref(
  "identity.fxaccounts.settings.uri",
  "http://127.0.0.1:3030/settings?service=sync&context=fx_desktop_v3"
);
user_pref(
  "identity.sync.tokenserver.uri",
  "http://localhost:5000/token/1.0/sync/1.5"
);
user_pref(
  "services.sync.tokenServerURI",
  "http://localhost:5000/token/1.0/sync/1.5"
);
user_pref("identity.fxaccounts.contextParam", "fx_desktop_v3");
user_pref(
  "browser.newtabpage.activity-stream.fxaccounts.endpoint",
  "http://127.0.0.1:3030/"
);
user_pref("app.update.auto", false);
user_pref("app.update.enabled", false);
user_pref("app.update.silent", false);
user_pref("app.update.staging.enabled", false);
user_pref("webchannel.allowObject.urlWhitelist", "http://127.0.0.1:3030");
user_pref("loop.server", "http://localhost:10222");
