const getJoke = async () => {
    try {
        const res = await fetch('https://v2.jokeapi.dev/joke/Any');
        if (res.status !== 200) {
            throw new Error('Failed to fetch joke');
        }
        return await res.json();
    } catch (err) {
        console.error(err);
    }
};

export default getJoke;
