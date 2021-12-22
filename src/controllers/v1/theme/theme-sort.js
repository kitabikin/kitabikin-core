const Sort = (f, sort) => {
  const s = sort.split(':');

  switch (s[0]) {
    case 'theme_category':
      f.orderBy('theme_category.name', s[1]);
      f.orderBy('invitation.theme.modified_at', 'desc');
      break;
    case 'event':
      f.orderBy('theme_category:event.name', s[1]);
      f.orderBy('invitation.theme.modified_at', 'desc');
      break;
    case 'theme_greeting':
      f.orderBy('theme_greeting.name', s[1]);
      f.orderBy('invitation.theme.modified_at', 'desc');
      break;
    default:
      f.orderBy(`invitation.theme.${s[0]}`, s[1]);
      break;
  }
};

module.exports = {
  Sort,
};
