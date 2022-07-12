import React from 'react';

import IngredientDetailed  from './IngredientDetailed';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Business/IngredientDetailed',
  component: IngredientDetailed,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  /*argTypes: {
    backgroundColor: { control: 'color' },
  },*/
  argTypes: { toggleIngredientInPantry: {action: 'toggle!!'} },

};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <IngredientDetailed {...args} />;

export const Detailed = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Detailed.args = {
  isInPantry: true,
  ingredient: {ingredient: 'Apple Brandy', measure: '3 shots'},
};
