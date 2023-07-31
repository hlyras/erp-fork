const userController = require('./../../user/main');

const { uploadFileS3, deleteFileS3 } = require("../../../middleware/s3");
const { compressImage } = require("../../../middleware/sharp");

const fs = require("fs");

const Product = require('../../../model/product/main');
Product.package = require('../../../model/product/package/main');
Product.package.image = require('../../../model/product/package/image');

const imageController = {};

imageController.upload = async (file, package_id) => {
	try {
		let newPath = await compressImage(file, 425);
		let imageData = await uploadFileS3(newPath, file.filename.split('.')[0] + '.png', "/produtos");

		fs.promises.unlink(newPath);
		file.mimetype != 'image/png' && fs.promises.unlink(file.path);

		let image = new Product.package.image();
		image.package_id = package_id;
		image.etag = imageData.ETag.replaceAll(`"`, "");
		image.url = imageData.Location;
		image.keycode = imageData.Key;
		await image.save();

		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

imageController.deleteByPackageId = async (package_id) => {
	try {
		const images = await Product.package.image.list(package_id);

		for (let i in images) {
			await Product.package.image.delete(images[i].id);
			if (images[i].keycode) { await deleteFileS3(images[i].keycode); }
		};

		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

imageController.delete = async (req, res) => {
	if (!await userController.verifyAccess(req, res, ['adm', 'man', 'adm-man', 'adm-vis'])) {
		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	};

	try {
		const image = (await Product.package.image.findById(req.params.id))[0];

		await Product.package.image.delete(image.id);
		if (image.keycode) { await deleteFileS3(image.keycode); }

		res.send({ done: 'Imagem deletada com sucesso!' });
	} catch (err) {
		console.log(err);
		res.send({ msg: 'Ocorreu um erro ao excluir a imagem.' });
	}
};

module.exports = imageController;