'use client'

import { Button, Spacer } from '3oilerplate'
import Link from 'next/link'

const Home = () => {
  return (
    <Spacer size="m" s={{ height: '100%', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Link href="/projects/1">
        <Button>
          Project 1
        </Button>
      </Link>
      <Link href="/projects/2">
        <Button>
          Project 2
        </Button>
      </Link>
    </Spacer>
  )
}

export default Home
