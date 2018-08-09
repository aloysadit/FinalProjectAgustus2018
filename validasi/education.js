const validator = require("validator");
const isEmpty = require("./is.Empty");

// module.exports = function validateRegisterInput(data) {
//   let errors = {};
module.exports = function validateExperienceInput(data) {
  let errors = {};


  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";


  if (validator.isEmpty(data.school)) {
    errors.school = "Job school is required";
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "degree field is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "fieldofstudy date field is required";
  }


  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
