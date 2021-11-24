const Sort = (f, sort) => {
  const s = sort.split(':');

  switch (s[0]) {
    case 'user':
      f.orderBy('user.username', s[1]);
      f.orderBy('invitation.invitation.modified_at', 'desc');
      break;
    case 'profile':
      f.orderBy('user:profile.name', s[1]);
      f.orderBy('invitation.invitation.modified_at', 'desc');
      break;
    case 'event':
      f.orderBy('event.name', s[1]);
      f.orderBy('invitation.invitation.modified_at', 'desc');
      break;
    case 'event_package':
      f.orderBy('event_package.name', s[1]);
      f.orderBy('invitation.invitation.modified_at', 'desc');
      break;
    case 'theme_category':
      f.orderBy('theme_category.name', s[1]);
      f.orderBy('invitation.invitation.modified_at', 'desc');
      break;
    case 'theme':
      f.orderBy('theme.name', s[1]);
      f.orderBy('invitation.invitation.modified_at', 'desc');
      break;
    default:
      f.orderBy(`invitation.invitation.${s[0]}`, s[1]);
      break;
  }
};

module.exports = {
  Sort,
};
