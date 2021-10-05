import router from './router';
import { renderRoutes } from 'react-router-config';
import { HashRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { Suspense, useRef, useEffect, useMemo } from 'react'

import Header from '@components/Common/Header';
import Footer from '@components/Common/Footer';
import BackTop from '@components/Common/BackTop';

const App = () => {
    const routerRef = useRef(null);
    const path = useMemo(() => routerRef.current?.location?.pathname)
    useEffect(() => {
        console.log(path)
    })
    return (
        <>
            <Header />
            <Router ref={routerRef}>
                <section className="main-wrap">
                    <Suspense fallback={<div className="content">loading...</div>}>
                        { renderRoutes(router) }
                    </Suspense>
                </section>
            </Router>
            <Footer />
            <BackTop />
        </>
    )
}

export default hot(App);