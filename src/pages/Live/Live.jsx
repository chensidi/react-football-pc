import { useParams } from 'react-router-dom';
import SideNav from './components/SideNav';
import { renderRoutes } from 'react-router-config';

import matchApi from '@/api/match';

const Live = ({route}) => {

    return (
        <div className="content match-wrap">
            <SideNav />
            <div className="match-content">
                { renderRoutes(route.routes) }
            </div>
        </div>
    )
}

export default Live;