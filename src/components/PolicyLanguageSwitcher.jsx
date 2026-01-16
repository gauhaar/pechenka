"use client";
import React from 'react';

const PolicyLanguageSwitcher = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-gray-400 text-sm mr-2">Language:</span>
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          currentLang === 'en'
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        English
      </button>
      <button
        onClick={() => onLanguageChange('ru')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          currentLang === 'ru'
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        Русский
      </button>
    </div>
  );
};

export default PolicyLanguageSwitcher;
