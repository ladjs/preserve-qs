# preserve-qs

[![build status](https://img.shields.io/travis/niftylettuce/preserve-qs.svg)](https://travis-ci.org/niftylettuce/preserve-qs)
[![code coverage](https://img.shields.io/codecov/c/github/niftylettuce/preserve-qs.svg)](https://codecov.io/gh/niftylettuce/preserve-qs)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/niftylettuce/preserve-qs.svg)](LICENSE)

> Preserve querystrings during redirect and creating new URLs for [Node.js][node] and browser environments (supports [Lad][], [Koa][], [Express][], and [Connect][])


## Table of Contents

* [Install](#install)
* [Usage](#usage)
  * [Custom](#custom)
  * [Browser](#browser)
  * [Koa](#koa)
  * [Express](#express)
* [Override Properties](#override-properties)
* [Blacklist Properties](#blacklist-properties)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install preserve-qs
```

[yarn][]:

```sh
yarn add preserve-qs
```


## Usage

Imagine that we have the URL `/foo/bar?beep=boop&limit=25` and we wish to redirect the user (or simply output) a new URL with pathname of `/foo/baz` – but also preserve the original querystring.

The examples below show how this package can be used for this, regardless of the environment being run in.

We assume you have imported the package in all these examples:

```js
const preserveQs = require('preserve-qs');
```

### Custom

```js
preserveQs('/foo/bar?beep=boop&limit=25', '/foo/baz');
```

### Browser

This uses `window.location.pathname` and `window.location.search`.

```js
preserveQs(window, '/foo/baz');
```

### Koa

This uses `ctx.request.originalUrl`.

```js
preserveQs(ctx, '/foo/baz');

// ctx.redirect(preserveQs(ctx, '/foo/baz'));
```

### Express

This uses `req.originalUrl`.

```js
preserveQs(req, '/foo/baz');

// res.redirect(preserveQs(req, '/foo/baz'));
```


## Override Properties

If you wish to override a property in the querystring, either from the original or the new URL, then you can pass a third argument of an object.

```js
preserveQs(req, '/foo/baz?hello=false', { hello: true });
```

In the example above, the output would have the `?hello=false` be overriden and become `?hello=true`.


## Blacklist Properties

If you wish to completely strip a single property or multiple from being included in the querystring then pass it as the third or fourth argument.

```js
preserveQs(req, '/foo/baz', [ 'page', 'limit' ]);
```

This would strip the `page` and `limit` from the URL (e.g. it would not have `?page=1&limit=10` in the URL).

You can also combine this with the `override` argument by invoking in order as `preserveQs(req, url, override, blacklist)`.


## Contributors

| Name           | Website                    |
| -------------- | -------------------------- |
| **Nick Baugh** | <http://niftylettuce.com/> |


## License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/

[node]: https://nodejs.org/

[lad]: https://lad.js.org/

[koa]: http://koajs.com/

[express]: https://expressjs.com/

[connect]: https://github.com/senchalabs/connect
