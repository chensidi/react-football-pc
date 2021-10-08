import homeApi from '@/api/home';
import { summaryMatchList, timeDetails, toEastTime } from '@utils/utils';
import MoreNav from '@components/Common/MoreNav'

import { useCallback, useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { message, DatePicker } from 'antd';
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';

const TimeLabel = ({date}) => {
    return (
        <p className="time-label">
            <img src={require('/public/imgs/title-pre-icon.png')} alt="" />
            { date }
        </p>
    )
}

const MatchItem = (props) => {
    const { 
        competition_name,
        team_A_logo, 
        team_A_name,
        team_B_logo, 
        team_B_name,
        sort_timestamp,
        as_A = '',
        as_B = '',
        status,
        tv_live_info
    } = props;
    return (
        <Link to="" className="match-item">
            <span className="match-time">{ toEastTime(sort_timestamp * 1000)[1] }</span>
            <em className="league-name">{ competition_name }</em>
            <div className="team-a">
                <span>{ team_A_name }</span>
                <img src={team_A_logo} alt="" />
            </div>
            <div className="score">
                {
                    status === "Fixture" 
                    ?
                    'VS'
                    :
                    (as_A + '-' + as_B)
                }
            </div>
            <div className="team-b">
                <img src={team_B_logo} alt="" />
                <span>{ team_B_name }</span>
            </div>
            <div className="live-tag">
                {
                    tv_live_info[0]?.cname
                }
            </div>
        </Link>
    )
}

const ListWrap = ({list = []}) => {
    return (
        <div className="list-block">
            {
                list.map(item => <MatchItem key={item.match_id} {...item} />)
            }
        </div>
    )
}

const MatchLists = ({method, showPicker, onDateChange}) => {

    //获取重要比赛列表
    const [list, setList] = useState([]);
    const getImportantMatches = useCallback(async () => {
        let res;
        message.loading({
            content: '加载中...',
            duration: 0,
            key: 'matchload',
            style: {
                marginTop: '20vh'
            }
        })
        if (method) {
            res = await method();
        } else {
            res = await homeApi.getImportant();
        }
        const summaryList = summaryMatchList(res);
        const tempList = [];
        Object.keys(summaryList).map(item => {
            const tempObj = {
                date: item,
                sublist: summaryList[item]
            }
            tempList.push(tempObj)
        })
        setList(tempList);
        message.destroy('matchload')
    })

    useEffect(() => {
        getImportantMatches();
    }, [method]);

    return (
        <>
            <MoreNav title="比赛直播">
                {
                    showPicker && <DatePicker onChange={onDateChange} locale={locale} defaultValue={moment()} />
                }
            </MoreNav>
            {
                list.map(item => {
                    return (
                        <Fragment key={item.date}>
                            <TimeLabel date={item.date} />
                            <ListWrap list={item.sublist} />
                        </Fragment>
                    )
                })
            }
        </>
    )
}

export default (MatchLists);