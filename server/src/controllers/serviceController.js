const express = require("express");
const errors = require("../errors");
const { ValidateServiceData } = require("../utils/validate");


const serviceController = express.Router();

let Parent = null;
let Service = null;


module.exports = (_parent, _service) => {
    Parent = _parent;
    Service = _service;
    
    serviceController.post("/", CreateService);
    serviceController.get("/", GetServices);
    serviceController.get("/:id", GetServiceById);
    serviceController.get("/parent/:parentId",GetServiceByParentId);
    serviceController.put("/:id", UpdateService);
    serviceController.delete("/:id", DeleteService);
    
    return serviceController;
    }


const GetServices = async (req, res) => {
    const services = await Service.findAll({
        include: [{ model: Parent, as: "parent" }],
    });
    res.status(200).json(services);
}


const GetServiceById = async (req, res) => {
    const { id } = req.params;
    const service = await Service.findOne({
        where: { id },
        include: [{ model: Parent, as: "parent" }],
    });
    if (!service) {
        throw new errors.NotFoundError(`Service with id ${id} not found`);
    }
    res.status(200).json(service);
};


const CreateService = async (req, res) => {
    
    //valdate request body
    ValidateServiceData(req.body);

    //check if parent name exists
    const parent = await Parent.findOne({
        where: { name: req.body.Name },
    });

    if (!parent) {
        throw new errors.NotFoundError(`Parent with name ${req.body.Name} not found`);
    }


    const service = await Service.create({
        id: req.body.ID,
        parent_id: parent.id,
        aid: req.body.Name,
        address: req.body.Address,
        port: req.body.Port,
        tags: req.body.tags || [],
        meta: req.body.Meta || {},
        check: req.body.Check || null,
    });

    // Fetch the service with its parent for the response
    const serviceWithParent = await Service.findOne({
        where: { id: service.id },
        include: [{ model: Parent, as: "parent" }],
    });
    res.status(201).json(serviceWithParent);
}


const GetServiceByParentId = async (req, res) => {
    const { parentId } = req.params;
    const services = await Service.findAll({
        where: { parent_id: parentId },
        include: [{ model: Parent, as: "parent" }],
    });
   
    res.status(200).json(services);
}

const UpdateService = async (req, res) => {
    const { id } = req.params;
    const { name, description, parent_id } = req.body;
    const service = await Service.findByPk(id);
    if (!service) {
        throw new errors.NotFoundError(`Service with id ${id} not found`);
    }
    service.name = name;
    service.description = description;
    service.parent_id = parent_id;
    await service.save();
    res.status(200).json(service);
};

const DeleteService = async (req, res) => {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
        throw new errors.NotFoundError(`Service with id ${id} not found`);
    }
    await service.destroy();
    res.status(204).send();
};



