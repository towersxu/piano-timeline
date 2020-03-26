import React, { useState } from 'react'
import SmapleLibrary from '../lib/Tonejs-Instruments.js'

const rollTableStyle = require('./RollTable.css')
const { Midi } = require('@tonejs/midi')
let Tone = require('tone')

let synth1 = SmapleLibrary.load({
  instruments: "bright_piano"
}).toMaster()

const pitch = [
  'A0', 'A1', 'A2', 'A3', 'A4', 'A5','A6',
  'A#0', 'A#1', 'A#2', 'A#3', 'A#4', 'A#5','A#6',
  'B0', 'B1', 'B2', 'B3', 'B4', 'B5','B6',
  'C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7',
  'C#0', 'C#1', 'C#2', 'C#3', 'C#4', 'C#5', 'C#6',
  'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7',
  'D#0', 'D#1', 'D#2', 'D#3', 'D#4', 'D#5', 'D#6', 'D#7',
  'E0', 'E1', 'E2', 'E3', 'E4', 'E5','E6',
  'F0', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7',
  'F#0', 'F#1', 'F#2', 'F#3', 'F#4', 'F#5','F#6',
  'G0', 'G1', 'G2', 'G3', 'G4', 'G5','G6',
  'G#0', 'G#1', 'G#2', 'G#3', 'G#4', 'G#5','G#6'
]

let ro1 = Array.of(...Array(pitch.length))
ro1 = ro1.map(r => {
  return Array.of(...Array(540))
})

function RollTable () {
  const [ro, setRo] = useState(ro1)
  const click = function (e: React.MouseEvent) {
    let idx = (e.target as HTMLElement).dataset.index
    // console.log(idx)
    if (idx) {
      let rowIdx = Number(idx.split('_')[0])
      let colIdx = Number(idx.split('_')[1])
      ro[rowIdx][colIdx] = true
      setRo((state) => {
        return [...state]
      })
    }
  }

  const load = function () {
    let url = '/midi/体面.mid'
    Midi.fromUrl(url).then((res: any) => {
      const now = Tone.now() + 0.5
      res.tracks.forEach((track: { notes: any[] }, i: number) => {
        if (i !== 0) return // 先尝试单声道
        // console.log(5555)
        track.notes.forEach(note => {
          // console.log(note.name, note.ticks, note.durationTicks + 1)
          let idx = pitch.indexOf(note.name)
          let row = note.ticks / 240
          let length = (note.durationTicks + 1) / 240
          // console.log(idx, row, length)
          if (idx !== -1) {
            while (length > 0 && (row + length -1) < 540 ) {
              ro[idx][row + length - 1] = true
              length--
            }
          } else {
            console.log(note)
          }
          synth1.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity)
        })
      })
      console.log('down')
      setRo((state) => {
        return [...state]
      })
    })
  }

  const rows = pitch.map((p, index) => {
    return <div className={rollTableStyle.panelRow} key={index} onClick={click}>
      <div className={rollTableStyle.panelItemName}>{p}</div>
      {
        ro[index].map((item: number[], idx: any) => {
          let active = ''
          // console.log(index, item, idx)
          if (item) {
            active = rollTableStyle.active
          }
          return <div className={`${rollTableStyle.panelItem} ${active}`} data-index={`${index}_${idx}`} key={`${index}_${idx}`}></div>
        })
      }
    </div>
  })
  return (
    <div className={rollTableStyle.wrap}>
      <div><button onClick={load}>play</button></div>
      { rows }
    </div>
  )
}

export default RollTable