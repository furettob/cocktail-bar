import React from 'react';

import IngredientDetailed  from '../components/IngredientDetailed';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/IngredientDetailed',
  component: IngredientDetailed,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <IngredientDetailed {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  isInPantry: true,
  ingredient: {ingredient: 'Apple Brandy', measure: '3 shots'},
};
