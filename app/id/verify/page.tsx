import VerifyCompo from '@/componants/VerifyCompo'
import React, { Suspense } from 'react'

const page = () => {
    return (
        <Suspense fallback={null}>
            <VerifyCompo />
        </Suspense>
    )
}

export default page