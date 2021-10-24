

export const Tags = ({tag, thumb}) => {
    
    return (
        <div className="tag-item">
            <img src={thumb} alt="" />
            <p>{ tag }</p>
        </div>
    )
}

export const RelatedLink = ({title, time}) => {

    return (
        <div className="related-link">
            <p>
                { title }
            </p>
            <span className="time">{ time }</span>
        </div>
    )
}
