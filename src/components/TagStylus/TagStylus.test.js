import renderer from 'react-test-renderer'
import TagStylus from './TagStylus'

it('renders correctly', () => {
  const tree = renderer
    .create(<TagStylus name="test name"/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
