/**
 *  介绍:  控制竖向自动滚动
 *  参数： container（外层容器）
 *        selector ( 每一项 ，假设其中每一项都是 绝对定位， 也许每一项的高度会不相同 )
 *        columns: 3,
 *        columnIndexes: [],  // 栏索引
 *        space (项与项运动间距)
 *        speed (项的运动速度)
 *        startTop (初始时的顶部位置， 第一项距离顶部的位置)
 *        stopOnHover ( 当hover 的时候 停下来 )
 *  逻辑： 元素list ，设置初始位置
 *        计时器， 变化数值，根据数值，定位元素，判断元素是否出上边，则从新接到最后一个元素
 *        hover时暂停计时器
 */
import './style.css';
import { init } from './waterfall';

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = dom;

(window as any).initScroll = init;
