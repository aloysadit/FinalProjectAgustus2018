// function (value) {return(kondisi)}
//diubah jadi value => <kondisi>; supaya singkat sekalian bikin variabelnya

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

// ini fungsi validasi untuk cek apakah undefined, null, obyek kosong, atau string kosong. Kalau validator kosong, sebenernya yang kepake hanya fungsi empty string sih nantinya (""), tapi takut diisi lain.

module.exports = isEmpty;

// jangan lupa dieksport biar bisa dipake
