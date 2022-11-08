/*
 * @Description: vue实例入口
 */
import { App, createApp } from 'vue';
import AppPage from '@/app.vue';
import router, { setupRouter } from '@/router';
import { setupPinia } from '@/store';
import { setupErrorHandle } from './utils/error-handler';
import { setupRouterGuard } from './router/guards';
import { setupI18n } from '@/i18n';
import {
  setupGlobDirectives,
  setupGlobalProperties,
  setupLogger,
  setupConsole,
  setupCustomComponents
} from '@/plugins';
import 'default-passive-events'; //解决滚动背景的问题
import '@/style/index.less';
import 'virtual:windi.css';
import 'virtual:svg-icons-register';

const app = createApp(AppPage);

function bootstrap(app: App<any>) {
  // 设置此项为 true 可以在浏览器开发工具的“性能/时间线”页中启用对组件初始化、编译、渲染和修补的性能表现追踪。
  app.config.performance = true;

  // Register global directive
  setupGlobDirectives(app);

  // Register global component
  setupCustomComponents(app);

  // Register global properties
  setupGlobalProperties(app);

  // global configure error handler
  setupErrorHandle(app);

  // pinia
  setupPinia(app);

  // router
  setupRouter(app);

  // router-guard
  setupRouterGuard(router);

  //i18n
  setupI18n(app);

  // logger
  setupLogger();

  // 个性化控制台
  setupConsole();

  // 现在所有的导航都是异步的，等路由ready以后再进行挂载组件；
  router.isReady().then(() => app.mount('#app'));
  // 在导航期间每次发生未捕获的错误时都会调用该处理程序
  router.onError(err => {
    console.error(err);
  });
}

void bootstrap(app);
