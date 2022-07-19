import React from 'react';

import Aligner  from './Aligner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Design/Aligner',
  component: Aligner,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  /*argTypes: {
    backgroundColor: { control: 'color' },
  },*/
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template = (args) => <div style={{width:"300px", height:"200px", backgroundColor:"#eee"}}><Aligner {...args}>content</Aligner></div>
