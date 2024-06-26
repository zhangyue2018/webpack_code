// 完整引入
// import 'core-js';
// 按需加载
// import 'core-js/es/promise';

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
    // /* webpackChunkName: "math" */ webpack魔法命名
    let {mul} = await import(/* webpackChunkName: "math" */ './js/math').catch(err => console.log('加载模块失败', err));
    document.getElementById('res').innerText = mul(2,7);
    console.log('---mul---', mul(2,7));
};

new Promise(function(resolve, reject){
    setTimeout(resolve, 2000);
});

// 判断是否支持热模块替换功能
if(module.hot) {
    module.hot.accept('./js/count');
    module.hot.accept('./js/sum');
}

if('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        this.navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered:', registration);
        }).catch(err => {
            console.log('SW registration failed:', err);
        });
    });
}