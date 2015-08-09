# http-header-link [![Code Climate](https://codeclimate.com/github/ileri/http-header-link/badges/gpa.svg)](https://codeclimate.com/github/ileri/http-header-link) [![Build Status](https://travis-ci.org/ileri/http-header-link.svg)](https://travis-ci.org/ileri/http-header-link) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
> Stringify and parse the HTTP Link Header as per [RFC 5988](https://tools.ietf.org/html/rfc5988#section-5.3)

## `stringify(obj, <optional language (default: en-US)>)`
Stringifies the content of `obj` for usage with the `Link`-header. `obj` can be
either an array containing objects with href and parameter names as keys or a
non-array object with the relation as key and a single href as string or
multiple hrefs as array as value.

Extended values using [RFC 5987](https://tools.ietf.org/html/rfc5987) are either
represented as strings, in which case the optional language argument will be
used, or as objects with the properties value and lang. Note that those extended
values can only occur in the array variant of calling stringify.

### Examples

#### Using a non-array object
```js
httpHeaderLink.stringify({
    self: '/a',
    item: ['/a/0', '/a/1', '/a/2']
  }) // returns </a>; rel="self", </a/0>; rel="item", </a/1>; rel="item", </a/2>; rel="item"
```

#### Using an array
```js
httpHeaderLink.stringify([{
    rel: 'self',
    href: '/a'
  }, {
    rel: 'item',
    href: '/a/0',
    title: 'something'
  }, {
    rel: 'item',
    href: '/a/1',
    'title*': 'sômêthîng êlsê'
  }, {
    rel: 'item',
    href: '/a/2',
    'title*': {
      value: 'sóméthèng èlsê',
      lang: 'fr'
    }
  }], 'de-DE') // returns </a>; rel="self", </a/0>; rel="item"; title="something", </a/1>; rel="item"; title*=UTF-8'de-DE's%C3%B4m%C3%AAth%C3%AEng%20%C3%AAls%C3%AA, </a/2>; rel="item"; title*=UTF-8'fr's%C3%B3m%C3%A9th%C3%A8ng%20%C3%A8ls%C3%AA
```
