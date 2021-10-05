import { Suspense } from 'react'

export default (Comp, otherProps) => {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Comp {...otherProps} />
        </Suspense>
    )
}