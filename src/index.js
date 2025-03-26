import getJoke from '../api/api.js';

const dom = {
    button: document.getElementById('button'),
    question: document.getElementById('question'),
    answer: document.getElementById('answer'),
    category: document.getElementById('category'),
    lang: document.getElementById('lang'),
    container: document.getElementById('joke-container')
};

// get joke
const clickButton = async () => {
    dom.button.disabled = true;
    dom.button.textContent = 'Loading...';

    try {
        const joke = await getJoke();

        dom.category.textContent = `Category: ${joke.category}`;
        dom.question.textContent = joke.setup || joke.joke;
        dom.answer.textContent = joke.delivery;
        dom.lang.textContent = `Language: ${joke.lang}`;
    } catch (error) {
        dom.question.textContent = "Oops! Couldn't fetch a joke right now";
        dom.answer.textContent = 'Please try again later';
    } finally {
        dom.button.disabled = false;
        dom.button.textContent = 'Get New Joke';
    }
};

// button event
dom.button.addEventListener('click', clickButton);
