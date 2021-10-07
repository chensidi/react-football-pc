import matchApi from '@/api/match';
import MatchLists from '@components/Matches/MatchLists';
import { getParams, timeDetails } from '@utils/utils';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';


const MatchContent = () => {
    
    const { id } = useParams();
    const { search } = useLocation();
    const [getMatchList, setFn] = useState(() => {
        return () => new Promise(() => {})
    }); //请求函数

    const sid = useMemo(() => id)
    useEffect(() => {
        setFn(() => {
            const { year, month, day } = timeDetails(Date.now());
            let apiFn = matchApi.getMatchListByApiPc(getParams(search, 'api'), `${year}-${month}-${day}16:00:00`);
            return () => apiFn;
        })
    }, [sid])

    return (
        <>
            <MatchLists method={getMatchList} sid={sid} />
        </>
    )
}

export default MatchContent;