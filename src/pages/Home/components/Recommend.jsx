import { Link } from 'react-router-dom';

import { LabelTitle } from '@components/Common/MoreNav';

function RecommendItem({title, to}) {
    return (
        <Link to={to} className="recommend-item">
            { title }
        </Link>
    )
}

const RecommendWrap = ({list=[]}) => {
    return (
        <>
            <LabelTitle />
            {
                list.map(item => <RecommendItem key={item.id} {...item} />)
            }
        </>
    )
}


export default RecommendWrap;