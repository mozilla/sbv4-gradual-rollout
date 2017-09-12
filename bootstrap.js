"use strict";

const {utils: Cu} = Components;
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/AddonManager.jsm");
const UserPreferences = Services.prefs;
const DefaultPreferences = Services.prefs.getDefaultBranch("");

function startup(data) {
  if (parseInt(Services.appinfo.version) >= 57) {
    console.log("SBv4-gradual-rollout not needed on 57 or later, removing.");
    AddonManager.getAddonByID("sbv4-gradual-rollout@mozilla.com", addon => addon.uninstall());
    return;
  }

  // Switch default to SBv4
  DefaultPreferences.setStringPref("urlclassifier.malwareTable", "goog-malware-proto,goog-unwanted-proto,test-malware-simple,test-unwanted-simple");
  DefaultPreferences.setStringPref("urlclassifier.phishTable", "goog-phish-proto,test-phish-simple");
  DefaultPreferences.setStringPref("urlclassifier.downloadAllowTable", "goog-downloadwhite-proto");
  DefaultPreferences.setStringPref("urlclassifier.downloadBlockTable", "goog-badbinurl-proto");

  // forcing reinitialization re: https://github.com/raymak/sbv4-crash-shield-study/issues/4
  UserPreferences.setStringPref("browser.safebrowsing.provider.google.advisoryName", "Google Safe Browsing");
}

function shutdown(data) {
  if (parseInt(Services.appinfo.version) >= 57) {
    console.log("No cleanup necessary on 57 or later.");
    return;
  }

  // Set default back to SBv2
  DefaultPreferences.setStringPref("urlclassifier.malwareTable", "goog-malware-shavar,goog-unwanted-shavar,test-malware-simple,test-unwanted-simple");
  DefaultPreferences.setStringPref("urlclassifier.phishTable", "goog-phish-shavar,test-phish-simple");
  DefaultPreferences.setStringPref("urlclassifier.downloadAllowTable", "goog-downloadwhite-digest256");
  DefaultPreferences.setStringPref("urlclassifier.downloadBlockTable", "goog-badbinurl-shavar");

  UserPreferences.clearUserPref("browser.safebrowsing.provider.google.advisoryName");
}
