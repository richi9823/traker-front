/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export function columnFormatter(
  cellContent,
  row,
  rowIndex,
  { viewItem, deleteItem },
) {
  return (
    <>
      <OverlayTrigger
        placement='top'
        overlay={<Tooltip>Ir</Tooltip>}
      >
        <a
          className='btn btn-outline-info btn-sm mx-1'
          onClick={() => viewItem(row)}
        >
          <span
                  className="glyphicon glyphicon-eye-open"
                />
        </a>
      </OverlayTrigger>
      <OverlayTrigger
        placement='top'
        overlay={<Tooltip>Delete</Tooltip>}
      >
        <a
          className='btn btn-outline-danger btn-sm mx-1'
          onClick={() => deleteItem(row)}
        >
          <span
                  className="glyphicon glyphicon-trash"
                />
        </a>
      </OverlayTrigger>
    </>
  );
}