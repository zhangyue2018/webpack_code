import count from './js/count';
import sum from './js/sum';
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
import './stylus/index.styl';
import './css/iconfont.css';
console.log(count(9, 2));
console.log(sum(1, 2, 3, 4, 5, 6));

// 判断是否支持热模块替换功能
if(module.hot) {
    module.hot.accept('./js/count');
    module.hot.accept('./js/sum');
}