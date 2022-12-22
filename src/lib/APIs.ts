import {get, post} from './index';

const host = 'https://egback.loca.lt';

const getNoticeList = () => {
  const url = `${host}/notice/getNoticeList`;

  return get({url});
};

const signupRequest = (body: object) => {
  const url = `${host}/users/signup`;
  return post({url, body});
};

const signIn = (body: object) => {
  const url = `${host}/users/login`;
  return post({url, body});
};

const checkEmail = (body: object) => {
  const url = `${host}/users/emailCheck`;
  return post({url, body});
};

const APIs = {
  getNoticeList,
  signupRequest,
  signIn,
  checkEmail,
};

export default APIs;
