// api.test.js
import getJoke from './api.js';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
});

describe('getJoke API', () => {
    it('fetches a joke successfully', async () => {
        fetch.mockResponseOnce(
            JSON.stringify({
                type: 'single',
                joke: 'We messed up the keming again guys.',
                lang: 'en'
            })
        );

        const joke = await getJoke();
        expect(joke.joke).toBe('We messed up the keming again guys.');
    });

    it('fetches a joke successfully', async () => {
        fetch.mockResponseOnce(
            JSON.stringify({
                type: 'twopart',
                setup: 'Why don’t skeletons fight each other?',
                delivery: 'Because they don’t have the guts.',
                lang: 'en'
            })
        );

        const joke = await getJoke();
        expect(joke.setup).toBe('Why don’t skeletons fight each other?');
        expect(joke.delivery).toBe('Because they don’t have the guts.');
    });

    it('handles API errors', async () => {
        fetch.mockReject(new Error('Network error'));
        const joke = await getJoke();
        expect(joke).toBeUndefined();
    });

    it('handles non-200 status', async () => {
        fetch.mockResponseOnce('', { status: 404 });
        const joke = await getJoke();
        expect(joke).toBeUndefined();
    });
});
