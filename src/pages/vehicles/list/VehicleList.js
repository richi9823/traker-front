import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { isEqual } from 'lodash';
import s from './VehicleList.module.scss';
import Widget from '../../../components/Widget/Widget';
import { getAllVehicles, removeVehicle } from '../../../actions/vehicle';
import { options } from '../../../constants/pagination';
import { columnFormatter } from './columnFormatter';
import DeleteModal from '../../../components/Modals/DeleteModal';

const columns = ({ handleAction }) => [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
  },
  {
    dataField: 'model',
    text: 'Modelo',
    sort: true,
  },
  {
    dataField: 'license',
    text: 'Matricula',
    sort: true,
  },
  {
    dataField: 'action',
    text: 'Acciones',
    formatter: columnFormatter,
    formatExtraData: {
      viewItem: (data) => {
        handleAction('view', data);
      },
      deleteItem: (data) => {
        handleAction('delete', data);
      },
    },
    classes: 'text-right pr-0',
    headerClasses: 'text-right pr-3',
    style: {
      minWidth: '145px',
    },
  },
];

class PostList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    vehicleList: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetching: false,
    vehicleList: {items:[], total:0}
  };

  static meta = {
    title: 'Lista de vehiculos',
    description: 'Aqui puede gestionar sus vehiculos',
  };

  constructor(props) {
    super(props);

    this.state = {
      showDeleteModal:false,
      selectItem:null,
      queryParams: {
      },
      paginationOptions: options,
    };
    this.columns = columns({  handleAction: this.handleAction });
  }

  componentDidMount() {
      this.props.dispatch(getAllVehicles(1,5, null)).then(() => {
        const {vehicleList} = this.props;
        this.setState((prev) => (
          {
            paginationOptions:{
            ...prev.paginationOptions,
            totalSize: vehicleList.total
          }
          }));
      });
  }

  componentDidUpdate(prevProps, { queryParams: prevQueryParams }) {
    const {
      queryParams, paginationOptions
    } = this.state;
    if (!isEqual(prevQueryParams, queryParams)) {
      this.props.dispatch(getAllVehicles(paginationOptions.page, paginationOptions.sizePerPage, null)).then(() => {
        const {vehicleList} = this.props;
        this.setState((prev) => (
          {
            paginationOptions:{
            ...prev.paginationOptions,
            totalSize: vehicleList.total
          }
          }));
      });
    }
  }

  handleAction = (type, data) =>{
    switch(type){
      case 'delete':{
        this.setState({showDeleteModal: true, deleteItem:data})
        break;
      }
      case 'view':{
        const { history } = this.props;
        history.push("/app/vehicles/" + data.id);
        break;
      }
      default:
    }
  }

  onTableChange = (type, {
    page, sizePerPage, sortField, sortOrder,
  }) => {
    const pageNumber = page || 1;
    this.setState((prev) => {
      if (type === 'sort') {
        return {
          queryParams: { ...prev.queryParams, sortOrder, sortField },
        };
      }

      if (type === 'pagination') {
        return {
          paginationOptions: {
            ...prev.paginationOptions,
            page: pageNumber,
            sizePerPage,
          },
          queryParams: { ...prev.queryParams, pageNumber, sizePerPage },
        };
      }

      return prev;
    });
  }

  doRemove = () => {
    const { paginationOptions, deleteItem } = this.state;
    this.props.dispatch(removeVehicle(deleteItem.id)).then(()=>{
      this.props.dispatch(getAllVehicles(paginationOptions.page, paginationOptions.sizePerPage, null)).then(() => {
        const {vehicleList} = this.props;
        this.setState((prev) => (
          {
            showDeleteModal:false,
            paginationOptions:{
            ...prev.paginationOptions,
            totalSize: vehicleList.total
          }
          }));
      })
    })
  }

  render() {
    const { vehicles } = this.props.vehicleList;
    const { paginationOptions, deleteItem ,showDeleteModal } = this.state;
    return (
      <div className={s.root}>
        {showDeleteModal ? <DeleteModal isFetching={this.props.isFetching} onAccept={() => this.doRemove()} onCancel={()=> this.setState({deleteItem: null, showDeleteModal:false})} text={deleteItem.model}/> : null}
        <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Vehiculos</BreadcrumbItem>
        </Breadcrumb>
        <h1>Vehiculos</h1>
        <Widget
          className="pb-0"
          title={
            <div>
              <div className="pull-right mt-n-xs">
              </div>
              <h5 className="mt-0">
                 <span className="fw-semi-bold">Vehiculos</span>
              </h5>
            </div>
          }
        >
          <div className="widget-table-overflow">
          <PaginationProvider
                    pagination={paginationFactory(paginationOptions)}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField='id'
                          data={!vehicles ? [] : vehicles}
                          columns={this.columns}
                        >{
                            (props) => (
                              <div className='p-2'>
                                <BootstrapTable
                                  wrapperClasses='table-responsive'
                                  bordered={false}
                                  classes='table table-head-custom table-vertical-center overflow-hidden'
                                  bootstrap4
                                  keyField='id'
                                  data={!vehicles ? [] : vehicles}
                                  columns={this.columns}
                                  onTableChange={this.onTableChange}
                                  remote
                                  striped
                                  hover
                                  condensed
                                  {...paginationTableProps}
                                  {...props.baseProps}
                                >
                                </BootstrapTable>
                              </div>
                            )
                          }

                        </ToolkitProvider>
                      
                    )}
                  </PaginationProvider>
          </div>
        </Widget>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.vehicle.isFetching,
    vehicleList: state.vehicle.vehicleList,
  };
}

export default connect(mapStateToProps)(PostList);
