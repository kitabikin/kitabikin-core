const QRCode = require('qrcode');

const GenerateQRCode = async (url) => {
  const opts = {
    errorCorrectionLevel: 'L',
    margin: 4,
    scale: 8,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  };

  return QRCode.toDataURL(url, opts)
    .then((url) => {
      return url;
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  GenerateQRCode,
};
