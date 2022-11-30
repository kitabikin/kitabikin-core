const { Ok, ErrorNotFound, ErrorHandler } = require('@/helpers/response');
const InvitationGuestBookTemplateModel = require('@/models/invitation/invitation-guest-book-template.model');

const _ = require('lodash');

const read = async (req, res) => {
  try {
    const qRead = await getRead(req);

    Promise.all([qRead]).then(async (responses) => {
      const data = responses[0];

      if (_.isEmpty(data) === false) {
        return Ok(data, 'Retrieve data successfully.', res);
      } else {
        return ErrorNotFound('Data not found.', res);
      }
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getRead(req) {
  const pUniq = req.params.uniq;

  const qRead = await InvitationGuestBookTemplateModel.query().first().findById(pUniq);

  return qRead;
}

module.exports = {
  read,
  getRead,
};
