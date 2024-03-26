import React from 'react'
import { Suspense } from 'react'
import Game from '@/components/Game'

const Page = () => {
  return (
    <Suspense>
      <Game /> 
    </Suspense>
  )
}

export default Page