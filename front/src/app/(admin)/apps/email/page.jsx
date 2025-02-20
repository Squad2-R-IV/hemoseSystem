import EmailArea from './components/EmailArea';
import PageBreadcrumb from '@/components/PageBreadcrumb';
const EmailPage = () => {
  return <>
    <PageBreadcrumb title='Email' />
    <div className="d-flex gap-2">
      <EmailArea />
    </div>
    </>;
};
export default EmailPage;