const { error } = require('console');
const fs = require('fs');
const util = require('util');

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

const read_Save = (content, file) => {
    return readNote(file, 'utf8')
    .then((data) => {
        const parsedData = JSON.parse(data)
        parsedData.push(content)
        return writeNote(file, JSON.stringify(parsedData, null, 4))
    })
    .catch((err) => {
        console.error('Error saving note to the file!', err)
        throw error
    })
}

module.exports = {
    readNote,
    writeNote,
    read_Save
}