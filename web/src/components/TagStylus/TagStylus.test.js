import renderer from 'react-test-renderer'
import TestingTagStylus from "./TagStylus"

it('renders correctly', () => {
  const domTree = renderer.create(<TestingTagStylus name={"I'm testing"}/>).toJSON()
  expect(domTree).toMatchSnapshot()
})
