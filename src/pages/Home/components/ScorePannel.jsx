import { Link } from "react-router-dom";
import { Tabs } from 'antd';
import { useEffect, useState, createContext, useContext, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import homeApi from '@/api/home';
import rankingsApi from '@/api/rankings';
import MoreNav from "@/components/Common/MoreNav";

const { TabPane } = Tabs;

const RankCtx = createContext();

const ScorePannel = () => {
    const momeRanks = useSelector(state => state.homeData.ranks);
    const dispatch = useDispatch();

    const [plats, setPlats] = useState([]);
    const getPannel = () => { //获取平台积分赛事
        if (momeRanks) {
            setPlats(momeRanks);
            getRanks(momeRanks[0].season_id); //默认选择第一联赛积分榜
            getPlayers(momeRanks[0].season_id);
            return;
        }
        homeApi.getPlats().then(res => {
            setPlats(res[0].data);
            getRanks(res[0].data[0].season_id); //默认选择第一联赛积分榜
            getPlayers(res[0].data[0].season_id);

            dispatch({type: 'setRanks', ranks: res[0].data});
        })
    }

    const [ranks, setRanks] = useState([]);
    const getRanks = (id) => { //获取积分榜
        homeApi.getStanding(id).then(res => {
            setRanks(res.content.rounds[0].content.data);
        })
    }

    const [players, setPlayers] = useState([]);
    const getPlayers = (seasonId) => { //获取射手榜
        rankingsApi.getRankingByType('goals', seasonId, 'person_ranking')
        .then(res => {
            setPlayers(res.content.data)
        })
    }

    const onChangeLeague = useCallback((idx) => { //联赛发生改变
        const info = plats[idx];
        getRanks(info.season_id);
        getPlayers(info.season_id);
    }, [plats])

    useEffect(() => {
        getPannel();
    }, [])

    return (
        <section className="pannel-wrap">
            <MoreNav title="数据">
                <Link to="">更多</Link>
            </MoreNav>
            <RankCtx.Provider value={{ranks, players}}>
                <PannelTabs tabs={plats} onChangeLeague={onChangeLeague} />
            </RankCtx.Provider>
        </section>
    )
}

function PannelTabs({tabs = [], onChangeLeague}) {

    const [active, setAcitve] = useState(0);

    return (
        <>
            <Tabs defaultActiveKey="1" centered size="small" onChange={onChangeLeague}>
                {
                    tabs.map((tab, i) => {
                        return (
                            <TabPane tab={tab.label} key={i}>
                            </TabPane>
                        )
                    })
                }
            </Tabs>
            <div className="sub-tit">
                <span className={`${active===0?'on':''}`} onClick={() => setAcitve(0)}>积分</span>
                <span className={`${active===1?'on':''}`} onClick={() => setAcitve(1)}>射手榜</span>
            </div>
            {
                active === 0 ?
                <ScoreTable /> :
                <ShooterTable />
            }
        </>
    )
}

function ScoreTable() { //球队积分榜面板

    const { ranks } = useContext(RankCtx);
    return (
        <div className="pannel-tb">
            <h4>
                <span className="rank">名次</span>
                <span className="player">球队</span>
                <span className="team">胜/平/负</span>
                <span className="goal">积分</span>
            </h4>
            {
                ranks.map((rank, i) => {
                    return <TeamItem key={rank.team_id} {...rank} idx={i} />
                })
            }
        </div>
    )
}

function ShooterTable() { //射手榜面板
    const { players } = useContext(RankCtx);

    return (
        <div className="pannel-tb">
            <h4>
                <span className="rank">名次</span>
                <span className="player">球员</span>
                <span className="team">球队</span>
                <span className="goal">进球</span>
            </h4>
            {
                players.map((item, i) => <PlayerItem key={item.person_id} {...item} idx={i} />)
            }
        </div>
    )
}

function getResult(...result) {
    return result.join('/')
}

function TeamItem(props) { //球队信息列表

    const { 
        team_name, 
        team_logo, 
        rank, 
        points,
        matches_won,
        matches_draw,
        matches_lost,
        idx 
    } = props;

    return (
        <Link to="" className="team-item">
            <span className={`rank ${idx < 3 ? 'top' : ''}`}>{ idx + 1 }</span>
            <span className="player">
                <img src={team_logo} alt="" />
                { team_name }
            </span>
            <span className="team">{ getResult(matches_won, matches_draw, matches_lost) }</span>
            <span className="goal">{ points }</span>
        </Link>
    )
}

function PlayerItem(props) {

    const { person_name, person_logo, rank, team_name, count, idx } = props;

    return (
        <Link to="" className="team-item">
            <span className={`rank ${idx < 3 ? 'top' : ''}`}>{ idx + 1 }</span>
            <span className="player">
                <img src={person_logo} alt="" />
                { person_name }
            </span>
            <span className="team">{ team_name }</span>
            <span className="goal">{ count }</span>
        </Link>
    )
}

export default memo(() => <ScorePannel />);