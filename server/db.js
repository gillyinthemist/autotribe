const mongoose = require('mongoose');
const DB_PORT = 27017;
const DB_NAME = 'autotribe';

async function main () {
  try {
    await mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`);
    console.log(`🦆 Database (AutoTribe) connected @ port ${DB_PORT}!`);
  } catch (error) {
    console.error(`😞 Sorry, something went wrong! ${error}`);
  }
}
main();

module.exports = mongoose;
