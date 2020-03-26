import React from 'react'
import App from '../src/index.tsx'

export default {
  title: 'Main'
};

export const ToStorybook = () => <App style="width: 5000px"/>

ToStorybook.story = {
  name: 'PianoRoll',
}
