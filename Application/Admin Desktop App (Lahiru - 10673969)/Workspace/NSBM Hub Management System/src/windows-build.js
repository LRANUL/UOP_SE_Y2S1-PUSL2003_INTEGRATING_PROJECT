// Importing the necessary modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');

// Defining the input and output directory
// The directories must be absolute, not relative 
// SAMPLE:
// appDirectory: "C:\\Users\LucasLHH\Desktop\iSAM-App-win32-x64"
// Pathway of locating the windows release version of the application
const APP_DIR = path.resolve(__dirname, './../release-builds/NSBM-Hub-MS-win32-ia32');

// SAMPLE:
// outputDirectory: "C:\\Users\LucasLHH\Desktop\windows_installer"
// Pathway to where to deploy installation file
const OUT_DIR = path.resolve(__dirname, './../release-builds/nsbm-hub-ms-setup-x86-1.0.0');

// Instantiating the MSICreator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    // Configuring the metadata
    description: 'NSBM Hub Management System',
    exe: 'NSBM-Hub-MS',
    name: 'NSBM Hub Management System',
    manufacturer: 'Team Quinn',
    version: '1.0.0',

    // Configuring the installer user interface
    ui: {
      chooseDirectory: true,
      "images": {
        "background": path.resolve(__dirname, './assets/images/desktop-setup-installation-images/nsbm_hub_setup_background.png'),
        "banner": path.resolve(__dirname, './assets/images/desktop-setup-installation-images/nsbm_hub_setup_banner.png')
      }
    },
});


// Creating a .wxs template file
msiCreator.create().then(function(){

  // Compiling the template to a .msi file
   msiCreator.compile();

});