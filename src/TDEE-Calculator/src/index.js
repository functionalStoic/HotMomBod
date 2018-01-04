import React from 'react';
import { render } from 'react-dom';
import Styles from './Styles';
import { Form, Field } from 'react-final-form';
import MaskedInput from 'react-text-mask';

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
          <div>
            <label>Gender</label>
            <Field name="gender" component="input" type="text" disabled />
          </div>

          <div>
            <label>Age</label>
            <Field
              name="age"
              component="input"
              type="number"
              placeholder="Years"
            />
          </div>

          <div style={{ justifyContent: 'flex-end' }}>
            <label>
              <Field
                name="heightType"
                component="input"
                type="radio"
                value="feetInches"
              />{' '}
              Feet/Inches
            </label>
            <label>
              <Field
                name="heightType"
                component="input"
                type="radio"
                value="centimeters"
              />{' '}
              Centimeters
            </label>
          </div>

          <div>
            <label>Height</label>
            {values.heightType === 'feetInches' && (
              <MaskedInput
                guide={true}
                mask={[/[1-9]/, 'f', 't', ' ', /\d/, /[0-1]/, 'i', 'n']}
                //showMask
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
                // showMask
                onKeyUp={event => {
                  event.persist();
                  values['height'] = trimDims(event.target.value) / 2.54;
                }}
                keepCharPositions={true}
              />
            )}
          </div>
          <div style={{ justifyContent: 'flex-end' }}>
            <label>
              <Field
                name="weightType"
                component="input"
                type="radio"
                value="lbs"
              />{' '}
              Lbs
            </label>
            <label>
              <Field
                name="weightType"
                component="input"
                type="radio"
                value="kg"
              />{' '}
              Kg
            </label>
          </div>
          <div>
            <label>Weight</label>
            {values.weightType === 'lbs' && (
              <MaskedInput
                guide={true}
                mask={[/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, 'l', 'b', 's']}
                // showMask
                onKeyUp={event => {
                  event.persist();
                  values['weight'] = trimDims(event.target.value);
                }}
                keepCharPositions={true}
              />
            )}
            {values.weightType === 'kg' && (
              <MaskedInput
                guide={true}
                mask={[/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, 'k', 'g']}
                // showMask
                onKeyUp={event => {
                  event.persist();
                  values['weight'] = trimDims(event.target.value) * 2.20462;
                }}
                keepCharPositions={true}
              />
            )}
          </div>
          <div>
            <label>Activity Level</label> <br />
            <Field name="activityLevel" component="select" size="4">
              <option value={250}>
                Sedentary (Little to no exercise each week)
              </option>
              <option value={500}>Light (30 mins of exercise 1-3x/Week)</option>
              <option value={650}>
                Moderate (30+ mins of exercise 3-5x/Week)
              </option>
              <option value={800}>
                High (60+ Minutes of exercise 5-7x/Week)
              </option>
            </Field>
          </div>
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
