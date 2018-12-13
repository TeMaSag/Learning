const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePasswords = (userPassword, databasePassword) =>
  bcrypt.compareSync(userPassword, databasePassword);

module.exports = {
  hashPassword,
  comparePasswords
};
