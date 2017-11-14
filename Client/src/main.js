import environment from './environment';
import regeneratorRuntime from 'regenerator-runtime';
import config from './auth-config';
window.regeneratorRuntime = regeneratorRuntime;

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-auth', (baseConfig)=>{
      baseConfig.configure(config);
 })
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
