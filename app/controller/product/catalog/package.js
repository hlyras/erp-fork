const userController = require('./../../user');
const lib = require("jarmlib");

const Product = require('../../../model/product/main');
Product.catalog = require('../../../model/product/catalog/main');
Product.catalog.package = require('../../../model/product/catalog/package');

const packageController = {};

packageController.add = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  let package = new Product.catalog.package();
  package.category_id = req.body.catalog_id;
  package.package_id = req.body.package_id;
  package.price = parseFloat(req.body.price);

  let strict_params = { keys: [], values: [] };
  lib.Query.fillParam("catalog_package.category_id", package.category_id, strict_params);
  lib.Query.fillParam("catalog_package.package_id", package.package_id, strict_params);

  try {
    let packages = await Product.catalog.package.filter([], [], [], strict_params, []);
    if (packages.length) { return res.send({ msg: "Este pacote já está incluso no catálogo." }); }

    let response = await package.add();
    if (response.err) { return res.send({ msg: response.err }); }
    res.send({ done: "Pacote adicionado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao atualizar o pacote, favor contatar o suporte." });
  }
};

packageController.update = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  let package = new Product.catalog.package();
  package.id = req.body.id;
  package.price = parseFloat(req.body.price);

  try {
    let response = await package.update();
    if (response.err) { return res.send({ msg: response.err }); }
    res.send({ done: "Pacote atualizado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao atualizar o pacote, favor contatar o suporte." });
  }
};

packageController.remove = async (req, res) => {
  if (!await userController.verifyAccess(req, res, ['adm'])) {
    return res.send({ unauthorized: "Você não tem permissão para realizar essa ação." });
  };

  try {
    await Product.catalog.package.remove(req.params.id);
    res.send({ done: "Pacote removido com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar os pacotes do catálogo, favor contatar o suporte." });
  }
};

module.exports = packageController;