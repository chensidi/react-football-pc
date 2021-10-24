import { Main, Aside } from '@components/Common/Layout';
import articleApi from '@api/article/';
import ArticleTitle from './components/ArticleTitle';
import ArticleContent from './components/ArticleContent';
import {RelatedTags, RelatedArticles}  from './components/RelatedComponents';
import './style/style.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const Article = () => {

    const { id } = useParams();

    // 获取文章详情内容
    const [titleInfo, setTitleInfo] = useState({});
    const [relatedTags, setTags] = useState([]);
    const [articleBody, setBody] = useState('');
    const getDetails = () => {
        articleApi.getDetails(id).then(res => {
            console.log(res);
            const { title, writer, time, body, infos: {channels} } = res;

            setTitleInfo({title, writer, time});
            setBody(body)
            setTags(channels);
        })
    }

    // 获取相关文章
    const [relatedArticle, setRelated] = useState([]);
    const getRelated = () => {
        articleApi.getRelatedArticle(id).then(res => {
            console.log(res)
            const { relative } = res;
            relative.length && setRelated(relative);
        })
    }

    useEffect(() => {
        getDetails();
        getRelated();
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="content news-wrap">
            <Main className>
                <div className="news-left">
                    <ArticleTitle {...titleInfo} />
                    <ArticleContent body={articleBody} />
                </div>
            </Main>
            <Aside>
                {
                    relatedTags.length ? <RelatedTags relatedTags={relatedTags} /> : null
                }
                {
                    relatedArticle.length ? <RelatedArticles relatedArticle={relatedArticle} /> : null
                }
            </Aside>
        </div>
    )
}

export default Article;