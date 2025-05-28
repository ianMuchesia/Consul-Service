const express = require("express");
const errors = require("../errors");
const { ValidateServiceData } = require("../utils/validate");

const parentController = express.Router();

let Parent = null;
let Service = null;

module.exports = (_parent, _service) => {
  Parent = _parent;
  Service = _service;

  parentController.post(
    "/with-services",
    CreateParentWithServices
  );
  parentController.post("/", CreateParent);
  parentController.get("/", GetParents);
  parentController.get("/:id", GetParentById);
  // parentController.put("/:id", UpdateParent);
  // parentController.delete("/:id", DeleteParent);

  return parentController;
};



const CreateParentWithServices = async (req, res) => {
  const serviceData = req.body;

  ValidateServiceData(serviceData);

  try {
    const parent = await Parent.create({
      name: serviceData.Name,
    });

    const service = await Service.create({
      id: serviceData.ID,
      parent_id: parent.id,
      aid: serviceData.Name,
      address: serviceData.Address,
      port: serviceData.Port,
      tags: serviceData.tags || [],
      meta: serviceData.Meta || {},
      check: serviceData.Check || null,
    });

    const result = await Parent.findOne({
      where: { id: parent.id },
      include: [{ model: Service, as: "services" }],
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating service:", error);
    throw new errors.BadRequestError(
      `Failed to create service: ${error.message}`
    );
  }
};

const CreateParent = async (req, res) => {
  const serviceData = req.body;

  if (!serviceData.Name) {
    throw new errors.BadRequestError("Name is required");
  }

  const existingParent = await Parent.findOne({
    where: { name: serviceData.Name },
  });

  if (existingParent) {
    throw new errors.BadRequestError(
      `Parent with name ${serviceData.Name} already exists`
    );
  }

  const parent = await Parent.create({
    name: serviceData.Name,
  });

  const result = await Parent.findOne({
    where: { id: parent.id },
    include: [{ model: Service, as: "services" }],
  });

  res.status(201).json(result);
};

const GetParents = async (req, res) => {
  const parents = await Parent.findAll({
    include: [{ model: Service, as: "services" }],
  });
  res.status(200).json(parents);
};

const GetParentById = async (req, res) => {
  const { id } = req.params;
  const parent = await Parent.findOne({
    where: { id },
    include: [{ model: Service, as: "services" }],
  });
  if (!parent) {
    throw new errors.NotFoundError(`Parent with id ${id} not found`);
  }
  res.status(200).json(parent);
};
