const test = require('ava');

const preserveQs = require('../lib');

const environments = [
  // custom
  '/beep?foo=bar&hello=true',
  // custom with full url
  'http://localhost:3000/beep?foo=bar&hello=true',
  // browser
  { location: { pathname: '/beep', search: '?foo=bar&hello=true' } },
  // koa
  { request: { originalUrl: '/beep?foo=bar&hello=true' } },
  // express
  { originalUrl: '/beep?foo=bar&hello=true' }
];

environments.forEach(environment => {
  test('preserves original querystring', t => {
    t.is(preserveQs(environment, '/boop'), '/boop?foo=bar&hello=true');
  });

  test('merges old with new querystring', t => {
    t.is(
      preserveQs(environment, '/boop?hello=false'),
      '/boop?foo=bar&hello=false'
    );
  });
});

test('allows new origin', t => {
  t.is(
    preserveQs(environments[0], 'http://hello.world/boop?hello=false'),
    'http://hello.world/boop?foo=bar&hello=false'
  );
});

test('throws error with invalid original url', t => {
  const error = t.throws(() => preserveQs());
  t.regex(error.message, /URL could not be parsed/);
});

test('throws error with invalid string for new url', t => {
  const error = t.throws(() => preserveQs('/'));
  t.regex(error.message, /New path must be a string/);
});

test('should blacklist properties passed', t => {
  t.is(
    preserveQs(environments[0], '/boop?hello=false', ['foo']),
    '/boop?hello=false'
  );
});
