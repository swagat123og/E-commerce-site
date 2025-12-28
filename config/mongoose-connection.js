const mongoose = require('mongoose');
const debug = require('debug');
const config=require('config')
const dbgr = debug('development:mongoose');


mongoose
  .connect(`${config.get("MONGODB_URI")}/baggers`)
  .then(() => {
    dbgr("✅ Database Connected");
  })
  .catch((err) => {
    dbgr("❌ Database Error:", err);
  });

module.exports = mongoose.connection;
// baggers