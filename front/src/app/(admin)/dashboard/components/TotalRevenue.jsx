import IconifyIcon from '@/components/wrappers/IconifyIcon';
import React from 'react';
import americanImg from '@/assets/images/cards/american-express.svg';
import discoverImg from '@/assets/images/cards/discover-card.svg';
import mastercard from '@/assets/images/cards/mastercard.svg';
import ReactApexChart from 'react-apexcharts';
import {
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from 'react-bootstrap';

const TotalRevenue = () => {
  const StatisticsChartOpts = {
    series: [
      {
        name: 'Renda Total',
        data: [
          82.0, 85.0, 70.0, 90.0, 75.0, 78.0, 65.0, 50.0, 72.0, 60.0, 80.0,
          70.0,
        ],
      },
      {
        name: 'Despesas Totais',
        data: [
          30.0, 32.0, 40.0, 35.0, 30.0, 36.0, 37.0, 28.0, 34.0, 42.0, 38.0,
          30.0,
        ],
      },
    ],
    stroke: {
      width: 3,
      curve: 'straight',
    },
    chart: {
      height: 299,
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
    },
    colors: ['#10c469', '#35b8e0'],
    tooltip: {
      shared: true,
      y: [
        {
          formatter: function (y) {
            if (typeof y !== 'undefined') {
              return 'R$' + y.toFixed(2) + 'k';
            }
            return y;
          },
        },
        {
          formatter: function (y) {
            if (typeof y !== 'undefined') {
              return 'R$' + y.toFixed(2) + 'k';
            }
            return y;
          },
        },
      ],
    },
  };

  return (
    <Card>
      <div className="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
        <h4 className="header-title">Receita Total</h4>
        <Dropdown>
          <DropdownToggle
            as={'a'}
            className="drop-arrow-none card-drop"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <IconifyIcon icon="ri:more-2-fill" className="fs-18" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <DropdownItem>Relatório de Vendas</DropdownItem>
            <DropdownItem>Exportar Relatório</DropdownItem>
            <DropdownItem>Lucro</DropdownItem>
            <DropdownItem>Ação</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <CardBody className="p-0 pt-1">
        <div dir="ltr" className="px-2">
          {/* <div id="revenue-chart" className="apex-charts" data-colors="#10c469,#35b8e0" /> */}
          <ReactApexChart
            height={301}
            options={StatisticsChartOpts}
            className="apex-charts"
            series={StatisticsChartOpts.series}
            type="line"
          />
        </div>
        <div className="border-top border-dashed mt-2">
          <Row className="text-center align-items-center g-0">
            <Col md={4} xs={12}>
              <p className="text-muted mb-0">Pagamentos</p>
              <img src={americanImg} alt="cartão usuário" height={36} />
              <img src={discoverImg} alt="cartão usuário" height={36} />
              <img src={mastercard} alt="cartão usuário" height={36} />
            </Col>
            <Col
              md={4}
              xs={6}
              className="border-start border-end border-dashed"
            >
              <p className="text-muted mt-3 mb-1">Despesas</p>
              <h4 className="mb-3">
                <span className="text-danger me-1">
                  <IconifyIcon icon="ri:arrow-left-up-box-line" />{' '}
                </span>
                <span>R$15.07k</span>
              </h4>
            </Col>
            <Col md={4} className="col">
              <p className="text-muted mt-3 mb-1">Receita</p>
              <h4 className="mb-3">
                <span className="text-success me-1">
                  <IconifyIcon icon="ri:arrow-left-down-box-line" />{' '}
                </span>
                <span>R$45.5k</span>
              </h4>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default TotalRevenue;
