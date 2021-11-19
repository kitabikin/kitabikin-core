const Sort = (f, sort) => {
  const s = sort.split(':');

  switch (s[0]) {
    case 'theme':
      f.orderBy('theme.name', s[1]);
      f.orderBy('invitation.theme.modified_at', 'desc');
      break;
    case 'theme_category':
      f.orderBy('theme:theme_category.name', s[1]);
      f.orderBy('invitation.theme.modified_at', 'desc');
      break;
    case 'event':
      f.orderBy('theme:theme_category:event.name', s[1]);
      f.orderBy('invitation.theme.modified_at', 'desc');
      break;
    default:
      f.orderBy(`invitation.theme_feature.${s[0]}`, s[1]);
      break;
  }
};

module.exports = {
  Sort,
};
