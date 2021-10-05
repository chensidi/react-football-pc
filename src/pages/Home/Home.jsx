import { useCallback, useEffect, useState, useMemo, lazy } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom'

import MatchSweipper from './components/MatchSweipper';
import { LayoutWrap, Main, Aside } from '@components/Common/Layout';
import {NewCover, NewLists} from './components/NewBlock';
import SideWrap from '@/components/Common/SideNew';
import VideoBlock from './components/VideoBlock';
import { useLoad } from '@/hooks/common';
import MoreNav from "@/components/Common/MoreNav";
import Lazy from '@components/Common/lazy';

import homeApi from '@/api/home';
import videoApi from '@/api/video';

//此处四个组件是在第二屏范围，所以无需急于渲染，懒加载即可
const MatchLists = lazy(() => import('@components/Matches/MatchLists'))
const ScorePannel = lazy(() => import('./components/ScorePannel'))
const HotVideo = lazy(() => import('./components/HotVideo'))
const RecommendWrap = lazy(() => import('./components/Recommend'))

function memoHoc(memo, setFn, fn) {
    return () => {
        if (memo) {
            setFn(memo);
            return;
        }
        fn();
    }
}

export default () => {

    const dispatch = useDispatch();
    const memoTops = useSelector(state => state.homeData.tops),
          memoHotVideos = useSelector(state => state.homeData.hotVideos),
          memoRecommend = useSelector(state => state.homeData.recommend);

    const [ topInfo, setTop ] = useState({slide: [], list: [], xqList: [], vdoList: []});
    const { loading, setLoad } = useLoad();

    const getTops = useCallback(() => {
        if (memoTops) {
            setTop(memoTops)
            setLoad(false)
            return;
        }
        setLoad(true);
        homeApi.getTops().then(res => {
            let slide = res.slide_list,
                list = res.new_list,
                xqList = res.xianqing_list,
                vdoList = res.video_list;
            
            setTop({slide, list, xqList, vdoList});
            dispatch({type: 'setTops', tops: {slide, list, xqList, vdoList}});
            setLoad(false, 500);
        })
    } ,[])

    const [hotVideo, setHotVideo] = useState([]);
    const getHotVideo = useCallback(() => { //获取热门视频
        videoApi.getHotVideoList().then(res => {
            setHotVideo(res.articles.slice(0, 8));
            dispatch({type: 'setHotVideos', hotVideos: res.articles.slice(0, 8)})
        })
    }, [])

    const [recommend, setRecommend] = useState([]);
    const getRecommend = useCallback(() => { //获取首页推荐
        homeApi.getRecommend().then(res => {
            setRecommend(res.contents);
            dispatch({type: 'setRecommend', recommend: res.contents})
        })
    }, [])

    const getHotVideoFn = useMemo(() => memoHoc(memoHotVideos, setHotVideo, getHotVideo), [])
    const getRecommendFn = useMemo(() => memoHoc(memoRecommend, setRecommend, getRecommend), []);

    useEffect(() => {
        getTops();
        getHotVideoFn();
        getRecommendFn();
    }, [])
    
    return (
        <>
            <MatchSweipper />
            <div className="content">
                <Main>
                    <Skeleton active paragraph={{ rows: 5 }} loading={loading}>
                        <NewCover info={topInfo.slide[0]} className="top-cover" />
                        <NewLists list={topInfo.list.slice(0, 8)} className="top-list" />
                    </Skeleton>
                </Main>
                <Aside>
                    <Skeleton active paragraph={{ rows: 5 }} loading={loading}>
                        <SideWrap list={topInfo.xqList.slice(0, 3)} />
                    </Skeleton>
                </Aside>
                <Main>
                    <Skeleton active paragraph={{ rows: 5 }} loading={loading}>
                        <NewCover info={topInfo.slide[1]} className="top-cover" />
                        <NewLists list={topInfo.list.slice(8, 16)} className="top-list" />
                    </Skeleton>
                </Main>
                <Aside>
                    <Skeleton active paragraph={{ rows: 5 }} loading={loading}>
                        <VideoBlock list={topInfo.vdoList.slice(0, 8)} />
                    </Skeleton>
                </Aside>
                <Main>
                    <MoreNav title="热门视频">
                        <Link to="">更多</Link>
                    </MoreNav>
                    { Lazy(HotVideo, {list: hotVideo}) }
                    { Lazy(MatchLists) }
                </Main>
                <Aside>
                    { Lazy(ScorePannel) }
                    { Lazy(RecommendWrap, {list: recommend}) }
                </Aside>
            </div>
        </>
    )
}