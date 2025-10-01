'use client'

import Link from 'next/link'
import { Box, Button } from './components'
import { PROJECTS } from './constants/projects'

const Home = () => {
  const getCurrentColor = (project: any) => {
    if (typeof window !== 'undefined') {
      return JSON.parse(window.localStorage.getItem(`project-${project.path}-config`) || '{}')?.color || project.color
    }
  }

  return (
    <Box css={{ d: 'flex', fxd: 'column', h: '100%', mih: '100vh', jc: 'center', ai: 'center', '> * + *': { mt: 5 } }}>
      { PROJECTS.map((project, index) => (
        <Link href={`/projects/${project.path}`} key={index}>
          <Button color={getCurrentColor(project)}>
            { project.label }
          </Button>
        </Link>
      ))}
    </Box>
  )
}

export default Home
