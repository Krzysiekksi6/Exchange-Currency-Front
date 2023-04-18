import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import CurrencyItem from "./CurrencyItem";
import classes from './AvailableData.module.css'
const AvailableData = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const URL = 'https://bankdata-eb71f-default-rtdb.europe-west1.firebasedatabase.app/data.json';
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                URL
            );

            if (!response.ok) {
                throw new Error(
                    'Something went wrong, you cannot connect to database...'
                );
            }

            const responseData = await response.json();

            const loadedData = [];

            for (const key in responseData) {
                loadedData.push({
                    id: responseData[key].id,
                    currency: responseData[key].currency,
                    currencySymbol: responseData[key].currencySymbol,
                    value: responseData[key].value,
                });
            }

            setItems(loadedData);
            setIsLoading(false);
        };

        fetchData().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section>
                <LoadingSpinner />
            </section>
        );
    }

    if (httpError) {
        return (
            <section>
                <h3 className={classes['http-error']}>{httpError}</h3>
            </section>
        );
    }

    const dataList = items.map((item) => (
        <CurrencyItem
            id={item.id}
            key={item.id}
            currency={item.currency}
            currencySymbol={item.currencySymbol}
            value={item.value}
        />
    ));

    return (
        <section className={classes['data']}>
            <ul>{dataList}</ul>
        </section>
    );
};

export default AvailableData;
