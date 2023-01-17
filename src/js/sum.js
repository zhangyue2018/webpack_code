import count from './count';
console.log('---in sum.js---count', count(1,9));
export default function sum(...args) {
    return args.reduce((a, b) => a+b, 0);
}