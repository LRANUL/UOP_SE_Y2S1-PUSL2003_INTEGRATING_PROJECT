const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'builds/'),
    authors: 'Team Quinn',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'NSBM-Hub-Management-System.exe',
    setupExe: 'NSBM-Hub-Management-System.exe',
    setupIcon: path.join(rootPath,'assets','icon','icon.ico')
  })
}