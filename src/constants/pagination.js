import React from 'react';
export const sizePerPageList = [
    { text: '5', value: 5 },
    { text: '10', value: 10 },
    { text: '25', value: 25 },
  ];

  export const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Mostrando { from } a { to } de { size } resultados
    </span>
  );
  
  export const options = {
    pageStartIndex: 1,
    firstPageText: 'Primera',
    prePageText: 'Atras',
    nextPageText: 'Siguiente',
    lastPageText: 'Ultima',
    nextPageTitle: 'Primeros',
    prePageTitle: 'Atras',
    firstPageTitle: 'Siguiente pagina',
    lastPageTitle: 'Ultima pagina',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    totalSize: 0,
    sizePerPageList,
    sizePerPage: sizePerPageList[0].value,
    page: 1
  };