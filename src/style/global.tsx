import { css } from 'csscomp'

export const LocalStyle = css({
  body: {
    bgc: 'black',
    c: 'white',
    ff: 'base',
    fw: 500
  },

  "*[class^='tp-']": {
    ff: 'inherit !important'
  },

  '.tp-dfwv': {
    zIndex: 1000,
    width: '300px !important'
  }
})
