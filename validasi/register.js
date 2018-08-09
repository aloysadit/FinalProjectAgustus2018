const validator = require("validator");
const isEmpty = require("./is.Empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  // data nama tidak Empty maka isinya data.nama
  // selain itu(?), data.nama adalah string kosong
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Nama hanya boleh 2 - 30 karakter";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Wajib Isi Nama Kamu";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Wajib Isi Email Kamu";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email sudah terdaftar / salah penulisan";
    // isEmail dari dokumentasi Validator
    //jika validator baca BUKAN bentuk EMAIL, maka ada tulisan di atas
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password wajib diisi";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password minimal 6 karakter";
  }

  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Konfirmasi Password wajib diisi";
  }

  if (!validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Password dan Konfirmasi Password tidak sama";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
