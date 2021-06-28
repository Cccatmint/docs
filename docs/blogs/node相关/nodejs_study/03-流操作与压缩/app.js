const fs = require('fs')

const zlib = require('zlib')
const gzip = zlib.createGzip()

const readStream = fs.createReadStream('./note.txt')
const writeStream = fs.createWriteStream('./note.gzip')

readStream
  .pipe(gzip)
  .pipe(writeStream)