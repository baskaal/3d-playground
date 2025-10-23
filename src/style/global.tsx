import { css } from 'csscomp'

export const LocalStyle = css({
  body: {
    bgc: '#1c1c1c',
    c: 'white',
    ff: 'base',
    fw: 500
  },

  "*[class^='tp-']": {
    ff: 'inherit !important'
  },

  '.tp-dfwv': {
    zIndex: 1000,
    top: '10px !important',
    right: '10px !important',
    width: '300px !important'
  }
})
