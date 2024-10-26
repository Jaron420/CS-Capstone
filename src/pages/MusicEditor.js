// src/pages/MusicEditor.js
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { initWebSocket } from '../utils/websocket';
import { Typography } from '@mui/material';
import VirtualKeyboard from '../components/VirtualKeyboard';
import MusicNotation from '../components/MusicNotation';
import * as Tone from 'tone';

function MusicEditor() {
  const [notes, setNotes] = useState([]);
  const { projectId } = useParams();
  const wsRef = useRef(null);
  const synthRef = useRef(new Tone.Synth().toDestination());

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

  const playNote = (note, velocity) => {
    // Play note locally
    playNoteLocally(note, velocity);
    // Send note to server
    const message = {
      type: 'notePlayed',
      data: { note, velocity },
    };
    wsRef.current.send(JSON.stringify(message));
  };

  const playNoteLocally = (note, velocity) => {
    synthRef.current.triggerAttackRelease(note, '8n', undefined, velocity);
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

  return (
    <div>
      <Typography variant="h4">Music Editor</Typography>
      <MusicNotation notes={notes} />
      <VirtualKeyboard onPlayNote={playNote} />
    </div>
  );
}

export default MusicEditor;
