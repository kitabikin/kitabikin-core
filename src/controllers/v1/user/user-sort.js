const Sort = (f, sort) => {
  const s = sort.split(':');

  switch (s[0]) {
    case 'profile':
      f.orderBy('profile.name', s[1]);
      f.orderBy('sso.user.modified_at', 'desc');
      break;
    default:
      f.orderBy(`sso.user.${s[0]}`, s[1]);
      break;
  }
};

module.exports = {
  Sort,
};
