import React from 'react';
import logoDark from '@/assets/images/logo-dark.png';
import logo from '@/assets/images/logo.png';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, Col, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Link } from 'react-router-dom';
import { currentYear } from '@/context/constants';

const Error401Page = () => {
  return (
    <>
      <PageBreadcrumb title="Erro 401" />
      <div className="auth-bg d-flex min-vh-100">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xxl={3} lg={5} md={6}>
            <Link
              to="/"
              className="auth-brand d-flex justify-content-center mb-2"
            >
              <img
                src={logoDark}
                alt="logo escuro"
                height={26}
                className="logo-dark"
              />
              <img
                src={logo}
                alt="logo claro"
                height={26}
                className="logo-light"
              />
            </Link>
            <p className="fw-semibold mb-4 text-center text-muted fs-15">
              Painel de Administração da Fundação de Saúde Parreiras Horta
            </p>
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
              <div className="text-center">
                <h1 className="text-error">401</h1>
                <h3 className="mt-3 mb-2">Erro Não Autorizado!</h3>
                <p className="text-muted mb-3">
                  Desculpe, mas você não tem autorização para visualizar esta
                  página.
                </p>
                <Link to="/" className="btn btn-danger">
                  <IconifyIcon icon="tabler:home" className="fs-16 me-1" />{' '}
                  Voltar para a Página Inicial
                </Link>
              </div>
            </Card>
            <p className="mt-4 text-center mb-0">
              {currentYear} © Fundação de Saúde Parreiras Horta
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Error401Page;
