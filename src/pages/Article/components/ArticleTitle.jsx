

const ArticleTitle = ({title, writer, time}) => {
    
    return (
        <>
            <h1 className="article-tit">{ title }</h1>
            <p className="article-info">
                作者：
                <span>{ writer } &nbsp;</span>
                <span>{ time }</span>
            </p>
        </>
    )
}

export default ArticleTitle;