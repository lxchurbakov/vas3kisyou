import { parse } from './utils';
import BASICS from './basics';

export default [
    ...BASICS.map((l) => parse(l)),
];