



const models = require('../models');

const parentController = require('./parentController');
const serviceController = require('./serviceController');


module.exports=(app,db)=>
{
    const { Parent, Service } = models(db);

    app.use('/api/v1/parents', parentController(Parent, Service));
    app.use('/api/v1/services', serviceController(Parent, Service));


}