import React from 'react';
import { render } from 'react-dom';
import Styles from './Styles';
import { Form } from 'react-final-form';
import MaskedInput from 'react-text-mask';

import GenderInput from './components/GenderInput';
import AgeInput from './components/AgeInput';
import HeightSelectorInput from './components/HeightSelectorInput';
import WeightSelectorInput from './components/WeightSelectorInput';
import ActivityLevelInput from './components/ActivityLevelInput';

// utils
import trimFeetInches from './utils/trimFeetInches';
import trimDims from './utils/trimDims';
import rmr from './utils/rmr';

const App = () => (
  <Styles>
    <Form
      onSubmit={() => ({})}
      initialValues={{
        gender: 'Female',
        activityLevel: 250,
        heightType: 'feetInches',
        weightType: 'lbs'
      }}
      render={({ values }) => (
        <form>
          <GenderInput />
          <AgeInput />
          <HeightSelectorInput />
          {console.log(values['height2'])}
          <div>
            <label>Height</label>
            {values.heightType === 'feetInches' && (
              <MaskedInput
                guide={true}
                mask={[/[1-9]/, 'f', 't', ' ', /\d/, /[0-1]/, 'i', 'n']}
                onKeyUp={event => {
                  event.persist();
                  values['height'] = trimFeetInches(event.target.value);
                }}
                placeholder="_ft__inches"
                keepCharPositions={true}
              />
            )}
            {values.heightType === 'centimeters' && (
              <MaskedInput
                guide={true}
                mask={[/[0-2]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, 'c', 'm']}
                placeholder="___._cm"
                onKeyUp={event => {
                  event.persist();
                  values['height'] = trimDims(event.target.value) / 2.54;
                }}
                keepCharPositions={true}
              />
            )}
          </div>
          <WeightSelectorInput />
          <div>
            <label>Weight</label>
            {values.weightType === 'lbs' && (
              <MaskedInput
                // guide={true}
                mask={[/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, 'l', 'b', 's']}
                onKeyUp={event => {
                  event.persist();
                  values['weight'] = trimDims(event.target.value);
                }}
                placeholder="___._lbs"
                keepCharPositions={true}
              />
            )}
            {values.weightType === 'kg' && (
              <MaskedInput
                // guide={true}
                mask={[/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, 'k', 'g']}
                onKeyUp={event => {
                  event.persist();
                  values['weight'] = trimDims(event.target.value) * 2.20462;
                }}
                keepCharPositions={true}
                placeholder="___._kgs"
              />
            )}
          </div>
          <ActivityLevelInput />
          {!isNaN(rmr(values)) && (
            <div
              style={{
                padding: '20px 30px 10px',
                justifyContent: 'space-between',
                border: 'solid 1px lightgray',
                borderRadius: '3px',
                textAlign: 'center'
              }}
            >
              <div>
                <span>TDEE</span>
                <br />
                <span style={{ fontSize: '42px' }}>
                  {Math.round(
                    rmr(values) +
                      rmr(values) * 0.1 +
                      parseInt(values.activityLevel, 10)
                  )}
                </span>
              </div>
              <div>
                <span>RMR</span>
                <br />
                <span style={{ fontSize: '42px' }}>
                  {Math.round(rmr(values))}
                </span>
              </div>
            </div>
          )}
        </form>
      )}
    />
  </Styles>
);

render(<App />, document.getElementById('root'));
