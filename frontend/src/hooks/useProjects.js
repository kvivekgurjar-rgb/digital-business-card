import { useState, useEffect } from "react";
import { api } from '../api/endpoints.js';

export function useProjects(params = {}) {
    const [data, setData]          = useState(null);
    const [loading, setLoading]    = useState(true);
    const [error, setError]        = useState(null);

    useEffect (() => {
        let cancelled = false;
        api.projects(params)
            .then ((res) => { if (!cancelled) setData(res.data); })
            .catch ((err) => { if (!cancelled) setError(err); })
            .finally (() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { data, loading, error };
}