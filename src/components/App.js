import React, { useState } from 'react';


const App = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');

  const calculateRelationship = () => {
    if (!name1 || !name2) {
      setResult('Please Enter valid input');
      return;
    }

    // Remove common letters
    const remainingChars = removeCommonLetters(name1, name2);
    const sumLength = remainingChars.length;
    const relationshipIndex = sumLength % 6;

    // Determine relationship status
    const relationshipStatus = getRelationshipStatus(relationshipIndex);
    setResult(relationshipStatus);
  };

  const removeCommonLetters = (str1, str2) => {
    const map1 = getCharCount(str1);
    const map2 = getCharCount(str2);

    // Remove common letters
    for (const char in map1) {
      if (map2[char]) {
        const minCount = Math.min(map1[char], map2[char]);
        map1[char] -= minCount;
        map2[char] -= minCount;
      }
    }

    // Combine remaining characters
    let remaining = '';
    for (const char in map1) {
      remaining += char.repeat(map1[char]);
    }
    for (const char in map2) {
      remaining += char.repeat(map2[char]);
    }

    return remaining;
  };

  const getCharCount = (str) => {
    const charCount = {};
    for (const char of str) {
      charCount[char] = (charCount[char] || 0) + 1;
    }
    return charCount;
  };

  const getRelationshipStatus = (index) => {
    switch (index) {
      case 1:
        return "Friends";
      case 2:
        return "Love";
      case 3:
        return "Affection";
      case 4:
        return "Marriage";
      case 5:
        return "Enemy";
      case 0:
        return "Siblings";
      default:
        return "";
    }
  };

  const clearFields = () => {
    setName1('');
    setName2('');
    setResult('');
  };

  return (
    <div id='main'>
      <h1>FLAMES Game</h1>
      <input
        type="text"
        data-testid="input1"
        name="name1"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
        placeholder="Enter First Name"
      />
      <input
        type="text"
        data-testid="input2"
        name="name2"
        value={name2}
        onChange={(e) => setName2(e.target.value)}
        placeholder="Enter Second Name"
      />
      <button
        data-testid="calculate_relationship"
        name="calculate_relationship"
        onClick={calculateRelationship}
      >
        Calculate Relationship
      </button>
      <button
        data-testid="clear"
        name="clear"
        onClick={clearFields}
      >
        Clear
      </button>
      <h3 data-testid="answer">{result}</h3>
    </div>
  );
};

export default App;