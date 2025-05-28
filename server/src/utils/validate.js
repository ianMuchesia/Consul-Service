const errors = require("../errors");


exports.ValidateServiceData = (serviceData) => {
  // Validate required fields
  const requiredFields = ["Name", "ID", "Address", "Port"];
  const missingFields = requiredFields.filter((field) => !serviceData[field]);

  if (missingFields.length > 0) {
    throw new errors.BadRequestError(
      `Missing required fields: ${missingFields.join(", ")}`
    );
  }

  // Validate Port is a number
  if (typeof serviceData.Port !== "number") {
    throw new errors.BadRequestError("Port must be a number");
  }

  // Validate tags is an array if present
  if (serviceData.tags && !Array.isArray(serviceData.tags)) {
    throw new errors.BadRequestError("Tags must be an array");
  }

  // Validate Meta is an object if present
  if (
    serviceData.Meta &&
    (typeof serviceData.Meta !== "object" || Array.isArray(serviceData.Meta))
  ) {
    throw new errors.BadRequestError("Meta must be an object");
  }

  // Validate Check structure if present
  if (serviceData.Check) {
    if (
      typeof serviceData.Check !== "object" ||
      Array.isArray(serviceData.Check)
    ) {
      throw new errors.BadRequestError("Check must be an object");
    }

    // Validate Check required fields if Check is provided
    // const checkRequiredFields = ['HTTP', 'Interval', 'Timeout'];
    // const missingCheckFields = checkRequiredFields.filter(field => !serviceData.Check[field]);

    // if (missingCheckFields.length > 0) {
    //   throw new errors.BadRequestError(
    //     `Missing required Check fields: ${missingCheckFields.join(", ")}`
    //   );
    // }
  }
};