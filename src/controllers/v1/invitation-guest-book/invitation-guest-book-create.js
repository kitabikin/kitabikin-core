const { Ok, ErrorHandler } = require('@/helpers/response');
const { GenerateQRCode } = require('@/helpers/qrcode');
const InvitationGuestBookModel = require('@/models/invitation/invitation-guest-book.model');

const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

const create = async (req, res) => {
  try {
    const qInsert = await getCreate(req);

    Promise.all([qInsert]).then(async (responses) => {
      const data = responses[0];
      return Ok(data, 'Successfully added data.', res);
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getCreate(req) {
  const insert = req.body;

  const id = uuidv4();
  const appUrl = process.env.APP_URL;

  const qrCodeUrl = `${appUrl}api/invitation-guest-book/${id}`;
  const qrCode = await GenerateQRCode(qrCodeUrl);

  _.assign(insert, {
    id_invitation_guest_book: id,
    qr_code: qrCode,
    qr_code_url: qrCodeUrl,
  });

  const qInsert = await InvitationGuestBookModel.query().first().insertGraphAndFetch(insert);

  return qInsert;
}

module.exports = {
  create,
  getCreate,
};
