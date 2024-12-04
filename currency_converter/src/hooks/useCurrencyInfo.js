import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                // const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Public proxy (use a custom proxy for production).
                const apiUrl = `https://v6.exchangerate-api.com/v6/d8af3d9d46cf0db52e5da071/latest/${currency}`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result.conversion_rates); // Assuming `conversion_rates` contains rates.
            } catch (err) {
                console.error("Error fetching currency data:", err);
                setError(err.message);
            }
        };

        fetchCurrencyData();
    }, [currency]);

    return { data, error };
}

export default useCurrencyInfo;



