// src/components/VirtualKeyboard.js
import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { initWebSocket } from '../utils/websocket';

const VirtualKeyboard = ({ projectId }) => {
  const synthRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    // Initialize Tone.js synth
    synthRef.current = new Tone.Synth().toDestination();

    // Initialize WebSocket connection
    wsRef.current = initWebSocket(projectId);

    // Clean up on component unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.disconnect();
      }
    };
  }, [projectId]);

  const handleNoteClick = note => {
    // Play note using Tone.js
    synthRef.current.triggerAttackRelease(note, '8n');

    // Send note to WebSocket
    if (wsRef.current && wsRef.current.connected) {
      wsRef.current.emit('play_note', { note });
    }
  };

  return (
    <div className="virtual-keyboard">
      <button onClick={() => handleNoteClick('C4')}>C</button>
      <button onClick={() => handleNoteClick('D4')}>D</button>
      <button onClick={() => handleNoteClick('E4')}>E</button>
      <button onClick={() => handleNoteClick('F4')}>F</button>
      <button onClick={() => handleNoteClick('G4')}>G</button>
      <button onClick={() => handleNoteClick('A4')}>A</button>
      <button onClick={() => handleNoteClick('B4')}>B</button>
    </div>
  );
};

export default VirtualKeyboard;
