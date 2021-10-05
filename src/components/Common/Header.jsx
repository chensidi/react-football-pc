import { useCallback, memo } from "react";
import { HashRouter as Router, NavLink } from 'react-router-dom'
import { navs } from '@utils/constant';

const Navs = memo(() => {

    const createNavs = useCallback(() => {
        return navs.map(nav => {
            return (
                <NavLink 
                    className={`itm`}
                    to={nav.path}
                    exact
                >
                    { nav.label }
                </NavLink>
            )
        })
    }, [])

    return (
        <nav className="navs">
            {
                createNavs()
            }
        </nav>
    )
})

const Header = () => {
    return (
        <Router>
            <header className="hd">
                <div className="hd-wrap">
                    <img className="logo" src={require('/public/imgs/dqd-logo.png')} alt="" />
                    <Navs />
                </div>
            </header>
        </Router>
    )
}

export default Header;