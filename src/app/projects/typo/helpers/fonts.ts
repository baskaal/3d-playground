import axios from 'axios'

export const getFontOptions = async () => {
  const res = await axios(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_FONTS_TOKEN}`)
  const options = res.data.items?.reduce((acc, { family, files }: any) => {
    return [
      ...acc,
      ...Object.entries(files)
        .filter(([key]) => key.includes('regular'))
        .map(([key, value]) => ({ text: `${family} ${key}`, value }))
    ]
  }, [])

  return options || []
}

// Copied from http://github.com/gero3/facetype.js/
export const convertFont = (font: any) => {
  const scale = (1000 * 100) / ((font.unitsPerEm || 2048) * 72)
  const result = {
    glyphs: {},
    cssFontWeight: 'normal',
    cssFontStyle: 'normal',
    familyName: font.familyName,
    ascender: Math.round(font.ascender * scale),
    descender: Math.round(font.descender * scale),
    underlinePosition: Math.round(font.tables.post.underlinePosition * scale),
    underlineThickness: Math.round(font.tables.post.underlineThickness * scale),
    boundingBox: {
      yMin: Math.round(font.tables.head.yMin * scale),
      xMin: Math.round(font.tables.head.xMin * scale),
      yMax: Math.round(font.tables.head.yMax * scale),
      xMax: Math.round(font.tables.head.xMax * scale)
    },
    resolution: 1000,
    original_font_information: font.tables.name

  }

  Object.values(font.glyphs.glyphs).forEach((glyph) => {
    const unicodes: any = []

    if (glyph.unicode !== undefined) {
      unicodes.push(glyph.unicode)
    }

    if (glyph.unicodes.length) {
      glyph.unicodes.forEach((unicode) => {
        if (unicodes.indexOf(unicode) === -1) {
          unicodes.push(unicode)
        }
      })
    }

    unicodes.forEach((unicode) => {
      const token: any = {}

      token.ha = Math.round(glyph.advanceWidth * scale)
      token.x_min = Math.round(glyph.xMin * scale)
      token.x_max = Math.round(glyph.xMax * scale)
      token.o = ''

      glyph.path.commands.forEach(function (command, i) {
        if (command.type.toLowerCase() === 'c') {
          command.type = 'b'
        }

        token.o += command.type.toLowerCase()
        token.o += ' '

        if (command.x !== undefined && command.y !== undefined) {
          token.o += Math.round(command.x * scale)
          token.o += ' '
          token.o += Math.round(command.y * scale)
          token.o += ' '
        }

        if (command.x1 !== undefined && command.y1 !== undefined) {
          token.o += Math.round(command.x1 * scale)
          token.o += ' '
          token.o += Math.round(command.y1 * scale)
          token.o += ' '
        }

        if (command.x2 !== undefined && command.y2 !== undefined) {
          token.o += Math.round(command.x2 * scale)
          token.o += ' '
          token.o += Math.round(command.y2 * scale)
          token.o += ' '
        }
      })

      result.glyphs[String.fromCharCode(unicode)] = token
    })
  })

  return result
}
