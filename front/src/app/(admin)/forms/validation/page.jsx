import React from 'react';
import AllValidation from './components/AllValidation';
import PageBreadcrumb from '@/components/PageBreadcrumb';

// 

const ValidationPage = () => {
  return <>
    <PageBreadcrumb title='Validação' />
      <AllValidation />
    </>;
};
export default ValidationPage;