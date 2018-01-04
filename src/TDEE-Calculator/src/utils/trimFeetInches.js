import pipe from 'ramda/es/pipe';
import split from 'ramda/es/split';
import map from 'ramda/es/map';
import reject from 'ramda/es/reject';
import head from 'ramda/es/head';
import join from 'ramda/es/join';
import tail from 'ramda/es/tail';
import defaultTo from 'ramda/es/defaultTo';
import min from 'ramda/es/min';

export default pipe(
  split(''),
  map(parseInt),
  reject(Number.isNaN),
  arr =>
    head(arr) * 12 + defaultTo(0)(min(11))(parseInt(join('', tail(arr)), 10))
);
