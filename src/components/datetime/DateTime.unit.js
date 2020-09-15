import assert from 'power-assert';
import Harness from '../../../test/harness';
import Webform from '../../Webform';
import DateTimeComponent from './DateTime';

import {
  comp1,
  comp2,
} from './fixtures';

describe('DateTime Component', () => {
  it('Should build a date time component', () => {
    return Harness.testCreate(DateTimeComponent, comp1);
  });

  it('Test formatting', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement, { language: 'en', template: 'bootstrap3' });
    form.setForm({ display: 'form', components: [comp2] }).then(() => {
      const dateTime = form.components[0];
      const value = '2020-09-22T00:00:00';
      const formattedValue = '2020-09-22';
      const input = dateTime.element.querySelector('[ref="input"]');
      assert.equal(input.getAttribute('placeholder'), dateTime.component.format, 'Placeholder should be equal to the format');
      form.submission = {
        data: { date: value }
      };
      setTimeout(() => {
        assert.equal(dateTime.getValueAsString(value), formattedValue, 'getValueAsString should return formatted value');
        done();
      }, 250);
    }).catch(done);
  });
});
