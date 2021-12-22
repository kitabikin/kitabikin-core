const { Ok, ErrorHandler } = require('@core/helpers/response');
const cloudinary = require('@core/config/cloudinary');

const single = async (req, res) => {
  try {
    const qInsert = await getCreate(req);

    Promise.all([qInsert]).then(async (responses) => {
      const data = responses[0];
      return Ok(data, 'Successfully upload file.', res);
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getCreate(req) {
  const folder = req.body.folder;

  const image = await cloudinary.uploader.upload(req.file.path, {
    folder: folder,
    use_filename: true,
  });

  return image;
}

module.exports = {
  single,
  getCreate,
};
