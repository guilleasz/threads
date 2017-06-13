import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import axios from 'axios';

import store from './store';
import App from './containers/App';
import CatalogueContainer from './containers/CatalogueContainer';
import DesignViewContainer from './containers/DesignViewContainer';
import LoginContainer from './containers/LoginContainer';
import SignupContainer from './containers/SignupContainer';
import CartViewContainer from './containers/CartViewContainer';
import CheckoutContainer from './containers/CheckoutContainer';


import { fetchDesigns } from './action-creators/designs';
import { fetchDesign } from './action-creators/currentDesign';
import { fetchCatgories } from './action-creators/categories';
import { fetchUser } from './action-creators/users';
import { fetchCart } from './action-creators/cart';

const loadDesigns = () => {
  store.dispatch(fetchDesigns());
  store.dispatch(fetchCatgories());
};

const loadDesign = (router) => {
  store.dispatch(fetchDesign(router.params.id));
};

const loadCart = () => {
  store.dispatch(fetchCart());
};

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const loadUser = () => {
  axios.defaults.headers.common['access_token'] = getCookie('access_token');
  store.dispatch(fetchUser()).then(() => loadCart());
};


export default function Root() {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} onEnter={loadUser}>
          <Route path="designs" component={CatalogueContainer} onEnter={loadDesigns} />
          <Route path="designs/:id" component={DesignViewContainer} onEnter={loadDesign} />
          <Route path="login" component={LoginContainer} />
          <Route path="signup" component={SignupContainer} />
          <Route path="cart" component={CartViewContainer} onEnter={loadCart} />
          <Route path="checkout" component={CheckoutContainer} />
          <IndexRedirect to="designs" />
        </Route>
      </Router>
    </Provider>
  );
}

          // <Route path="admin" component={AdminViewContainer}>
          //   <Route path="/reports"> component={ReportsView} />
          //   <Route path="/createdesign" component={CreateDesign} />
          //   <Route path="/createproduct" component={CreateProduct} />
          // </Route>
