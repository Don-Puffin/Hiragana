import { Suspense } from 'react'
import KanjiLevels from '@/components/KanjiLevels'
const Page = () => {
  return (
    <Suspense>
      <KanjiLevels />
    </Suspense>
  )
}

export default Page