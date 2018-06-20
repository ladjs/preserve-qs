const URL = require('url-parse');

const preserveQs = (ctx, str, override = {}, blacklist = []) => {
  if (Array.isArray(override)) {
    blacklist = override;
    override = {};
  }

  let originalUrl;

  // support Node.js (Koa/Express) and browser environments
  if (typeof ctx === 'string') originalUrl = ctx;
  else if (typeof ctx === 'object') {
    if (
      typeof ctx.request === 'object' &&
      typeof ctx.request.originalUrl === 'string'
    )
      ({ originalUrl } = ctx.request);
    else if (typeof ctx.originalUrl === 'string') ({ originalUrl } = ctx);
    else if (
      typeof ctx.location === 'object' &&
      typeof ctx.location.pathname === 'string' &&
      typeof ctx.location.search === 'string'
    )
      originalUrl = ctx.location.pathname + ctx.location.search;
  }

  // throw an error if we didn't have a valid original URL passed
  if (!originalUrl || typeof originalUrl !== 'string')
    throw new Error('URL could not be parsed');

  // throw an error if we didn't have a valid string passed
  if (!str || typeof str !== 'string')
    throw new Error('New path must be a string');

  originalUrl = new URL(originalUrl);

  const url = new URL(str);
  const path =
    url.origin === 'null' ? url.pathname : `${url.origin}${url.pathname}`;
  const query = Object.assign(
    {},
    URL.qs.parse(originalUrl.query),
    URL.qs.parse(url.query),
    override
  );
  if (Array.isArray(blacklist) && blacklist.length > 0)
    blacklist.forEach(prop => {
      delete query[prop];
    });
  const qs = URL.qs.stringify(query, true);
  return path + qs;
};

module.exports = preserveQs;
