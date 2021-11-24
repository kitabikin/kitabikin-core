const Sort = (f, sort) => {
  const s = sort.split(':');

  switch (s[0]) {
    case 'theme_feature':
      f.orderBy('theme_feature.order', s[1]);
      f.orderBy('theme_feature:theme_feature_column.order', s[1]);
      f.orderBy('invitation.invitation_feature.id_invitation_feature', 'desc');
      break;
    default:
      f.orderBy(`invitation.invitation_feature.${s[0]}`, s[1]);
      break;
  }
};

module.exports = {
  Sort,
};
