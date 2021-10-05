import { Link } from 'react-router-dom';

export default function(props) {

    const {
        title,
        cover: {pic},
        to = ''
    } = props;

    return (
        <Link to={to} className="vdo-cover" title={title}>
            <img src={pic} alt="" />
            <p>
                { title }
            </p>
        </Link>
    )
}