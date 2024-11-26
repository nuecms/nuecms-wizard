import * as crypto from 'crypto';

export const makeSalt = (length = 8) => {
  let result = '';
  while (result.length < length) {
    result += crypto.createHash('sha1').update(crypto.randomBytes(16).toString('hex')).digest('hex');
  }
  return result.substring(0, length);
}
