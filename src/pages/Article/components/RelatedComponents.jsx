import { Tags, RelatedLink } from '@components/Common/Tag';
import { LabelTitle } from '@/components/Common/MoreNav';

export const RelatedTags = ({relatedTags = []}) => {
    return (
        <>
            <LabelTitle title="相关标签" />
            {
                relatedTags.map(tag => {
                    return <Tags key={tag.id} {...tag} />
                })
            }
        </>
    )
}

export const RelatedArticles = ({relatedArticle=[]}) => {
    return (
        <>
            <LabelTitle title="相关推荐" />
            {
                relatedArticle.map(article => <RelatedLink key={article.id} {...article} />)
            }
        </>
    )
}
