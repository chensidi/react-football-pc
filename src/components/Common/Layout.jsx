import { isValidElement } from 'react'

const validChildName = ['Main', 'Aside'];

export const LayoutWrap = (props) => {
    let childArr = [];
    props.children.map(child => {
        if (isValidElement(child) && validChildName.includes(child.type.displayName)) {
            childArr.push(child);
        }
    })
    return (
        <div className={`content ${props.className||''}`}>
            { childArr }
        </div>
    )
}

export const Main = (props) => {
    return (
        <div className={`main ${props.className||''}`}>
            { props.children }
        </div>
    )
}

export const Aside = (props) => {
    return (
        <aside className={`aside ${props.className||''}`}>
            { props.children }    
        </aside>
    )
}