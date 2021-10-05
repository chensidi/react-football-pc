import { Link } from 'react-router-dom';
import { memo } from 'react';
import ArticleTitle from '@/components/Common/ArticleTitle';

function VideoItem(item) {
    return (
        <Link to="" className="vdo-item">
            <img className="ply-btn" src="https://www.dongqiudi.com/images/play-btn.png" alt="" />
            <span>
                { item.title }
            </span>
        </Link>
    )
}

export default memo(({list}) => {
    return (
        <div>
            <ArticleTitle {...list[0]} />
            {
                list.slice(1, ).map(item => {
                    return <VideoItem key={item.id} {...item} />
                })
            }
        </div>
    )
})