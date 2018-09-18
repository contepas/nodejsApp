const fs = require('fs');

function mergeValues(values, content){
    //replace all {{key}} with the value from the values object
    for(let key in values){
        content = content.replace(`{{${key}}}`, values[key]);
    }
    //return mergedContent
    return content;
}

// function that handle the reading of files and marge in values
//  + read from file and get a string
//  + marges values into string

function view(templateName, values, response) {
    //read from the template file
    let fileContents = fs.readFileSync(`./views/${templateName}.html`, {encoding: 'utf8'});
    //insert value into content
    fileContents = mergeValues(values, fileContents);
    //write out to the response
    response.write(fileContents);
}

module.exports.view = view;