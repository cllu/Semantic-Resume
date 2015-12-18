import ReactDOM from 'react-dom';
import App from './app';

var rootInstance = ReactDOM.render(
  <App/>,
  document.getElementById('container')
);

if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [rootInstance];
    }
  });
}
