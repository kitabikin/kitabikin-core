const { ErrorHandler } = require('@core/helpers/response');

const { getList } = require('./invitation-guest-book-list');

const _ = require('lodash');
const PDFDocument = require('pdfkit');

const download = async (req, res) => {
  try {
    const qList = await getList(req);
    await getDownload(req, res, qList);
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getDownload(req, res, qList) {
  const download = req.query.download;

  switch (download) {
    case 'pdf-qrcode':
      getPdfQRCode(req, res, qList);
      break;
    default:
      break;
  }
}

async function getPdfQRCode(req, res, qList) {
  const doc = new PDFDocument({ size: 'A4', margin: 50, bufferPages: true });

  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);

    res
      .status(200)
      .header('Content-Type', 'application/pdf')
      .header('Access-Control-Allow-Origin', '*')
      .header('Content-Disposition', 'attachment; filename=Untitled.pdf')
      .end(pdfData);
  });

  const box = Number(req.query.size);
  const margin = 30;
  const space = 10;

  let width = margin;
  let height = margin;

  doc.fontSize(7);

  _.map(qList, (item, index) => {
    if (height > 680) {
      doc.addPage();
      height = margin;
    }

    doc.image(item.qr_code, width, height, { fit: [box, box] });
    doc.text(item.name, width + 15, height + box);

    if ((index + 1) % 3 === 0) {
      width = margin;
      height += box + space + 10;
    } else {
      width += box + space;
    }
  });

  doc.end();
}

module.exports = {
  download,
  getDownload,
};
