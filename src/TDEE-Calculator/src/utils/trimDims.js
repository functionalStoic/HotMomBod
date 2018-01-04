import pipe from 'ramda/es/pipe';
import split from 'ramda/es/split';
import take from 'ramda/es/take';
import join from 'ramda/es/join';
import replace from 'ramda/es/replace';

export default pipe(split(''), take(5), join(''), replace('_', 0), Number);
