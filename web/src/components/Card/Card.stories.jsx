import React from 'react';

import Card  from './Card';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Design/Aligner',
  component: Card,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  /*argTypes: {
    backgroundColor: { control: 'color' },
  },*/
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <div style={{width:"300px", height:"200px", backgroundColor:"#eee"}}><Card {...args}>content</Card></div>

export const Detailed = Template.bind({});
