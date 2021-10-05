import { useState } from 'react';

export const useLoad = function(val = true) {
    const [loading, setLoading] = useState(val);

    const setLoad = (val = false, timeout = 0) => {
        setTimeout(() => setLoading(val), timeout);
    }

    return { loading, setLoad };
}