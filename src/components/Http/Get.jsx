import { useEffect, useState, cloneElement } from 'react';
import { useDispatch } from 'react-redux';
import { Skeleton, message } from 'antd';

const LoadingDefault = ({width, height, rows}) => {
    console.log(width)
    return (
        <div style={{width, height}}>
            <Skeleton loading={true} active paragraph={{rows}}></Skeleton>
        </div>
    )
}

const HttpGet = (props) => {
    let {
        method,
        delay = 0,
        error,
        children,
        attr,
        store: {
            type,
            prop,
            storeData
        },
        style,
        loading = <LoadingDefault {...style} />,
    } = props;
    const [Comp, setComp] = useState(null);
    const dispatch = useDispatch();
    useEffect(async () => {
        setComp(loading);
        try {
            let res = storeData;
            if (!res) {
                res = await method();
                dispatch({type, [prop]: res})
            }
            let clone = cloneElement(children, {[attr]: res});
            setTimeout(() => setComp(clone), delay);
        } catch (e) {
            console.log(e)
            setComp(error);
        }
    }, [])

    return Comp;
}

export default HttpGet;