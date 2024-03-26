import React from 'react'
import { Suspense } from 'react'
import KatakanaLevels from '@/components/KatakanaLevels'

const Page = () => {
  return (
    <Suspense>
      <KatakanaLevels /> 
    </Suspense>
  )
}

export default Page