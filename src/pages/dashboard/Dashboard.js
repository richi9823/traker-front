import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { getAllVehicles } from '../../actions/vehicle';
import { editAlert, getAllAlerts } from '../../actions/alert';
import { getAllNotifications } from '../../actions/notification';
import DashboardView from './DashboardView';

class Dashboard extends Component {
  /* eslint-disable */
  static propTypes = {
    posts: PropTypes.any,
    isFetchingVehicles: PropTypes.bool,
    isFetchingNotifications: PropTypes.bool,
    isFetchingAlerts: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };
  /* eslint-enable */

  static defaultProps = {
    isFetchingVehicles: false,
    isFetchingNotifications: false,
    isFetchingAlerts: false,
    errorMessageVehicles: null,
    errorMessageNotification: null,
    errorMessageAlert: null,
  };

  state = {
    vehicles: {items:[], total: 0},
    alerts:{items:[], total: 0},
    notifications:{items:[], total: 0},
    showVehicleError: false
  };

  componentDidMount() {
      this.props.dispatch(getAllVehicles(1,5, null)).then((res) =>{
        this.setState({vehicles: res, showVehicleError:false})
      }).catch(()=>{
        this.setState({showVehicleError:true})
      });
      this.props.dispatch(getAllAlerts(null, 0,5, null)).then((res) =>{
        this.setState({alerts: res})
      });
      this.props.dispatch(getAllNotifications(null, null, false, 1,5, null)).then((res) =>{
        this.setState({notifications: res})
      });
  }

  onRegister = () => {
    this.props.dispatch(getAllVehicles(1,5, null)).then((res) =>{
      this.setState({vehicles: res})
    });
  }

  onToggled = (value, id) => {
    const {alerts} = this.state;
    this.props.dispatch(editAlert(id, {silenced:value})).then((res) =>{
      var objIndex = alerts.items.findIndex(obj => obj.id === id)
      alerts.items[objIndex].silenced = res.silenced
      this.setState({alerts: alerts})
    });
  }

  render() {
    
    const {vehicles, alerts, notifications, showVehicleError} = this.state
    return <DashboardView
        vehicles={vehicles}
        alerts={alerts}
        notifications={notifications}
        showVehicleError={showVehicleError}
        onToggled = {this.onToggled}
        onRegister ={this.onRegister}
        isFetchingVehicles ={this.props.isFetchingVehicles}
        isFetchingNotifications ={this.props.isFetchingNotifications}
        isFetchingAlerts ={this.props.isFetchingAlerts}
        errorMessageVehicles ={this.props.errorMessageVehicles}
        errorMessageNotification ={this.props.errorMessageNotification}
        errorMessageAlert ={this.props.errorMessageAlert}
      />
  }
}

function mapStateToProps(state) {
  return {
    isFetchingVehicles: state.vehicle.isFetching,
    isFetchingNotifications: state.notification.isFetching,
    isFetchingAlerts: state.alert.isFetching,
    errorMessageVehicles: state.vehicle.errorMessage,
    errorMessageNotification: state.notification.errorMessage,
    errorMessageAlert: state.alert.errorMessage,
  };
}

export default connect(mapStateToProps)(Dashboard);
