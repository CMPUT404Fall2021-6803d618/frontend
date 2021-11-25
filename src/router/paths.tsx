const LOGIN = "/login";
const REGISTER = "/register";
const HOME = "/home";
const INBOX = "/inbox/:id";
const INBOX_NOTIFICATIONS = "/inbox/notifications";
const INBOX_FOLLOW_REQUESTS = "/inbox/follow-requests";
const SOCIAL = "/social/:id";
const SOCIAL_PEOPLE = "/social/people";
const SOCIAL_FOLLOWERS = "/social/followers";
const SOCIAL_FOLLOWINGS = "/social/followings";
const SOCIAL_FRIENDS = "/social/friends";
const POST_CREATE = "/posts/create";
const POST_DETAIL = "/post/:id";

const PROFILE = "/profile/:id";

export const paths = {
  LOGIN,
  REGISTER,
  HOME,
  SOCIAL,
  SOCIAL_PEOPLE,
  SOCIAL_FOLLOWERS,
  SOCIAL_FOLLOWINGS,
  SOCIAL_FRIENDS,
  PROFILE,
  INBOX,
  INBOX_NOTIFICATIONS,
  INBOX_FOLLOW_REQUESTS,
  POST_CREATE,
  POST_DETAIL,
};
