import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

import matchApi from '@/api/match';
import HttpGet from '@/components/Http/Get';

const SideNav = (props) => {
    const { list = [] } = props;
    const history = useHistory();

    const jumpRoute = (item) => {
        console.log(item);
        history.replace('/live/' + (item.league_id || item.id));
    }

    return (
        <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['10']}
            mode="inline"
        >
            {
                list.map(item => <Menu.Item onClick={() => jumpRoute(item)} key={item.id}>{ item.label }</Menu.Item>)
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
            store={{type: 'setMatchMenus', storeData: matchMenus, prop: 'matchMenus'}}
        >
            <SideNav />
        </HttpGet>
    )
}
