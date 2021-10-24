import { Link } from 'react-router-dom';
import { memo } from 'react';

import ArticleTitle from '@/components/Common/ArticleTitle';

export const NewCover = memo(({className, info = {}}) => {
    return (
        <Link to={`/article/${info.id}`} className={`new-cover ${className||''}`}>
            <img src={info.thumb} alt="" />
            <p>{ info.title }</p>
        </Link>
    )
})

export const NewLists = memo(({className, list = []}) => {
    return (
        <div className={`new-content ${className||''}`}>
            <ArticleTitle {...list[0]} />
            {
                list.slice(1, ).map((item, i) => {
                return (
                    <p 
                        key={item.id}
                        title={item.title}
                    >
                        <Link to={`/article/${item.id}`}>
                            { item.title }
                        </Link>
                    </p>
                )
                })
            }
        </div>
    )
})