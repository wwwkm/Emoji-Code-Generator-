document.addEventListener('DOMContentLoaded', function () {
    // Data structure for emojis and their names
    const emojiData = {
        smileys: [
            { emoji: '😀', name: 'Grinning Face' },
            { emoji: '😁', name: 'Beaming Face with Smiling Eyes' },
            { emoji: '😂', name: 'Face with Tears of Joy' },
            { emoji: '🤣', name: 'Rolling on the Floor Laughing' },
            { emoji: '😃', name: 'Grinning Face with Big Eyes' }
        ],
        animals: [
            { emoji: '🐶', name: 'Dog Face' },
            { emoji: '🐱', name: 'Cat Face' },
            { emoji: '🐭', name: 'Mouse Face' },
            { emoji: '🐹', name: 'Hamster Face' },
            { emoji: '🐰', name: 'Rabbit Face' }
        ],
        food: [
            { emoji: '🍏', name: 'Green Apple' },
            { emoji: '🍎', name: 'Red Apple' },
            { emoji: '🍐', name: 'Pear' },
            { emoji: '🍊', name: 'Tangerine' },
            { emoji: '🍋', name: 'Lemon' }
        ],
        activities: [
            { emoji: '⚽', name: 'Soccer Ball' },
            { emoji: '🏀', name: 'Basketball' },
            { emoji: '🏈', name: 'American Football' },
            { emoji: '⚾', name: 'Baseball' },
            { emoji: '🎾', name: 'Tennis' }
        ]
        // Add more categories and emojis as needed
    };

    const searchInput = document.getElementById('emoji-search');
    const searchResults = document.getElementById('search-results');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const emojiDisplay = document.getElementById('emoji-display');
    const emojiInput = document.getElementById('emoji-input');
    const generateButton = document.getElementById('generate-emoji');
    const generatedEmoji = document.getElementById('generated-emoji');

    // Search for emojis by name or character
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query) {
            // Iterate through each category to find matching emojis
            for (const category in emojiData) {
                emojiData[category].forEach(emojiObject => {
                    if (emojiObject.name.toLowerCase().includes(query) || emojiObject.emoji.includes(query)) {
                        searchResults.innerHTML += `<div><span>${emojiObject.emoji}</span> - ${emojiObject.name}</div>`;
                    }
                });
            }
        }
    });

    // Display emojis by category
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = button.getAttribute('data-category');
            emojiDisplay.innerHTML = '';
            emojiData[category].forEach(emojiObject => {
                emojiDisplay.innerHTML += `<div><span>${emojiObject.emoji}</span> - ${emojiObject.name}</div>`;
            });
        });
    });

    // Generate emoji from code or randomly select an emoji
    generateButton.addEventListener('click', function () {
        const emojiCode = emojiInput.value.trim();

        if (emojiCode) {
            // Generate emoji from input code
            try {
                const generated = String.fromCodePoint(parseInt(emojiCode, 16));
                generatedEmoji.innerHTML = `<span>${generated}</span><p>Code: U+${emojiCode.toUpperCase()}</p>`;
            } catch (e) {
                generatedEmoji.innerHTML = `<p style="color: red;">Invalid emoji code!</p>`;
            }
        } else {
            // Randomly select an emoji and display its code
            const randomEmojiObject = getRandomEmoji();
            const codePoint = randomEmojiObject.emoji.codePointAt(0).toString(16).toUpperCase();
            generatedEmoji.innerHTML = `<span>${randomEmojiObject.emoji}</span> - ${randomEmojiObject.name}<p>Code: U+${codePoint}</p>`;
        }
    });

    // Function to get a random emoji from the emoji data
    function getRandomEmoji() {
        const categories = Object.keys(emojiData);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const emojis = emojiData[randomCategory];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }
});