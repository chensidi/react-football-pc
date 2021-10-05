import { Link } from 'react-router-dom';
import { memo } from 'react'

const SideItem = (props) => {
    return (
        <Link to="" className="side-block">
            <img src={props.thumb} alt="" />
            <p>
                { props.title }
            </p>
        </Link>
    )
}


export default memo(function SideWrap({list}) {
    return (
        <div className="side-wrap">
            {
                list.map(item => <SideItem key={item.id} {...item} />)
            }
        </div>
    )
})