const { OkList, ErrorNotFound, ErrorHandler } = require('@/helpers/response');
const InvitationFeatureModel = require('@/models/invitation/invitation-feature.model');

const list = async (req, res) => {
  try {
    const data = await getList(req);

    if (data.length > 0) {
      return OkList(data, {}, 'Retrieve data successfully.', res);
    } else {
      return ErrorNotFound('Data not found.', res);
    }
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getList(req) {
  const access = req.access;
  const code = req.query.code;

  const fUser = (f) => {
    if (access === 'private') {
      const { id_user: idUser, role } = req.decoded;

      if (role === 'event-client') {
        f.andWhere('invitation.id_user', idUser);
        f.andWhere('theme_feature.is_admin', false);
      }
    }
  };

  const qList = await InvitationFeatureModel.query()
    .alias('invitation_feature')
    .select(
      'theme_feature.id_theme_feature',
      'invitation_feature.id_invitation_feature',
      'theme_feature.code',
      'theme_feature.name as label',
      'theme_feature.order',
      'invitation_feature.is_active'
    )
    .join(
      'invitation.invitation as invitation',
      'invitation.id_invitation',
      'invitation_feature.id_invitation'
    )
    .join(
      'invitation.theme_feature as theme_feature',
      'theme_feature.id_theme_feature',
      'invitation_feature.id_theme_feature'
    )
    .where('invitation.code', code)
    .modify(fUser)
    .orderBy('theme_feature.order', 'asc')
    .withGraphFetched('invitation_feature_data as data')
    .modifyGraph('data', (builder) => {
      const fUser = (f) => {
        if (access === 'private') {
          const { role } = req.decoded;

          if (role === 'event-client') {
            f.where('theme_feature_column.is_admin', false);
          }
        }
      };

      builder
        .alias('invitation_feature_data')
        .select(
          'theme_feature_column.id_theme_feature_column',
          'invitation_feature_data.id_invitation_feature_data',
          'theme_feature_column.code',
          'theme_feature_column.label',
          'theme_feature_column.label_helper',
          'theme_feature_column.configuration',
          'theme_feature_column.order',
          'invitation_feature_data.is_active',
          'theme_feature_column.default_value',
          'invitation_feature_data.value'
        )
        .join(
          'invitation.theme_feature_column as theme_feature_column',
          'theme_feature_column.id_theme_feature_column',
          'invitation_feature_data.id_theme_feature_column'
        )
        .modify(fUser)
        .orderBy('theme_feature_column.order', 'asc');
    });

  return qList;
}

module.exports = {
  list,
};
