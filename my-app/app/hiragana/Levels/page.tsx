import React from 'react'
import { Suspense } from 'react'
import HiraganaLevels from '@/components/HiraganaLevels'

const Page = () => {
  return (
    <Suspense>
      <HiraganaLevels /> 
    </Suspense>
  )
}

export default Page