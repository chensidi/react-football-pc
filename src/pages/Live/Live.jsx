import { useParams } from 'react-router-dom';
import SideNav from './components/SideNav'

const Live = () => {

    const { id } = useParams();
    return (
        <div className="content">
            <SideNav />
        </div>
    )
}

export default Live;