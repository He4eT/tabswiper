# Tabswiper

A Firefox extension that makes trimming your tabs as effortless as swiping on a dating app.

Availible on [addons.mozilla.org](https://addons.mozilla.org/addon/tabswiper/).

![Extension Popup Window](/screenshots/Screenshot_1.png?raw=true)

## How to Use It

1. Open the extension's popup window using the extension icon or by pressing `Shift + F2`.
You can customize the keyboard shortcut by accessing the `Manage Extension Shortcuts` in Firefox settings.

1. Navigate through your list of open tabs using buttons or your keyboard:
   - Press `j` or `Right Arrow` to keep the selected tab.
   - Press `d` or `Left Arrow` to close the tab.
   - Press `f` or `Up Arrow` to switch to the tab.

1. After eliminating all unnecessary tabs, simply press the `Esc` key to close the popup window.

## Development

### Adding an Unpacked Extension to Firefox

1. In the Firefox address bar, type `about:debugging` and press Enter.

1. Click on `This Firefox`, then select `Load Temporary Add-on...`.

1. Choose the `manifest.json` file.

### Build the Package

To generate the XPI file, just use the `make package` command.
The output file will be stored in the `dist` directory.
