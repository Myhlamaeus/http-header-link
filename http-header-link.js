import {encode as encodeExtended} from 'rfc-5987-encoding'

export function stringify (data, lang = 'en-US') {
  if (typeof data !== 'object') {
    throw new TypeError('data is not an object')
  }

  let links
  if (Array.isArray(data)) {
    links = data
  } else {
    links = []

    for (let rel of Object.keys(data)) {
      const hrefs = Array.isArray(data[rel]) ? data[rel] : [data[rel]]

      links.push(...(hrefs.map(href => true && {
        rel, href
      })))
    }
  }

  return links.map(function (link) {
    if (!('href' in link)) {
      throw new Error('A link is missing its href')
    }
    if (!('rel' in link)) {
      throw new Error('A link is missing its rel')
    }

    if (Array.isArray(link.rel)) {
      link.rel = link.rel.join(' ')
    }

    return `<${link.href}>; ` + Object.keys(link)
      .filter(prop => prop !== 'href')
      .map(function (prop) {
        const val = link[prop]
        let encVal = val

        if (['rel', 'anchor', 'media', 'title', 'type'].includes(prop)) {
          encVal = `"${val}"`
        } else if (prop.endsWith('*')) {
          if (typeof val === 'object') {
            if (!('value' in val)) {
              throw new Error('Extended value as object without `value`-property')
            }
            if (!('lang' in val)) {
              throw new Error('Extended value as object without `lang`-property')
            }

            encVal = encodeExtended({
              str: val.value,
              lang: val.lang
            })
          } else {
            console.log(lang)
            encVal = encodeExtended({
              str: val,
              lang
            })
          }
        } else if (val === true) {
          return prop
        }

        return `${prop}=${encVal}`
      }).join('; ')
  }).join(', ')
}
