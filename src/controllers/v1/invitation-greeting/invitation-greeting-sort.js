const Sort = (f, sort) => {
  const s = sort.split(':');

  switch (s[0]) {
    case 'invitation':
      f.orderBy('invitation.name', s[1]);
      f.orderBy('invitation.invitation_greeting.modified_at', 'desc');
      break;
    default:
      f.orderBy(`invitation.invitation_greeting.${s[0]}`, s[1]);
      break;
  }
};

module.exports = {
  Sort,
};
