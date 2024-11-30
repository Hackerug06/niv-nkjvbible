// Bible data structure (simplified - you'd typically load this from a JSON file or database)
const bibleData = {
    nkjv: {
        oldTestament: {
            Genesis: {
                1: [
                    "In the beginning God created the heaven and the earth.",
                    "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters."
                ]
                // More chapters and verses would be added
            }
            // More books...
        },
        newTestament: {
            Matthew: {
                1: [
                    "The book of the generation of Jesus Christ, the son of David, the son of Abraham.",
                    "Abraham begat Isaac; and Isaac begat Jacob; and Jacob begat Judas and his brethren;"
                ]
                // More chapters and verses
            }
            // More books...
        }
    },
    niv: {
        // Similar structure with NIV translations
        oldTestament: {
            Genesis: {
                1: [
                    "In the beginning God created the heavens and the earth.",
                    "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters."
                ]
            }
            // More books...
        },
        newTestament: {
            Matthew: {
                1: [
                    "This is the genealogy of Jesus the Messiah the son of David, the son of Abraham:",
                    "Abraham was the father of Isaac, Isaac the father of Jacob, Jacob the father of Judah and his brothers;"
                ]
            }
            // More books...
        }
    }
};

// DOM Elements
const versionSelect = document.getElementById('version-select');
const testamentSelect = document.getElementById('testament-select');
const bookSelect = document.getElementById('book-select');
const chapterSelect = document.getElementById('chapter-select');
const verseDisplay = document.getElementById('verse-display');

// Populate Book Select
function populateBooks() {
    const version = versionSelect.value;
    const testament = testamentSelect.value;
    const books = Object.keys(bibleData[version][testament === 'old' ? 'oldTestament' : 'newTestament']);
    
    bookSelect.innerHTML = books.map(book => 
        `<option value="${book}">${book}</option>`
    ).join('');
    
    populateChapters();
}

// Populate Chapter Select
function populateChapters() {
    const version = versionSelect.value;
    const testament = testamentSelect.value;
    const book = bookSelect.value;
    const testamentKey = testament === 'old' ? 'oldTestament' : 'newTestament';
    const chapters = Object.keys(bibleData[version][testamentKey][book]);
    
    chapterSelect.innerHTML = chapters.map(chapter => 
        `<option value="${chapter}">Chapter ${chapter}</option>`
    ).join('');
    
    displayVerses();
}

// Display Verses
function displayVerses() {
    const version = versionSelect.value;
    const testament = testamentSelect.value;
    const book = bookSelect.value;
    const chapter = chapterSelect.value;
    const testamentKey = testament === 'old' ? 'oldTestament' : 'newTestament';
    
    const verses = bibleData[version][testamentKey][book][chapter];
    
    verseDisplay.innerHTML = verses.map((verse, index) => 
        `<p><span class="verse-number">${index + 1}</span>${verse}</p>`
    ).join('');
}

// Event Listeners
versionSelect.addEventListener('change', populateBooks);
testamentSelect.addEventListener('change', populateBooks);
bookSelect.addEventListener('change', displayVerses);
chapterSelect.addEventListener('change', displayVerses);

// Initial population
populateBooks();
