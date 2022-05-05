import { useState } from "react";

const useHttp = (requestConfig, applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendRequest = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                'https://react-http-6b4a6.firebaseio.com/tasks.json', {
                url:
                }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            const loadedTasks = [];

            for (const taskKey in data) {
                loadedTasks.push({ id: taskKey, text: data[taskKey].text });
            }

            applyData(loadedTasks);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };

    return {
        isLoading,
        error,
        sendRequest,
    }
}

export default useHttp;