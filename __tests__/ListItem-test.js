import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


import ListItem from '../app/components/ListItem';

const itemTemplate = {title: '', desc: '', image: '', itemId: ''};

describe('ListItem', function() {

    it('should mount in a full DOM', function() {
      expect(mount(<ListItem item={itemTemplate} updateEditItemId={() => {}} />).find('.list-item').length).toBe(1);
    });

});
