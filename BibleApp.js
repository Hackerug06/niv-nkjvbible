import React, { useState } from 'react';
import { Book, ChevronRight } from 'lucide-react';

// Sample Bible data (you'd replace this with a full Bible database)
const bibleData = {
  NKJV: {
    John: {
      '3:16': 'For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.',
      '1:1': 'In the beginning was the Word, and the Word was with God, and the Word was God.'
    }
  },
  NIV: {
    John: {
      '3:16': 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
      '1:1': 'In the beginning was the Word, and the Word was with God, and the Word was God.'
    }
  }
};

const BibleApp = () => {
  const [version, setVersion] = useState('NKJV');
  const [book, setBook] = useState('John');
  const [chapter, setChapter] = useState('3');
  const [verse, setVerse] = useState('16');

  const books = Object.keys(bibleData[version]);
  const isValidPassage = 
    bibleData[version][book] && 
    bibleData[version][book][`${chapter}:${verse}`];

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 min-h-screen">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Book className="mr-2 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-800">Bible Passage Comparison</h1>
        </div>
        
        <div className="flex space-x-2">
          {['NKJV', 'NIV'].map((bibleVersion) => (
            <button
              key={bibleVersion}
              onClick={() => setVersion(bibleVersion)}
              className={`px-3 py-1 rounded ${
                version === bibleVersion 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {bibleVersion}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Book</label>
          <select
            value={book}
            onChange={(e) => setBook(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {books.map((bookName) => (
              <option key={bookName} value={bookName}>
                {bookName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Chapter</label>
            <input
              type="text"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Verse</label>
            <input
              type="text"
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded-lg p-6">
        {isValidPassage ? (
          <div>
            <div className="flex items-center mb-4">
              <ChevronRight className="mr-2 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                {book} {chapter}:{verse} - {version} Version
              </h2>
            </div>
            <p className="text-gray-700">
              {bibleData[version][book][`${chapter}:${verse}`]}
            </p>
          </div>
        ) : (
          <p className="text-red-500">
            Passage not found in the selected version.
          </p>
        )}
      </div>
    </div>
  );
};

export default BibleApp;
