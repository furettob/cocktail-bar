import {cleanup, fireEvent, render} from '@testing-library/react'
import Usercard from './Usercard'
import Row from '../Row'
import ImageContainer from '../ImageContainer/ImageContainer'
import { shallow, mount, configure} from 'enzyme';
import { renderer } from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import Tag from "../TagStylus/TagStylus"
configure({ adapter: new Adapter() });

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.

const USERDATA = {
  "createdAt":1657541142000,
  "createdByMeList":{
    "-N6jWd_eC8xfSrubJRFr":{
      "name":"Campari Beer"
    },
    "-N6kD6PseQIBCmMQZR9d":{
      "name":"Mojito verde"
    },
    "-N6lK16srpEMccMHQJCQ":{
      "name":"Green Mojito 2"
    }
  },
  "email":"undistratto@gmail.com",
  "favouriteList":{
    "11000":{
      "name":"test"
    },
    "12089":{
      "name":"Rum Old-fashioned"
    },
    "12093":{
      "name":"Rum Sour"
    },
    "12097":{
      "name":"Rum Toddy"
    },
    "12572":{
      "name":"test"
    },
    "178310":{
      "name":"test"
    },
    "178339":{
      "name":"The Strange Weaver"
    }
  },
  "uid":"xYhVTgL6rUTVOKF8IKe7iR6a1ef1",
  "username":"furettoAHAHAH"
}

const wrapper = shallow(<Usercard userdata={USERDATA} />);

describe('Usercard renders properly', () => {

  test('Usercard shows username', () => {
    const { queryByText, queryAllByText } = render(
      <Usercard userdata={USERDATA} />,
    );
    expect(queryAllByText(USERDATA.username, { exact: false })).toBeTruthy();
  })

  test('Usercard shows email', () => {
    const { queryByText, queryAllByText } = render(
      <Usercard userdata={USERDATA} />,
    );
    if (USERDATA.email) {
      expect(queryAllByText(USERDATA.email, { exact: false })).toBeTruthy();
    }
  })

  test('Usercard shows favourites when present', () => {
    const { queryByText, queryAllByText } = render(
      <Usercard userdata={USERDATA} />,
    );
    if (USERDATA.favouriteList && Object.keys(USERDATA.favouriteList).length > 0) {
      expect(queryByText("I miei cocktail preferiti", { exact: false })).toBeTruthy();
    } else {
      expect(queryByText("Non hai ancora cocktail preferiti", { exact: false })).toBeTruthy();
    }
  })

  test('Usercard shows max 2 favourites, show more shows them all', () => {
    const { queryByText, getByText, queryAllByText } = render(
      <Usercard userdata={USERDATA} />,
    );
    if (USERDATA.favouriteList && Object.keys(USERDATA.favouriteList).length > 0) {
      // Attenzione: l'uso di classi non è incoraggiato (ma è un commento che si applica soprattutto alle classi date per lo stile)
      expect(wrapper.children().find({ "data-testid": "favourite" }).find(Tag).length).toBeLessThanOrEqual(2)

      if (Object.keys(USERDATA.favouriteList).length > 2) {
        expect(wrapper.find('.morefav')).toBeTruthy();
        // oppure wrapper.find('.unaclasse').simulate('click');
        // oppure fireEvent.click(getByText("Show more", { exact: false }))
        wrapper.find('.morefav').simulate('click');
        expect(wrapper.children().find({ "data-testid": "favourite" }).find(Tag).length).toEqual(Object.keys(USERDATA.favouriteList).length)
        expect(wrapper.find('.lessfav')).toBeTruthy();
        wrapper.find('.lessfav').simulate('click');
        expect(wrapper.children().find({ "data-testid": "favourite" }).find(Tag).length).toBeLessThanOrEqual(2)
      }
    } else {
      expect(queryByText("Non hai ancora cocktail preferiti", { exact: false })).toBeTruthy();
    }
  })

  test('Usercard shows "created by me" when present', () => {
    const { queryByText, queryAllByText } = render(
      <Usercard userdata={USERDATA} />,
    );
    if (USERDATA.favouriteList && Object.keys(USERDATA.favouriteList).length > 0) {
      expect(queryByText("I cocktail realizzati da me", { exact: false })).toBeTruthy();
      // Attenzione: l'uso di classi non è incoraggiato (ma è un commento che si applica soprattutto alle classi date per lo stile)
      expect(wrapper.children().find({ "data-testid": "createdbyme" }).find(Tag).length).toEqual(2)
    }
    if (USERDATA.createdByMeList && Object.keys(USERDATA.createdByMeList).length > 0) {
      // Attenzione: l'uso di classi non è incoraggiato (ma è un commento che si applica soprattutto alle classi date per lo stile)
      expect(wrapper.children().find({ "data-testid": "createdbyme" }).find(Tag).length).toBeLessThanOrEqual(2)

      if (Object.keys(USERDATA.createdByMeList).length > 2) {
        expect(wrapper.find('.morecreated')).toBeTruthy();
        // oppure wrapper.find('.unaclasse').simulate('click');
        // oppure fireEvent.click(getByText("Show more", { exact: false }))
        wrapper.find('.morecreated').simulate('click');
        expect(wrapper.children().find({ "data-testid": "createdbyme" }).find(Tag).length).toEqual(Object.keys(USERDATA.createdByMeList).length)
        expect(wrapper.find('.lesscreated')).toBeTruthy();
        wrapper.find('.lesscreated').simulate('click');
        expect(wrapper.children().find({ "data-testid": "createdbyme" }).find(Tag).length).toBeLessThanOrEqual(2)
      }
    } else {
      expect(queryByText("Non hai ancora creato cocktail", { exact: false })).toBeTruthy();
    }
  })

  test('Usercard has 1 avatar', () => {
    expect(wrapper.children().find(ImageContainer).length).toEqual(1)
  })
})
