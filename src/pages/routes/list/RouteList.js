import React from 'react';
import PropTypes from 'prop-types';
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
import s from './RouteList.module.scss';
import Widget from '../../../components/Widget/Widget';
import { options } from '../../../constants/pagination';
import { columnFormatter } from './columnFormatter';
import DeleteModal from '../../../components/Modals/DeleteModal';
import moment from 'moment';
import { deleteRoute, getAllRoute } from '../../../actions/route';
import { closeDeleteModal, openDeleteModal } from '../../../actions/navigation';

const columns = ({ handleAction }) => [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
  },
  {
    dataField: 'init',
    text: 'Inicio',
    sort: true,
    formatter: (init) => moment(init).format('DD/MM/YYYY HH:mm')
  },
  {
    dataField: 'finish',
    text: 'Fin',
    sort: true,
    formatter: (finish) => finish != null ? moment(finish).format('DD/MM/YYYY HH:mm') : "-"
  },
  {
    dataField: 'total_distance',
    text: 'Distancia total',
    sort: true,
    formatter: (distance) => distance != null ? (distance/1000).toFixed(2) + "Km" : "-"
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

class RouteList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    errorMessage: PropTypes.string.isRequired,
    routeList: PropTypes.object.isRequired,
    deleteModalOpened: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isFetching: false,
    errorMessage: null,
    routeList:{items:[], total:0},
    deleteModalOpened: false,
  };

  static meta = {
    title: 'Lista de rutas',
    description: 'Aqui puede ver las rutas de su vehiculo',
  };

  constructor(props) {
    super(props);

    this.state = {
      selectItem:null,
      queryParams: {
      },
      paginationOptions: options,
    };
    this.columns = columns({  handleAction: this.handleAction });
  }

  componentDidMount() {
      this.props.dispatch(getAllRoute(this.props.match.params.id, 1,5, null, null)).then(() => {
        const { routeList} = this.props
        this.setState((prev) => (
          {
            paginationOptions:{
            ...prev.paginationOptions,
            totalSize: routeList.total
          }
          }));
      });
  }

  componentDidUpdate(prevProps, { queryParams: prevQueryParams }) {
    const {
      queryParams, paginationOptions
    } = this.state;
    if (!isEqual(prevQueryParams, queryParams)) {
      this.props.dispatch(getAllRoute(this.props.match.params.id, paginationOptions.page, paginationOptions.sizePerPage, null, null )).then((response) => {
        const { routeList} = this.props
        this.setState((prev) => (
          {
            paginationOptions:{
            ...prev.paginationOptions,
            totalSize: routeList.total
          }
          }));
      });
    }
  }

  handleAction = (type, data) =>{
    const{id} = this.props.match.params
    switch(type){
      case 'delete':{
        this.props.dispatch(openDeleteModal())
        this.setState({deleteItem:data})
        break;
      }
      case 'view':{
        const { history } = this.props;
        history.push("/app/vehicles/" + id +"/routes/"+data.id);
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
    this.props.dispatch(deleteRoute(deleteItem.id)).then(()=>{
      this.props.dispatch(getAllRoute(this.props.match.params.id, paginationOptions.page, paginationOptions.sizePerPage, null, null)).then((response) => {
        const {routeList} = this.props;
        this.setState((prev) => (
          {
            paginationOptions:{
            ...prev.paginationOptions,
            totalSize: routeList.total
          }
          }));
          this.props.dispatch(closeDeleteModal())
      })
    })
  }

  render() {
    const {deleteModalOpened} = this.props;
    const { items: routes  } = this.props.routeList;
    const { paginationOptions, deleteItem } = this.state;
    return (
      <div className={s.root}>
        {deleteModalOpened ? <DeleteModal isFetching={this.props.isFetching} onAccept={() => this.doRemove()} text={deleteItem?.model}/> : null}
        <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem>Vehiculos</BreadcrumbItem>
          <BreadcrumbItem>{this.props.match.params.id}</BreadcrumbItem>
          <BreadcrumbItem active>Rutas</BreadcrumbItem>
        </Breadcrumb>
        <h1>Rutas</h1>
        <Widget
          className="pb-0"
          title={
            <div>
              <div className="pull-right mt-n-xs">
              </div>
              <h5 className="mt-0">
                 <span className="fw-semi-bold">Rutas</span>
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
                          data={!routes ? [] : routes}
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
                                  data={!routes ? [] : routes}
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
    isFetching: state.route.isFetching,
    errorMessage: state.route.errorMessage,
    routeList: state.route.routeList,
    deleteModalOpened: state.navigation.deleteModalOpened,
  };
}

export default connect(mapStateToProps)(RouteList);
