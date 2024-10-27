// src/components/MusicNotation.js

import React, { useEffect, useRef } from 'react';
import Vex from 'vexflow';

function MusicNotation({ notes }) {
  const divRef = useRef(null);

  useEffect(() => {
    const VF = Vex.Flow;
    const div = divRef.current;
    div.innerHTML = ''; // Clear previous rendering

    // Create the renderer
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    // Convert note strings to VexFlow StaveNotes
    let staveNotes = notes.map(note => {
      return new VF.StaveNote({
        clef: 'treble',
        keys: [note],
        duration: 'q',
      });
    });

    // If no notes, add a whole rest to prevent errors
    if (staveNotes.length === 0) {
      staveNotes = [
        new VF.StaveNote({
          clef: 'treble',
          keys: ['b/4'],
          duration: 'wr', // 'wr' stands for whole rest
        }),
      ];
    }

    // Calculate total duration of notes in ticks
    const totalDurationTicks = staveNotes.reduce((sum, note) => sum + note.getTicks().value(), 0);

    // Ticks per measure (default resolution is 4096 ticks per whole note)
    const ticksPerMeasure = VF.RESOLUTION * 4; // For 4/4 time signature

    // Calculate the number of measures needed
    const measuresNeeded = Math.ceil(totalDurationTicks / ticksPerMeasure) || 1;

    // Adjust the width of the renderer based on the number of measures
    const staveWidth = 500 * measuresNeeded;
    renderer.resize(staveWidth + 20, 200); // Add some padding

    const context = renderer.getContext();
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

    // Create a stave
    const stave = new VF.Stave(10, 40, staveWidth);
    stave.addClef('treble').addTimeSignature('4/4');
    stave.setContext(context).draw();

    // Create a voice in 4/4 and add the notes
    const voice = new VF.Voice({ num_beats: 4 * measuresNeeded, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
    voice.addTickables(staveNotes);

    // Format and justify the notes to fit the stave width
    new VF.Formatter().joinVoices([voice]).format([voice], staveWidth);

    // Render voice
    voice.draw(context, stave);
  }, [notes]);

  return <div ref={divRef}></div>;
}

export default MusicNotation;
