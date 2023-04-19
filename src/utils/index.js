
export const sanitizeHTML = function (str) {
  return str.replace(/<[^>]*>?/gm, '').trim();
}

export const isEmail = function (email) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}

export const nl2br = function (str) {
  return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
}