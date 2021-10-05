import { Skeleton } from 'antd';
import { useRef, useState, memo } from 'react';

function SkeletonHoc(Comp, otherProps = {}) {
    const { row = 5, width = '80%' } = otherProps;

    return memo(function(props) {
        const [loadings, setLoading] = useState(false);
        const loading = useRef(setLoading); //初始状态为非loading，避免首次渲染不出来
        return (
            <Skeleton 
                active
                paragraph={{row, width}} 
                loading={loadings}
            >
                <Comp {...props} loadingRef={loading} />
            </Skeleton>
        )
    })
}

export default SkeletonHoc;