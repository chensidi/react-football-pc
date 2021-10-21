import {LayoutWrap, Main, Aside} from '@components/Common/Layout';
import { NormalVideo, BigVideo, VideoBox, VideoGroup } from './components/VideoItems';
import { LabelTitle } from '@components/Common/MoreNav';
import SideWrap from '@components/Common/SideNew';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import videoApi from '@/api/video';
import homeApi from '@/api/home';

const VideoHome = () => {

    const [tops, types, hots] = [
        useSelector(state => state.videoData.topss),
        useSelector(state => state.videoData.types),
        useSelector(state => state.videoData.hots),
    ]

    const dispatch = useDispatch();

    // 推荐视频
    const [topVideoList, setTopList] = useState([]);
    const getTabList = () => {
        if (tops?.length) {
            setTopList(tops);
            return;
        }
        homeApi.getTops().then(res => {
            const { video_list } = res;
            setTopList(video_list.slice(0, 7))
            dispatch({type: 'setTopss', list: video_list.slice(0, 7)});
        })
    }

    // 视频分类
    const [videoTypes, setTypes] = useState([]);
    const getTypes = () => {
        if (types?.length) {
            setTypes(types);
            return;
        }
        videoApi.getTabVideoList().then(res => {
            setTypes(Object.values(res));
            dispatch({type: 'setTypes', list: Object.values(res)});
        })
    }

    // 周热门视频
    const [weekHot, setWeekHot] = useState([]);
    const getHotVideo = () => {
        if (hots?.length) {
            setWeekHot(hots);
            return;
        }
        videoApi.getHotVideoList().then(res => {
            const { week_hot_list: {list} } = res;
            setWeekHot(list);
            dispatch({type: 'setHots', list});
        })
    }

    useEffect(() => {
        getTabList();
        getTypes();
        getHotVideo();
    }, []);

    return (
        <div className="content">
            <div className="top-video">
                <VideoBox className="big-vdo" width={720} height={410} title={topVideoList[0]?.title} pic={topVideoList[0]?.cover.pic} />
                <div className="normals">
                    {
                        topVideoList.slice(1).map(({title, thumb, id}) => {
                            return <VideoBox className="mid-vdo" key={id} width={230} height={130} title={title} pic={thumb} />
                        })
                    }
                </div>
            </div>
            <Main>
                {
                    videoTypes.map((item, i) => {
                        return <VideoGroup key={i} title={item.name} list={item.list} />
                    })
                }
            </Main>
            <Aside>
                <LabelTitle title="本周热门" />
                <SideWrap list={weekHot} />
            </Aside>
        </div>
    )
}

export default VideoHome;