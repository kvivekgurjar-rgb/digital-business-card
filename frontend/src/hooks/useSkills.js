import { useState, useEffect } from "react";
import { api } from '../api/endpoints.js';

export function useSkills() {
    const [data, setData]        = useState(null);
    const [loading, setLoading]  = useState(true);
    const [error, setError]      = useState(null);

    useEffect (() => {
        let cancelled = false;
        api.skills()
            .then ((res) => { if (!cancelled) setData(res.data); })
            .catch ((err) => { if (!cancelled) setData(err); })
            .finally (() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, []);

    return { data, loading, error };
}