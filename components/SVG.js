import React, { useEffect, useRef, useState, useCallback } from "react";

const SVG = (props) => {
    const ImportedIconRef = useRef();
    useEffect(() => {
        const LoadIcon= async () =>{
            const i = await import("./../assets/icons/prizes/1.svg")
        }
        LoadIcon()
    }, [])

    return (
        <div>
            ddd
        </div>
    );
};

export default SVG;
//
// function useDynamicSVGImport(name, options = {}) {
//     const ImportedIconRef = useRef();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState();
//
//     const { onCompleted, onError } = options;
//     useEffect(() => {
//         setLoading(true);
//         const importIcon = async () => {
//             try {
//                 ImportedIconRef.current = (
//                     await import(`./${name}.svg`)
//                 ).ReactComponent;
//                 if (onCompleted) {
//                     onCompleted(name, ImportedIconRef.current);
//                 }
//             } catch (err) {
//                 if (onError) {
//                     onError(err);
//                 }
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         importIcon();
//     }, [name, onCompleted, onError]);
//
//     return { error, loading, SvgIcon: ImportedIconRef.current };
// }
