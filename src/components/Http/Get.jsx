import { useEffect, useState, cloneElement } from 'react';
import { useDispatch } from 'react-redux';
import { Skeleton } from 'antd';

const LoadingDefault = () => {
    return (
        <Skeleton loading={true} active></Skeleton>
    )
}

const HttpGet = (props) => {
    let {
        method,
        delay = 0,
        loading = <LoadingDefault />,
        error,
        children,
        attr,
        store: {
            type,
            prop,
            storeData
        }
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