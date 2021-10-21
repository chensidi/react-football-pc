import { Link } from 'react-router-dom';
import MoreNav from '@components/Common/MoreNav';

export function NormalVideo(props) {
    const { width, height, title, pic } = props;
    return (
        <Link className="normal video-item" to="" style={{width, height}}>
            <img src={pic} alt="" />
            <p>
                { title }
            </p>
        </Link>
    )
}

export function BigVideo(props) {
    return (
        <Link className="big" to="">
            <img src={props.pic} alt="" />
            <p>
                { props.title }
            </p>
        </Link>
    )
}

export function VideoBox(props) {
    const { width, height, title, pic, className } = props;
    return (
        <Link className={`video-box ${className}`} to="" style={{width, height}}>
            <div className="bg" style={{backgroundImage: `url(${pic})`}}></div>
            <p className="title">
                { title }
            </p>
        </Link>
    )
}

export function VideoGroup({title, list}) {
    return <>
        <MoreNav title={title}>
            <Link to="">更多</Link>
        </MoreNav>
        <div className="video-wrap">
            {
                list.map(
                    item => <VideoBox 
                        key={item.id} 
                        width={188} 
                        height={105} 
                        title={item.title} 
                        pic={item.thumb} 
                        className="small-vdo"
                    />
                )
            }
        </div>
    </>
}