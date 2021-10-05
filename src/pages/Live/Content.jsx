import matchApi from '@/api/match';
import MatchLists from '@components/Matches/MatchLists';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom'

const MatchContent = () => {
    
    const { id } = useParams();
    const orgFn = () => {
        return () => matchApi.getMatchList(id, '2021-10-0516:00:00')
    }
    const [getMatchList, setFn] = useState(orgFn)

    const sid = useMemo(() => id)
    useEffect(() => {
        setFn(() => {
            let id = sid;
            return () => matchApi.getMatchList(id == 10 ? 'important' : id, '2021-10-0516:00:00')
        })
    }, [sid])

    return (
        <div>
            <MatchLists method={getMatchList} sid={sid} />
        </div>
    )
}

export default MatchContent;