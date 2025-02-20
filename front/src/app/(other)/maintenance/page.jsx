import PageBreadcrumb from '@/components/PageBreadcrumb';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';

const MaintenancePage = () => {
  return (
    <>
      <PageBreadcrumb title="Manutenção" />
      <div className="auth-bg d-flex min-vh-100 justify-content-center">
        <div className="mt-5 mb-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width={122}
                    height={122}
                    viewBox="0 0 122 122"
                  >
                    <defs>
                      <path
                        id="gear"
                        d="M72,52.4v-8.8l-5.4-0.9c-0.4-1.5-1-2.9-1.7-4.1l3.2-4.4l-6.2-6.3L57.4,31c-1.3-0.7-2.7-1.3-4.1-1.7L52.4,24h-8.8l-0.9,5.4  c-1.5,0.4-2.8,1-4.1,1.7L34.2,28l-6.3,6.2l3.2,4.4c-0.7,1.3-1.3,2.7-1.7,4.2L24,43.6v8.8l5.4,0.9c0.4,1.5,1,2.8,1.7,4.1l-3.2,4.5  l6.2,6.2l4.5-3.2c1.3,0.7,2.7,1.3,4.2,1.7l0.9,5.3h8.8l0.9-5.4c1.4-0.4,2.8-1,4.1-1.7l4.5,3.2l6.2-6.2l-3.2-4.5  c0.7-1.3,1.3-2.6,1.7-4.1L72,52.4z M48,57.2c-5.1,0-9.2-4.1-9.2-9.2c0-5.1,4.2-9.2,9.2-9.2s9.2,4.1,9.2,9.2S53.1,57.2,48,57.2z"
                      ></path>
                    </defs>
                    <g transform="scale(0.77)">
                      <use xlinkHref="#gear" fill="#5b69bc">
                        <animateTransform
                          attributeType="XML"
                          attributeName="transform"
                          type="rotate"
                          from="0 48 48"
                          to="360 48 48"
                          dur="12s"
                          repeatCount="indefinite"
                        ></animateTransform>
                      </use>
                    </g>
                    <g transform="scale(0.6) translate(83 13)">
                      <use xlinkHref="#gear" fill="#10c469">
                        <animateTransform
                          attributeType="XML"
                          attributeName="transform"
                          type="rotate"
                          from="360 48 48"
                          to="0 48 48"
                          dur="12s"
                          repeatCount="indefinite"
                        ></animateTransform>
                      </use>
                    </g>
                    <g transform="scale(0.435) translate(37 139)">
                      <use xlinkHref="#gear" fill="#f9c851">
                        <animateTransform
                          attributeType="XML"
                          attributeName="transform"
                          type="rotate"
                          from="360 48 48"
                          to="0 48 48"
                          dur="12s"
                          repeatCount="indefinite"
                        ></animateTransform>
                      </use>
                    </g>
                    <g transform="scale(0.935) translate(36 39)">
                      <use xlinkHref="#gear" fill="#ff8acc">
                        <animateTransform
                          attributeType="XML"
                          attributeName="transform"
                          type="rotate"
                          from="0 48 48"
                          to="360 48 48"
                          dur="12s"
                          repeatCount="indefinite"
                        ></animateTransform>
                      </use>
                    </g>
                  </svg>
                  <h3 className="mt-4 text-black">O site está em Manutenção</h3>
                  <p className="text-muted">
                    Estamos tornando o sistema ainda mais incrível. Voltaremos
                    em breve.
                  </p>
                  <Row className="mt-5">
                    <Col md={4}>
                      <Card>
                        <CardBody className="py-4">
                          <div className="avatar-xl rounded-circle bg-soft-primary mx-auto">
                            <IconifyIcon
                              width={32}
                              height={32}
                              icon="tabler:stairs-down"
                              className="fs-32 avatar-title text-primary"
                            />
                          </div>
                          <h5 className="fs-18 fw-semibold mt-3 mb-2">
                            Por que o site está fora do ar?
                          </h5>
                          <p className="text-muted mb-0">
                            Estamos enfrentando dificuldades técnicas com o
                            nosso site, incluindo o painel de administração.
                            Nossa equipe está trabalhando diligentemente para
                            resolver o problema e restaurar a funcionalidade o
                            mais rápido possível.
                            <br />
                            Obrigado!
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card>
                        <CardBody className="py-4">
                          <div className="avatar-xl rounded-circle bg-soft-primary mx-auto">
                            <IconifyIcon
                              width={32}
                              height={32}
                              icon="tabler:hourglass-empty"
                              className="fs-32 avatar-title text-primary"
                            />
                          </div>
                          <h5 className="fs-18 fw-semibold mt-3 mb-2">
                            Qual é o tempo de inatividade?
                          </h5>
                          <p className="text-muted mb-0">
                            Estamos atualmente passando por um tempo de
                            inatividade inesperado, e alguns serviços, incluindo
                            o painel de administração, podem estar
                            temporariamente indisponíveis. Nossa equipe técnica
                            está trabalhando ativamente para resolver o problema
                            e restaurar o acesso o mais rápido possível.
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card>
                        <CardBody className="py-4">
                          <div className="avatar-xl rounded-circle bg-soft-primary mx-auto">
                            <IconifyIcon
                              width={32}
                              height={32}
                              icon="tabler:headset"
                              className="fs-32 avatar-title text-primary"
                            />
                          </div>
                          <h5 className="fs-18 fw-semibold mt-3 mb-2">
                            Precisa de Suporte?
                          </h5>
                          <p className="text-muted mb-0">
                            Se você precisar de assistência ou tiver
                            preocupações urgentes, entre em contato com nossa
                            equipe de suporte pelo e-mail{' '}
                            <a href="mailto:#" className="link-info">
                              no-reply@domain.com
                            </a>{' '}
                            ou pelo telefone [+12 3456 789].
                            <br />
                            Pedimos desculpas pelo transtorno e agradecemos sua
                            compreensão. Obrigado!
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default MaintenancePage;
