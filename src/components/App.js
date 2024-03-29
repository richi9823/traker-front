import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ErrorPage from '../pages/error';

import '../styles/theme.scss';
import LayoutComponent from '../components/Layout';
//import DocumentationLayoutComponent from '../documentation/DocumentationLayout';
import Login from '../pages/login';
import Register from '../pages/register';
import { getSession, logoutUser } from '../actions/auth';
import Notification from '../firebaseNotification/notification';

const PrivateRoute = ({dispatch, component, ...rest }) => {
    if (!Login.isAuthenticated(localStorage.getItem('id_token'))) {
        dispatch(logoutUser());
        return (<Redirect to="/login"/>)
    } else {
        return ( // eslint-disable-line
            <Route {...rest} render={props => (React.createElement(component, props))}/>
        );
    }
};

const CloseButton = ({closeToast}) => <i onClick={closeToast} className="la la-close notifications-close"/>

class App extends React.PureComponent {

    auth = () => {
        if (!Login.isAuthenticated(localStorage.getItem('id_token'))) {
            this.props.dispatch(logoutUser());
            return (<Redirect to="/login"/>)
        }else if(!this.props.user){
            this.props.dispatch(getSession())
        }
    }
    
  render() {
    
    return (
        <div>
            <Notification/>
            <ToastContainer
                autoClose={5000}
                hideProgressBar
                closeButton={<CloseButton/>}
            />
            <HashRouter>
                {this.auth()}
                <Switch>
                    <Route path="/" exact render={() => <Redirect to="/app/main"/>}/>
                    <Route path="/app" exact render={() => <Redirect to="/app/main"/>}/>
                    <PrivateRoute path="/app" dispatch={this.props.dispatch} component={LayoutComponent}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/error" exact component={ErrorPage}/>
                </Switch>
            </HashRouter>
        </div>

    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(App);
