import { Row } from 'react-bootstrap';
import CalendarPage from './components/CalendarPage';
import PageBreadcrumb from '@/components/PageBreadcrumb';
const Schedule = () => {
  return <>
    <PageBreadcrumb title='Calendário' />
      <Row>
        <CalendarPage />
      </Row>
    </>;
};
export default Schedule;