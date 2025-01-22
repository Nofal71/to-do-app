import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useSearch = ({ data, input }) => {
    const [filteredData, setFilteredData] = useState(data);
    const [progress, setProgress] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setProgress(true)
        const timer = setTimeout(() => {
            if (input?.trim() === "") {
                setFilteredData(data);
                setProgress(false)
            } else {
                const lowerCaseQuery = input?.toLowerCase();
                const filtered = data.filter((item) =>
                    item.title.toLowerCase().includes(lowerCaseQuery)
                );
                setFilteredData(filtered);
                setProgress(false)
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [input, data, location]);

    return { filteredData, progress };
};

export default useSearch;
