const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost:27017/webgiasu', { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});


require('./role.model');
require('./user.model');
require('./giasu.model');
require('./lophoc.model');
require('./thecancuoc.model');
require('./vitrigiasu.model');
require('./monhoc.model');