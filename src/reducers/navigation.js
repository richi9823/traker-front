import { TOGGLE_SIDEBAR, OPEN_SIDEBAR, CLOSE_SIDEBAR, OPEN_DELETE_MODAL, CLOSE_DELETE_MODAL } from '../constants';

const initialState = {
  sidebarOpened: false,
  sidebarStatic: false,
  deleteModalOpened:false
};

export default function runtime(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpened: !state.sidebarOpened,
      };
    case OPEN_SIDEBAR:
      return {
        ...state,
        sidebarOpened: true,
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        sidebarOpened: false,
      };
      case CLOSE_DELETE_MODAL:
        return {
          ...state,
          deleteModalOpened: false,
      };
      case OPEN_DELETE_MODAL:
        return {
          ...state,
          deleteModalOpened: true,
        };
    default:
      return state;
  }
}
