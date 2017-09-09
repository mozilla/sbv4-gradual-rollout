# Safe Browsing V4 gradual roll-out

<https://bugzilla.mozilla.org/show_bug.cgi?id=1393980>

## Building the add-on

    zip -r ../sbv4-gradual-rollout.xpi bootstrap.js install.rdf

## Installing the add-on in Firefox

1. `about:config`, set
   1. `extensions.legacy.enabled` to `true`
   2. `xpinstall.signatures.required` to `false`
2. `about:debugging > [load temporary addon] > choose `dist/addon.xpi`
3. `tools > Web Developer > Browser Toolbox`

