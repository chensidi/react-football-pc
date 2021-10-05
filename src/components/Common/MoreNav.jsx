import { Link } from 'react-router-dom';

export default function({title="", children}) {
    return (
        <header className="pannel-tit">
            <span className="tit-txt">{ title }</span>
            { children }
        </header>
    )
}

export function LabelTitle() {
    return (
        <div className="label-tit">
            <img src={require('/public/imgs/title-pre-icon.png')} alt="" />
            热门推荐
        </div>
    )
}