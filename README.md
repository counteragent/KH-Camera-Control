# KH Camera Control
PTZ Camera Control Software for Kingdom Halls (Electron App)

This project is made for the PTZOptics line of IP Cameras.

All the components of this project are built using web technologies. Javascript, HTML, CSS, etc. It can be used in it's basic form as Javascript, HTML, and CSS. However, it includes all the additional files necessary to create your own electron based app package.

If you have any bugs or issues to report, please post them [here](https://github.com/counteragent/Camera-Control/issues).

## Keyboard Shortcuts

- Preferences/settings menu `Command` + `,` (Windows: `CTRL` + `,`)
- Presets menu `Command` + `.` (Windows: `CTRL` + `.`)
- Pan/Tilt camera (arrow keys) `up`, `down`, `left`, `right`
- Zoom in/out `a`, `z`
- Reset camera to home position `home`

## Building the Electron App

In order to build the Electron app you'll need the following:
- GIT and Node.js: Just use [npm](http://npmjs.com), it includes both and is easiest
- Electron: Follow the instructions found here: http://electron.atom.io/ or here: [Electron Quick Start](https://github.com/atom/electron-quick-start/blob/master/README.md#to-use)

It's not required, but I found it much easier to use these packages as well:
- [electron-packager](https://github.com/maxogden/electron-packager#installation)
- [electron-builder](https://github.com/loopline-systems/electron-builder#install)

When building on MacOS, you'll need to install [Wine](https://www.winehq.org/)
- The easiest way is to install via [Homebrew](https://brew.sh/)
 - `brew cask install xquartz`
 - `brew install wine`

Once you're ready to build the final app just use command `npm run dist`
