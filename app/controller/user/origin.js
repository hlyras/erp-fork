const lib = require("jarmlib");

const Outcome = require('../../model/financial/outcome');

const originController = {};

originController.verifyPass = async (pass, access) => {
  if (!pass || pass.length < 4) { return false; }

  let user = (await Outcome.findByPass(pass))[0];
  if (!user) { return false; }

  for (let i in access) {
    if (access[i] == user.access) {
      return user;
    };
  };

  return false;
};

module.exports = originController;