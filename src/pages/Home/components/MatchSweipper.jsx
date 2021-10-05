import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import homeApi from '@/api/home';
import { playStatusFormat, toEastTime, playTV } from '@utils/utils';
import SkeletonHoc from '@/components/Common/CustomSkeleton';

const MatchItem = (props) => {

    const { 
        fs_A,
        fs_B,
        team_A_name,
        team_B_name,
        team_A_logo,
        team_B_logo,
        match_title,
        status,
        sort_timestamp,
     } = props;

    return (
        <div className="match-itm">
            <h4>
                <span className="match-tit">{ match_title }</span>
                <span className="match-state">{ playStatusFormat(status) }</span>
            </h4>
            <p className="match-team">
                <span>
                    <img src={ team_A_logo } alt="" />
                    { team_A_name }
                </span>
                {
                    fs_A ?
                     <em>{ fs_A }</em>
                    : 
                    <span className="time">
                        <time>{ toEastTime(sort_timestamp * 1000)[0] }</time>
                        <time>{ toEastTime(sort_timestamp * 1000)[1] }</time>
                    </span>
                }
            </p>
            <p className="match-team">
                <span>
                    <img src={ team_B_logo } alt="" />
                    { team_B_name }
                </span>
                <em>{ fs_B }</em>
            </p>
            <p className="match-btn">
                <span>
                    {playTV(status)}
                </span>
            </p>
        </div>
    )
}

const Swipers = ({loadingRef}) => {
    const [lists, setLists] = useState([]);
    const dispatch = useDispatch();
    const memoMatches = useSelector(state => state.homeData.matchBanner);
    const computedBannerMatch = async () => {
        loadingRef.current(true);
        if (memoMatches.length) {
            setLists(memoMatches);
            loadingRef.current(false);
            return;
        }
        const res = await homeApi.getMatch();
        loadingRef.current(false);
        const today = new Date();
        const [year, month, day] = 
        [
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ]
        const now = new Date(year, month, day) / 1000;
        let { list } = res;
        let idx = 0;
        for (let i = 0; i < list.length; i ++) {
            if (list[i].sort_timestamp >= now) {
                idx = i;
                break;
            }
        }
        list.splice(0, idx);
        let newList = []
        while (list.length) {
            newList.push(list.splice(0, 5));
        }
        setLists([...newList]);
        dispatch({type: 'setMatches', matchBanner: [...newList]});
    }

    useEffect(() => {
        computedBannerMatch();
    }, [])

    const carouselRef = useRef();
    const prev = carouselRef.current?.prev;
    const next = carouselRef.current?.next;

    return (
        <section className="my-match">
            <div className="nav-btn lt" onClick={prev}>
                <LeftOutlined />
            </div>
            <Carousel dots={false} ref={carouselRef}>
                {
                    lists.map((list, i) => {
                        return (
                            <div key={i}>
                                {
                                    list.map(item => <MatchItem key={item.id} {...item} />)
                                }
                            </div>
                        )
                    })
                }
            </Carousel>
            <div className="nav-btn rt" onClick={next}>
                <RightOutlined />
            </div>
        </section>
    )
}


export default SkeletonHoc(Swipers);