// src/pages/MusicEditor.js

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { initWebSocket } from '../utils/websocket';
import { Typography } from '@mui/material';
import VirtualKeyboard from '../components/VirtualKeyboard';
import MusicNotation from '../components/MusicNotation';
import Soundfont from 'soundfont-player';

function MusicEditor() {
  const [notes, setNotes] = useState([]);
  const { projectId } = useParams();
  const wsRef = useRef(null);
  const [instrument, setInstrument] = useState(null);
  const [instrumentName, setInstrumentName] = useState('acoustic_grand_piano');
  const [audioContext] = useState(new (window.AudioContext || window.webkitAudioContext)());

  // Load the selected instrument with error handling
  useEffect(() => {
    Soundfont.instrument(audioContext, instrumentName)
      .then(inst => {
        setInstrument(inst);
      })
      .catch(error => {
        console.error('Failed to load instrument:', error);
      });
  }, [audioContext, instrumentName]);

  // Initialize WebSocket
  useEffect(() => {
    const ws = initWebSocket(projectId);
    wsRef.current = ws;

    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.type === 'notePlayed') {
        playNoteLocally(message.data.note, message.data.velocity);
      }
    };

    return () => {
      ws.close();
    };
  }, [projectId]);

  // Handle playing a note locally and sending it to the server
  const playNote = (note, velocity) => {
    // Send note to server
    const message = {
      type: 'notePlayed',
      data: { note, velocity },
    };
    wsRef.current.send(JSON.stringify(message));

    // Play note locally
    playNoteLocally(note, velocity);
  };

  // Handle playing a note received from the server
  const playNoteLocally = (note, velocity) => {
    if (instrument) {
      // Check if the AudioContext is suspended and resume it
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      instrument.play(note, audioContext.currentTime, { gain: velocity });
    }
    // Update notation
    addNoteToNotation(note);
  };

  // Update the notation with the new note
  const addNoteToNotation = note => {
    const noteMapping = {
      C4: 'c/4',
      D4: 'd/4',
      E4: 'e/4',
      F4: 'f/4',
      G4: 'g/4',
      A4: 'a/4',
      B4: 'b/4',
      C5: 'c/5',
    };
    setNotes(prevNotes => [...prevNotes, noteMapping[note]]);
  };

  // Handle instrument selection change
  const handleInstrumentChange = event => {
    setInstrumentName(event.target.value);
  };

  return (
    <div>
      <Typography variant="h4">Music Editor</Typography>

      {/* Instrument Selector */}
      <div>
        <select value={instrumentName} onChange={handleInstrumentChange}>
          <option value="acoustic_grand_piano">Piano</option>
          <option value="violin">Violin</option>
          <option value="trumpet">Trumpet</option>
          <option value="electric_guitar_jazz">Electric Guitar</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <MusicNotation notes={notes} />

      {instrument ? (
        <VirtualKeyboard
          instrument={instrument}
          audioContext={audioContext}
          onPlayNote={playNote}
        />
      ) : (
        <div>Loading instrument...</div>
      )}
    </div>
  );
}

export default MusicEditor;
