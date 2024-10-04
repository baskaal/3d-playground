import { darken, lighten } from '3oilerplate'

const black = lighten('#000', 5)
const white = darken('#fff', 5)

export const THEME = {
  rootFontSizes: ['10px', '16px'],
  colors: {
    black,
    white,
    primary: 'grey'
  }
}
