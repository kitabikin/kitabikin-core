const { Ok, ErrorHandler } = require('@/helpers/response');
const InvitationModel = require('@/models/invitation/invitation.model');
const ThemeFeatureMappingModel = require('@/models/invitation/theme-feature-mapping.model');
const ThemeFeatureColumnModel = require('@/models/invitation/theme-feature-column.model');
const InvitationFeatureModel = require('@/models/invitation/invitation-feature.model');
const InvitationFeatureDataModel = require('@/models/invitation/invitation-feature-data.model');

const _ = require('lodash');

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
  const createdId = req.decoded.id_user;

  const insert = req.body;

  _.assign(insert, {
    created_id: createdId,
  });

  const qInsert = await InvitationModel.query().first().insertGraphAndFetch(insert);

  const idInvitation = qInsert.id_invitation;
  const idTheme = qInsert.id_theme;
  const idEventPackage = qInsert.id_event_package;

  const features = await ThemeFeatureMappingModel.query()
    .where('id_theme', idTheme)
    .where('id_event_package', idEventPackage)
    .where('is_active', true);

  _.map(features, async (feature) => {
    const f = {
      id_invitation: idInvitation,
      id_theme_feature: feature.id_theme_feature,
      is_active: feature.is_active,
    };

    const insertFeature = await InvitationFeatureModel.query().first().insertGraphAndFetch(f);

    const columns = await ThemeFeatureColumnModel.query().where('id_theme_feature', feature.id_theme_feature);

    if (columns.length > 0) {
      _.map(columns, async (column) => {
        const c = {
          id_invitation_feature: insertFeature.id_invitation_feature,
          id_theme_feature_column: column.id_theme_feature_column,
          is_active: true,
          value: column.default_value,
        };

        await InvitationFeatureDataModel.query().first().insertGraphAndFetch(c);
      });
    }
  });

  return qInsert;
}

module.exports = {
  create,
  getCreate,
};
