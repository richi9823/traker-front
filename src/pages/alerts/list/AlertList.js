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
import s from './AlertList.module.scss';
import Widget from '../../../components/Widget/Widget';
import { getAllAlerts, removeAlert } from '../../../actions/alert';
import { options } from '../../../constants/pagination';
import { columnFormatter } from './columnFormatter';
import DeleteModal from '../../../components/Modals/DeleteModal';
import { closeDeleteModal, openDeleteModal } from '../../../actions/navigation';

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

class AlertList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    AlertList: PropTypes.array, // eslint-disable-line
    isFetching: PropTypes.bool,
    deleteModalOpened: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isFetching: false,
    AlertList: {items:[], total:0},
    deleteModalOpened: false,
  };

  static meta = {
    title: 'Lista de alertas',
    description: 'Aqui puede gestionar sus alertas',
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
      this.props.dispatch(getAllAlerts(null, 1, 5, null)).then(() => {
        const {alertList} = this.props;
        this.setState((prev) => (
          {
            paginationOptions:{
            ...prev.paginationOptions,
            totalSize: alertList.total
          }
          }));
      });
  }

  componentDidUpdate(prevProps, { queryParams: prevQueryParams }) {
    const {
      queryParams, paginationOptions
    } = this.state;
    if (!isEqual(prevQueryParams, queryParams)) {
      this.props.dispatch(getAllAlerts(null, paginationOptions.page, paginationOptions.sizePerPage, null)).then((response) => {
        const {alertList} = this.props;
        this.setState((prev) => (
          {
            paginationOptions:{
            ...prev.paginationOptions,
            totalSize: alertList.total
          }
          }));
      });
    }
  }

  handleAction = (type, data) =>{
    switch(type){
      case 'delete':{
        this.props.dispatch(openDeleteModal())
        this.setState({deleteItem:data})
        break;
      }
      case 'view':{
        const { history } = this.props;
        history.push("/app/alerts/" + data.id);
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
    this.props.dispatch(removeAlert(deleteItem.id)).then(()=>{
      this.props.dispatch(getAllAlerts(null, paginationOptions.page, paginationOptions.sizePerPage, null)).then((response) => {
        this.setState((prev) => (
          {
            paginationOptions:{
            ...prev.paginationOptions,
            totalSize: response.total
          }
          }));
          this.props.dispatch(closeDeleteModal())
      })
    })
  }

  render() {
    const { deleteModalOpened } = this.props;
    const { items: alerts} = this.props.alertList
    const { paginationOptions, deleteItem } = this.state;
    return (
      <div className={s.root}>
        {deleteModalOpened ? <DeleteModal isFetching={this.props.isFetching} onAccept={() => this.doRemove()} text={deleteItem.model}/> : null}
        <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Alertas</BreadcrumbItem>
        </Breadcrumb>
        <h1>Alertas</h1>
        <Widget
          className="pb-0"
          title={
            <div>
              <div className="pull-right mt-n-xs">
              </div>
              <h5 className="mt-0">
                 <span className="fw-semi-bold">Alertas</span>
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
                          data={!this.props.vehicles?.items ? [] : this.props.vehicles?.items}
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
                                  data={!this.props.alerts?.items ? [] : this.props.alerts?.items}
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
    isFetching: state.alert.isFetching,
    alertList: state.alert.alertList,
    deleteModalOpened: state.navigation.deleteModalOpened,
  };
}

export default connect(mapStateToProps)(AlertList);
