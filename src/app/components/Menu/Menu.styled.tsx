import { s } from '3oilerplate'

export const SMenuToggle = s.div(() => ({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  right: 0,
  height: '2.5rem',
  width: '2.5rem',
  cursor: 'pointer',
  fontSize: '.5rem',
  margin: '1rem',
  backgroundColor: 'rgba(0, 0, 0, .7)',
  borderRadius: '.25rem'
}))

export const SMenu = s.div(() => ({
  position: 'fixed',
  top: '3.5rem',
  right: 0,
  bottom: 0,
  padding: '1rem',
  margin: '1rem',
  backgroundColor: 'rgba(0, 0, 0, .7)',
  borderRadius: '.25rem',
  width: 'calc(100% - 2rem)',
  maxWidth: '400px'
}))

export const SMenuItem = s.div(() => ({
  display: 'flex',
  height: '3rem',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

export const SMenuCredits = s.div(() => ({
  display: 'flex',
  position: 'absolute',
  justifyContent: 'center',
  margin: 'm',
  left: 0,
  right: 0,
  bottom: 0
}))
