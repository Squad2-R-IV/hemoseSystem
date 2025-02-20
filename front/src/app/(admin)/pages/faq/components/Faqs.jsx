import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'react-bootstrap';
import { faqData } from '../data';

const GeneralFaq = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle as={'h4'} className="mb-3 anchor" id="general">
          Perguntas Frequentes - Geral
        </CardTitle>
        <Accordion id="accordionExample" defaultActiveKey={'0'}>
          {faqData.General.map((item, idx) => (
            <AccordionItem eventKey={`${idx}`} key={idx}>
              <AccordionHeader as={'h2'}>{item.question}</AccordionHeader>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <AccordionBody>{item.answer}</AccordionBody>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  );
};

const IntegrationFaq = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle as={'h4'} className="mb-3 anchor" id="integration">
          Integração
        </CardTitle>
        <Accordion id="accordionExample2" defaultActiveKey={'0'}>
          {faqData.Integration.map((item, idx) => (
            <AccordionItem eventKey={`${idx}`} key={idx}>
              <AccordionHeader as={'h2'}>{item.question}</AccordionHeader>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <AccordionBody>{item.answer}</AccordionBody>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  );
};

const PaymentFaq = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle as={'h4'} className="mb-3 anchor" id="payment">
          Pagamento
        </CardTitle>
        <Accordion id="accordionExample3" defaultActiveKey={'0'}>
          {faqData.Payments.map((item, idx) => (
            <AccordionItem eventKey={`${idx}`} key={idx}>
              <AccordionHeader as={'h2'}>{item.question}</AccordionHeader>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <AccordionBody>{item.answer}</AccordionBody>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  );
};

const ShippingFaq = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle as={'h4'} className="mb-3 anchor" id="shipping">
          Envio
        </CardTitle>
        <Accordion id="accordionExample4" defaultActiveKey={'0'}>
          {faqData.Shipping.map((item, idx) => (
            <AccordionItem eventKey={`${idx}`} key={idx}>
              <AccordionHeader as={'h2'}>{item.question}</AccordionHeader>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <AccordionBody>{item.answer}</AccordionBody>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  );
};

const ReturnFaq = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle as={'h4'} className="mb-3 anchor" id="return">
          Devolução
        </CardTitle>
        <Accordion id="accordionExample5" defaultActiveKey={'0'}>
          {faqData.Return.map((item, idx) => (
            <AccordionItem eventKey={`${idx}`} key={idx}>
              <AccordionHeader as={'h2'}>{item.question}</AccordionHeader>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <AccordionBody>{item.answer}</AccordionBody>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  );
};

const Faqs = () => {
  return (
    <>
      <Row>
        <Col xl={3}>
          <div className="bg-body-secondary shadow rounded docs-nav">
            <ul className="nav bg-transparent flex-column fs-15 ps-2">
              <li className="nav-item">
                <Link to="#general" className="nav-link">
                  Geral
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#integration" className="nav-link">
                  Integração
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#payment" className="nav-link">
                  Pagamento
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#shipping" className="nav-link">
                  Envio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#return" className="nav-link">
                  Devolução
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col xl={9}>
          <GeneralFaq />
          <IntegrationFaq />
          <PaymentFaq />
          <ShippingFaq />
          <ReturnFaq />
        </Col>
      </Row>
    </>
  );
};

export default Faqs;
