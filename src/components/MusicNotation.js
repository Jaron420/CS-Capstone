// src/components/MusicNotation.js
import React, { useEffect, useRef } from 'react';
import Vex from 'vexflow';

function MusicNotation({ notes }) {
  const divRef = useRef(null);

  useEffect(() => {
    const VF = Vex.Flow;
    const div = divRef.current;
    div.innerHTML = ''; // Clear previous rendering

    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(600, 200);
    const context = renderer.getContext();
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

    const stave = new VF.Stave(10, 40, 500);
    stave.addClef('treble').addTimeSignature('4/4');
    stave.setContext(context).draw();

    // Convert note strings to VexFlow StaveNotes
    const staveNotes = notes.map(note => {
      return new VF.StaveNote({
        clef: 'treble',
        keys: [note],
        duration: 'q',
      });
    });

    // Create a voice in 4/4 and add the notes from above
    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(staveNotes);

    // Format and justify the notes to 500 pixels
    new VF.Formatter().joinVoices([voice]).format([voice], 500);

    // Render voice
    voice.draw(context, stave);
  }, [notes]);

  return <div ref={divRef}></div>;
}

export default MusicNotation;
