/**
 * Copy all files end with ".md" in sourceFolder to targetFolder
 * use node.js
 * @author cccatmint
 */

const fs = require('fs'); // Import the fs module to access the file system

// Define the source and target folders
const sourceFolder = '../notes';
const targetFolder = './target';

// Check if the target folder exists. If it does not, create it.
if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
}

// Read the contents of the source folder, including subdirectories
const files = fs.readdirSync(sourceFolder, { withFileTypes: true });

// Loop through the files and directories in the source folder
files.forEach((file) => {
    // If the file is a directory, recursively call the function to read its contents
    if (file.isDirectory()) {
        copyMdFilesToTargetFolder(file.name);
    }
});


function copyMdFilesToTargetFolder(folder) {
    // Read the contents of the source folder, including subdirectories
    const files = fs.readdirSync(`${sourceFolder}/${folder}`, { withFileTypes: true });

    // Loop through the files and directories in the source folder
    files.forEach((file) => {
        // If the file is a directory, recursively call the function to read its contents
        if (file.isDirectory()) {
            copyMdFilesToTargetFolder(`${folder}/${file.name}`);
        } else {
            // Check if the file has the ".md" file extension
            if (file.name.endsWith('.md')) {
                // If it does, read the file and copy its contents to the target folder
                const fileContents = fs.readFileSync(`${sourceFolder}/${folder}/${file.name}`);
                fs.writeFileSync(`${targetFolder}/${file.name}`, fileContents);
            }
        }
    });
}


