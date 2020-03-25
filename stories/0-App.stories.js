import React from 'react'
import App from '../src/index.tsx'

export default {
  title: 'Main'
};

export const ToStorybook = () => <App />

ToStorybook.story = {
  name: 'PianoRoll',
}
