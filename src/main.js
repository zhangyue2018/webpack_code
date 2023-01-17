import count from './js/count';
import sum from './js/sum';
// import { mul } from './js/math';
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
import './stylus/index.styl';
import './css/iconfont.css';
// console.log(mul(3, 4));
console.log(count(9, 2));
console.log(sum(1, 2, 3, 4, 5, 6));

document.getElementById('btn').onclick = async function() {
    // eslint不能识别动态导入，需要额外追加配置
    let {mul} = await import('./js/math').catch(err => console.log('加载模块失败', err));
    document.getElementById('res').innerText = mul(2, 6);
};

// 判断是否支持热模块替换功能
if(module.hot) {
    module.hot.accept('./js/count');
    module.hot.accept('./js/sum');
}