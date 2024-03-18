import { TOGGLE_SIDEBAR, OPEN_SIDEBAR, CLOSE_SIDEBAR, OPEN_DELETE_MODAL, CLOSE_DELETE_MODAL } from '../constants';

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
  };
}

export function openSidebar() {
  return {
    type: OPEN_SIDEBAR,
  };
}

export function closeSidebar() {
  return {
    type: CLOSE_SIDEBAR,
  };
}

export function openDeleteModal() {
  return {
    type: OPEN_DELETE_MODAL,
  };
}

export function closeDeleteModal() {
  return {
    type: CLOSE_DELETE_MODAL,
  };
}