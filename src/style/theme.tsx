import { darken, lighten } from 'csscomp'

const black = lighten('#000', 5)
const white = darken('#fff', 5)

export const Theme = {
  fonts: {
    base: 'Courier'
  },
  rootFontSizes: ['10px', '16px'],
  colors: {
    black,
    white,
    primary: 'grey'
  }
}
