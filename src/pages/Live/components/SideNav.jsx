import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'

import matchApi from '@/api/match';
import HttpGet from '@/components/Http/Get';

let unlisten;

const SideNav = (props) => {
    const { list = [] } = props;
    const history = useHistory();

    const jumpRoute = (item, idx) => {
        setDkey(idx.toString());
        history.replace({pathname: '/live/' + idx, search: 'api='+item.api});
    }
    
    const defaultKey = history.location.pathname.match(/(?<=\/)\d+$/)[0];
    const [dKey, setDkey] = useState(defaultKey);

    useEffect(() => {
        unlisten = history.listen(() => {
            console.log('listen')
            try {
                setDkey(history.location.pathname.match(/(?<=\/)\d+$/)[0]);
            } catch (e) {
                console.log(e)
            }
        })
        return () => unlisten()
    }, [])

    return (
        <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={[dKey]}
            mode="inline"
            selectedKeys={[dKey]}
        >
            {
                list.map((item, i) => <Menu.Item onClick={() => jumpRoute(item, i)} key={i}>{ item.label }</Menu.Item>)
            }
      </Menu>
    )
}

export default () => {
    const matchMenus = useSelector(state => state.liveData.matchMenus);
    return (
        <HttpGet
            method={matchApi.getMenu}
            attr="list"
            delay="500"
            style={{width: 256, height: 1000, rows: 15}}
            store={{type: 'setMatchMenus', storeData: matchMenus, prop: 'matchMenus'}}
        >
            <SideNav />
        </HttpGet>
    )
}
