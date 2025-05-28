



const models = require('../models');

const parentController = require('./parentController');
const serviceController = require('./serviceController');


module.exports=(app,db)=>
{
    const { Parent, Service } = models(db);

    app.use('/api/parents', parentController(Parent, Service));
    app.use('/api/services', serviceController(Parent, Service));


}