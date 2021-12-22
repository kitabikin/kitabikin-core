const Sort = (f, sort) => {
  const s = sort.split(':');

  switch (s[0]) {
    case 'theme':
      f.orderBy('theme.name', s[1]);
      f.orderBy('invitation.theme_guest_book.modified_at', 'desc');
      break;
    default:
      f.orderBy(`invitation.theme_guest_book.${s[0]}`, s[1]);
      break;
  }
};

module.exports = {
  Sort,
};
