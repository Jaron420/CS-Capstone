// src/components/VirtualKeyboard.js

import React from 'react';

function VirtualKeyboard({ instrument, audioContext, onPlayNote }) {
  const handleNoteClick = note => {
    if (instrument) {
      // Check if the AudioContext is suspended and resume it
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      instrument.play(note);
      if (onPlayNote) {
        onPlayNote(note, 0.8);
      }
    }
  };

  return (
    <div>
      {/* Virtual Keyboard Buttons */}
      <div>
        <button onClick={() => handleNoteClick('C4')}>C</button>
        <button onClick={() => handleNoteClick('D4')}>D</button>
        <button onClick={() => handleNoteClick('E4')}>E</button>
        <button onClick={() => handleNoteClick('F4')}>F</button>
        <button onClick={() => handleNoteClick('G4')}>G</button>
        <button onClick={() => handleNoteClick('A4')}>A</button>
        <button onClick={() => handleNoteClick('B4')}>B</button>
        <button onClick={() => handleNoteClick('C5')}>C5</button>
      </div>
    </div>
  );
}

export default VirtualKeyboard;
