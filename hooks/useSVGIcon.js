import {useEffect, useRef, useState} from "react";
import dynamic from 'next/dynamic'

const useSVGIcon = (name) => {
    const ImportedIconRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        const importIcon = () => {
            try {
                const x ="1";
                const fname = `/public/images/icons/tasks/1`
                ImportedIconRef.current = dynamic(()=> import(`${fname}.svg`),{ ssr: false });
                console.log(ImportedIconRef.current)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        importIcon();
    }, [name]);

    return { error, loading, icon: ImportedIconRef.current };
};

export default useSVGIcon
