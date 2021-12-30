const { Ok, ErrorHandler } = require('@core/helpers/response');
const { GenerateQRCode } = require('@core/helpers/qrcode');
const InvitationGuestBookModel = require('@core/models/invitation/invitation-guest-book.model');

const fs = require('fs');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const XLSX = require('xlsx');

const upload = async (req, res) => {
  try {
    const qInsert = await getUpload(req);

    Promise.all([qInsert]).then(async (responses) => {
      const data = responses[0];
      return Ok(data, 'Successfully added data.', res);
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getUpload(req) {
  const insert = req.body;

  const appUrl = process.env.APP_URL;
  const file = req.file.path;

  const buf = fs.readFileSync(file);
  const wb = XLSX.read(buf, { type: 'buffer' });

  const modifyData = (myArray) => {
    const promises = _.map(myArray, async (item) => {
      const id = uuidv4();
      const qrCodeUrl = `${appUrl}api/invitation-guest-book/${id}`;
      const qrCode = await GenerateQRCode(qrCodeUrl);

      return {
        id_invitation_guest_book: id,
        id_invitation: insert.id_invitation,
        name: item.nama,
        address: item.alamat,
        no_telp: item.no_telepon,
        type: item.jenis,
        from: 'admin',
        confirmation: 'notyet',
        qr_code: qrCode,
        qr_code_url: qrCodeUrl,
      };
    });

    return Promise.all(promises);
  };

  wb.SheetNames.forEach(async (sheetName) => {
    const jsonObject = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);

    const result = await modifyData(jsonObject);
    const qInsert = await InvitationGuestBookModel.query().insertGraphAndFetch(result);
    return qInsert;
  });
}

module.exports = {
  upload,
  getUpload,
};
