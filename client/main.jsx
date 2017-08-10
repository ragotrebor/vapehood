import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, browserHistory } from 'react-router-dom';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

import App from '../imports/ui/App.jsx';
import { NotFound } from '../imports/ui/NotFound.jsx';

import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render(<BrowserRouter history={ browserHistory }>
  			<Switch>
  				<Route path="/not-found" component={ NotFound } />
      		<Route path="/" component={ App } />
      	</Switch>
	      {/*<Route path="/" component={ App }>
	        <IndexRoute component={ Index } />
	        <Route path="/signin" component={() => <Accounts.ui.LoginForm />} />
	        <Route path="/signup" component={() => <Accounts.ui.LoginForm formState={STATES.SIGN_UP} />} />
	       	<Route path="*" component={ NotFound } />

	        <Route path="/hello/:name" component={ Hello } />
	      </Route>
	      <Route path="/admin" component={ App }>
	        <IndexRoute component={ Admin } />
	      </Route>*/}
	    </BrowserRouter>, 
	    document.getElementById('render-target')
	    );
});
