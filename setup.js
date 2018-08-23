const { Parcel } = require('./models');
const { createReadStream, readFileSync } = require('fs');
const path = require('path');
const parse = require('csv-parse');

const { Writable } = require('stream');

const columns = readFileSync(path.join(__dirname, 'data.csv')).toString().split('\n')[0].split(',');

// Wrap Model.create with a writable stream.
// Prevents too many objects being loaded into memory
const ParcelStream = new Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
        Parcel.create(chunk)
            .then(() => {
                callback() // signals stream to move to the next chunk
            }).catch(err => { 
                console.log(err);
                console.log(chunk);
                process.exit(0);

            });
    }
});

const parser = parse({ 
    columns: true,
    cast: true, // tries to cast values in csv to proper JS type
});

const csvStream = createReadStream(path.join(__dirname, 'data.csv'));

Parcel.sync({ force: true }).then(() => {
    csvStream
        .pipe(parser)
        .pipe(ParcelStream)
});
