new Vue({
  el: '#app',
  render(createElement) {
    return createElement('div', {
      attrs: {
        id: 'app',
      }
    }, this.message);

  },
  data() {
    return {
      message: 'hello world'
    }
  }
});

// 工厂函数的方式
Vue.component('HelloWorld', function (resolve, reject) {
  require(['./components/helloWorld'], function (res) {
    return resolve(res);
  })
});

// promise 方式
Vue.component('HelloWorld', () => import('./components/helloworld.vue'));
new Vue({
  el: "#app",
  render(h) {
    return h(App);
  }
});

// 高级异步组件
const LoadingComp = {
  template: `<div>loading</div>`
};

const ErrorComp = {
  template: '<div>error</div>'
};

const AsyncComp = () => ({
  component: import('./components/HelloWorld.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: 200, // 渲染加载中组件前的等待时间，默认 200ms
  timeout: 1000, // 最长等待时间，超出这个时间就会渲染错误组件
});

Vue.component("HelloWorld", AsyncComp);

new Vue({
  el: '#app',
  render: (h) => {
    return h(App);
  }
});
