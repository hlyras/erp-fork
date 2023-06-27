const countController = {};

countController.confirm = async (req, res) => {
  const production_receipt = new Production.receipt();
  production_receipt.id = req.body.id;
  production_receipt.count_datetime = lib.date.timestamp.generate();
  production_receipt.status = req.body.status;

  try {
    let verifiedUser = await userController.verifyPass(req.body.user_pass, ["adm"]);
    if (!verifiedUser) { return res.send({ msg: "Você não tem acesso para realizar essa ação." }); }

    production_receipt.count_user_id = verifiedUser.id;

    let response = await production_receipt.update();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "Produção atualizada com sucesso!" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao realizar o registro." });
  };
};