import { darken, lighten } from '3oilerplate'

const black = lighten('#000', 0.25)
const white = darken('#fff', 0.25)

export const THEME = {
  rootFontSizes: ['10px', '16px'],
  colors: {
    black,
    white,
    primary: 'grey'
  },
  components: {
    Input: {
      variants: {
        isDisabled: {
          pointerEvents: 'none',
          opacity: 0.5
        }
      }
    }
  }
}
