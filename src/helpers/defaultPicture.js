import md5 from 'crypto-js/md5';

export default function getPicture(name, gravatarEmail) {
  // const defaultPicture = encodeURI(`https://ui-avatars.com/api//${name}/80/random`);
  // return `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}?d=${defaultPicture}`;
  return `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
}
