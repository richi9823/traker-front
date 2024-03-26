import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  Alert, 
  Button, 
  FormGroup, 
  Input, 
  Row,
  Col,
  Form
} from 'reactstrap';
import s from './Login.module.scss';
import Widget from '../../components/Widget';
import { loginUser, signup, signupFailurePassword } from '../../actions/auth';
import jwt from 'jsonwebtoken';
import config from '../../config'
import { TrakerApi } from '../../constants/apiConf';

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isFetching: PropTypes.bool,
    location: PropTypes.any, // eslint-disable-line
    errorMessage: PropTypes.string,
    message: PropTypes.string
  };

  static defaultProps = {
    isAuthenticated: false,
    isFetching: false,
    location: {},
    errorMessage: null,
    message: null,
  };

  static isAuthenticated(token) {
    // We check if app runs with backend mode
    if (!config.isBackend && token) return true;
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token.replace("Bearer ", ""));
    TrakerApi.ApiClient.instance.authentications['Bearer Authentication'].accessToken = token;
    return date < data.exp;
}

  constructor(props) {
    super(props);

    this.state = {
      login_nickname: "",
      login_password: "",
      firstname:"",
      lastname:"",
      nickname:"",
      email:"",
      password:"",
      r_password:"",
      loginForm: true,
    };
  }

  changeLogin = (event) => {
    this.setState({login_nickname: event.target.value});
  }

  changeLoginPassword = (event) => {
    this.setState({login_password: event.target.value});
  }

  changeFirstname = (event) => {
    this.setState({firstname: event.target.value});
  }

  changeLastname = (event) => {
    this.setState({lastname: event.target.value});
  }

  changeNickname = (event) => {
    this.setState({nickname: event.target.value});
  }

  changePassword = (event) => {
    this.setState({password: event.target.value});
  }

  changeRPassword = (event) => {
    this.setState({r_password: event.target.value});
  }

  changeEmail = (event) => {
    this.setState({email: event.target.value});
  }

  changeLoginForm = () => {
    this.setState({loginForm: !this.state.loginForm});
  }


  doLogin = (e) => {
    this.props.dispatch(
      loginUser({
        login: this.state.login_nickname,
        password: this.state.login_password,
      }),
    );
    e.preventDefault();
  }

  doSignup = (e) => {
    const { firstname, lastname, nickname, password, email } = this.state;
    if(this.state.password !== this.state.r_password){
      this.props.dispatch(signupFailurePassword("La contraseña no coincide"))
    }else{
      this.props.dispatch(
        signup({
          firstname,
          lastname,
          nickname,
          password,
          email
        })
      ).then(() => {
        this.setState({loginForm: !this.state.loginForm});
      })
    }
    e.preventDefault();
  }

  render() {
    const {loginForm} = this.state;
    const {from} = this.props.location.state || {
      from: {pathname: '/app'},
    };

    if (this.props.isAuthenticated) {
      return <Redirect to={from} />;
    }

        return (
          <div className={s.root}>
          <Row>
            <Col xs={{size: 10, offset: 1}} sm={{size: 6, offset: 3}} lg={{size:4, offset: 4}}>
              <p className="text-center">React Dashboard</p>
              <Widget className={s.widget}>
              {this.props.message && (
                    <Alert size="sm" color="success">
                      {this.props.message}
                    </Alert>
                  )}
              {loginForm ? 
                <>
                <h4 className="mt-0">Login to your Web App</h4>
                <p className="fs-sm text-muted">
                  User your username and password to sign in<br />
                  Don&#39;t have an account? Sign up now!
                </p>
                <Form className="mt" onSubmit={this.doLogin}>
                  {this.props.errorMessage && (
                    <Alert size="sm" color="danger">
                      {this.props.errorMessage}
                    </Alert>
                  )}
                  <FormGroup className="form-group">
                    <Input
                      className="no-border"
                      value={this.state.login_nickname}
                      onChange={this.changeLogin}
                      type="text"
                      required
                      name="username"
                      placeholder="Username"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      className="no-border"
                      value={this.state.login_password}
                      onChange={this.changeLoginPassword}
                      type="password"
                      required
                      name="password"
                      placeholder="Password"
                    />
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <Button color="default" size="sm" onClick={() => this.changeLoginForm()}>
                        Crear cuenta
                      </Button>
                      <Button color="success" size="sm" type="submit">
                        {this.props.isFetching ? 'Loading...' : 'Login'}
                      </Button>
                    </div>
                  </div>
                </Form>
                </>
                :
                <>
                <h4 className="mt-0">Signup to your Web App</h4>
                <p className="fs-sm text-muted">
                  Rellena el formulario<br />
                </p>
                <Form className="mt" onSubmit={this.doSignup}>
                  {this.props.errorMessage && (
                    <Alert size="sm" color="danger">
                      {this.props.errorMessage}
                    </Alert>
                  )}
                  <FormGroup className="form-group">
                    <Input
                      className="no-border"
                      value={this.state.firstname}
                      onChange={this.changeFirstname}
                      type="text"
                      required
                      name="firstname"
                      placeholder="Nombre"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      className="no-border"
                      value={this.state.lastname}
                      onChange={this.changeLastname}
                      type="text"
                      required
                      name="lastname"
                      placeholder="Apellido"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      className="no-border"
                      value={this.state.email}
                      onChange={this.changeEmail}
                      type="text"
                      required
                      name="email"
                      placeholder="Email"
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Input
                      className="no-border"
                      value={this.state.nickname}
                      onChange={this.changeNickname}
                      type="text"
                      required
                      name="username"
                      placeholder="Username"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      className="no-border"
                      value={this.state.password}
                      onChange={this.changePassword}
                      type="password"
                      required
                      name="password"
                      placeholder="Password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      className="no-border"
                      value={this.state.r_password}
                      onChange={this.changeRPassword}
                      type="password"
                      required
                      name="password"
                      placeholder="Repeat password"
                    />
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                    <Button color="success" size="sm" type="submit">
                        {this.props.isFetching ? 'Loading...' : 'Crear cuenta'}
                      </Button>
                      <Button color="default" size="sm" onClick={() => this.changeLoginForm()}>
                        Ir al Login
                      </Button>
                    </div>
                  </div>
                </Form>
                </>}
              </Widget>
            </Col>
          </Row>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage,
        message: state.auth.message,
    };
}

export default withRouter(connect(mapStateToProps)(Login));

