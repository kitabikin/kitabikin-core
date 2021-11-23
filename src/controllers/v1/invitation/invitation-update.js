const { Ok, ErrorHandler } = require('@core/helpers/response');
const InvitationModel = require('@core/models/invitation/invitation.model');
const ThemeFeatureMappingModel = require('@core/models/invitation/theme-feature-mapping.model');
const ThemeFeatureColumnModel = require('@core/models/invitation/theme-feature-column.model');
const InvitationFeatureModel = require('@core/models/invitation/invitation-feature.model');
const InvitationFeatureDataModel = require('@core/models/invitation/invitation-feature-data.model');

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
  const pUniq = req.params.uniq;
  const modifiedId = req.decoded.id_user;
  const modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

  const update = req.body;

  _.assign(update, {
    id_invitation: pUniq,
    modified_id: modifiedId,
    modified_at: modifiedAt,
  });

  const qUpdate = await InvitationModel.query().first().upsertGraphAndFetch(update);

  const idInvitation = qUpdate.id_invitation;
  const idTheme = qUpdate.id_theme;
  const idEventPackage = qUpdate.id_event_package;

  const features = await ThemeFeatureMappingModel.query()
    .where('id_theme', idTheme)
    .where('id_event_package', idEventPackage)
    .where('is_active', true);

  _.map(features, async (feature) => {
    const iFeature = await InvitationFeatureModel.query()
      .where('id_invitation', idInvitation)
      .where('id_theme_feature', feature.id_theme_feature);

    let insertFeature;
    if (iFeature.length === 0) {
      const f = {
        id_invitation: idInvitation,
        id_theme_feature: feature.id_theme_feature,
        is_active: feature.is_active,
      };

      insertFeature = await InvitationFeatureModel.query().first().insertGraphAndFetch(f);
    } else {
      insertFeature = _.filter(iFeature, { id_theme_feature: feature.id_theme_feature })[0];
    }

    const columns = await ThemeFeatureColumnModel.query().where('id_theme_feature', feature.id_theme_feature);

    if (columns.length > 0) {
      _.map(columns, async (column) => {
        const iData = await InvitationFeatureDataModel.query()
          .where('id_invitation_feature', insertFeature.id_invitation_feature)
          .where('id_theme_feature_column', column.id_theme_feature_column);

        if (iData.length === 0) {
          const c = {
            id_invitation_feature: insertFeature.id_invitation_feature,
            id_theme_feature_column: column.id_theme_feature_column,
            is_active: true,
            value: column.default_value,
          };

          await InvitationFeatureDataModel.query().first().insertGraphAndFetch(c);
        }
      });
    }
  });

  return qUpdate;
}

module.exports = {
  update,
  getUpdate,
};
