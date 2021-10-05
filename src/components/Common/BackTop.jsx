import { ArrowUpOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';

function toTop() {
    window.scrollTo({left:0, top:0, behavior: 'smooth'})
}

//回到顶部
const BackTop = () => {

    //是否显示回到顶部，根据阈值判断
    const [showBar, setShow] = useState(false);
    const show = useCallback(() => {
        const top = window.scrollY;
        setShow(top > 200);
    }, [])

    const listenScroll = useCallback(() => {
        window.addEventListener('scroll', show);
    }, [])

    useEffect(() => {
        listenScroll();
        return () => window.removeEventListener('scroll', show);
    }, [])

    return (
        <div className="back-top">
            <img src={require('/public/imgs/qr.png')} alt="" />
            {
                showBar ?
                <ArrowUpOutlined onClick={toTop} style={{fontSize: 20, cursor: 'pointer'}} />
                : null
            }
        </div>
    )
}

export default BackTop;