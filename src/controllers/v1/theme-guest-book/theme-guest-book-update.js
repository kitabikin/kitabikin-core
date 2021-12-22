const { Ok, ErrorHandler } = require('@core/helpers/response');
const ThemeGuestBookModel = require('@core/models/invitation/theme-guest-book.model');

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
    id_theme_guest_book: pUniq,
    modified_at: modifiedAt,
  });

  if (access === 'private') {
    _.assign(update, {
      modified_id: req.decoded.id_user,
    });
  }

  const qUpdate = await ThemeGuestBookModel.query().first().upsertGraphAndFetch(update);

  return qUpdate;
}

module.exports = {
  update,
  getUpdate,
};
