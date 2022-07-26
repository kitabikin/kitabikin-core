const { Ok, ErrorHandler } = require('@/helpers/response');
const InvitationGuestBookTemplateModel = require('@/models/invitation/invitation-guest-book-template.model');

const moment = require('moment');
const _ = require('lodash');

const update = async (req, res) => {
  try {
    const qUpdate = await getUpdate(req);

    Promise.all([qUpdate]).then(async (responses) => {
      const data = responses[0];
      return Ok(data, 'Successfully changed data.', res);
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getUpdate(req) {
  const access = req.access;
  const pUniq = req.params.uniq;
  const modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

  const update = req.body;

  _.assign(update, {
    id_invitation_guest_book_template: pUniq,
    modified_at: modifiedAt,
  });

  if (access === 'private') {
    _.assign(update, {
      modified_id: req.decoded.id_user,
    });
  }

  const qUpdate = await InvitationGuestBookTemplateModel.query().first().upsertGraphAndFetch(update);

  return qUpdate;
}

module.exports = {
  update,
  getUpdate,
};
