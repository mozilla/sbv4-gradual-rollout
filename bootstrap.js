"use strict";

const {utils: Cu} = Components;
Cu.import("resource://gre/modules/Services.jsm");
const UserPreferences = Services.prefs;
const DefaultPreferences = Services.prefs.getDefaultBranch("");

function startup(data) {
  DefaultPreferences.setStringPref("urlclassifier.malwareTable", "goog-malware-proto,goog-unwanted-proto,test-malware-simple,test-unwanted-simple");
  DefaultPreferences.setStringPref("urlclassifier.phishTable", "goog-phish-proto,test-phish-simple");
  DefaultPreferences.setStringPref("urlclassifier.downloadAllowTable", "goog-downloadwhite-proto");
  DefaultPreferences.setStringPref("urlclassifier.downloadBlockTable", "goog-badbinurl-proto");

  // forcing reinitialization re: https://github.com/raymak/sbv4-crash-shield-study/issues/4
  UserPreferences.setStringPref("browser.safebrowsing.provider.google.advisoryName", "Google Safe Browsing");
}

function shutdown(data) {
  UserPreferences.clearUserPref("browser.safebrowsing.provider.google.advisoryName");
}
