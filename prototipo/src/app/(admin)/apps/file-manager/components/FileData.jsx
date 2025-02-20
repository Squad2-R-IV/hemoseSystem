import avatar1 from '@/assets/images/users/avatar-1.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllFiles } from '@/helpers/data';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap';

const FileData = async () => {
  const recentData = await getAllFiles();
  return (
    <tbody>
      {recentData.map((item, idx) => (
        <tr key={idx}>
          <td className="ps-3">
            <div className="d-flex align-items-center gap-2">
              <div
                className={`flex-shrink-0 avatar-md bg-${item.fileVariant}-subtle d-inline-flex align-items-center justify-content-center rounded-2`}
              >
                <IconifyIcon icon="ri:file-line" className="fs-22 text-info" />
              </div>
              <div>
                <span className="fw-medium">
                  <a href="" className="text-reset">
                    {item.title}
                  </a>
                </span>
                <p className="mb-0 fs-12">{item.file}</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center gap-2">
              <div>
                <a href="">
                  <img
                    src={avatar1}
                    className="rounded-circle avatar-md"
                    alt="amigo"
                  />
                </a>
              </div>
              <div>
                <p className="mb-0 fw-medium">{item.user?.name}</p>
                <span className="fs-12">{item.user?.email}</span>
              </div>
            </div>
          </td>
          <td>{item.size} MB</td>
          <td>
            {item.date.toLocaleString('pt-br', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })}
          </td>
          <td>
            <div className="avatar-group flex-nowrap">
              <div className="avatar avatar-sm">
                <span className="avatar-title bg-success rounded-circle fw-bold">
                  D
                </span>
              </div>
              <div className="avatar avatar-sm">
                <span className="avatar-title bg-primary rounded-circle fw-bold">
                  K
                </span>
              </div>
              <div className="avatar avatar-sm">
                <span className="avatar-title bg-secondary rounded-circle fw-bold">
                  H
                </span>
              </div>
              <div className="avatar avatar-sm">
                <span className="avatar-title bg-warning rounded-circle fw-bold">
                  L
                </span>
              </div>
              <div className="avatar avatar-sm">
                <span className="avatar-title bg-info rounded-circle fw-bold">
                  G
                </span>
              </div>
            </div>
          </td>
          <td>
            <Dropdown className="dropdown flex-shrink-0 text-muted">
              <DropdownToggle
                as={'a'}
                className="drop-arrow-none fs-20 link-reset"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <IconifyIcon icon="ri:more-2-fill" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>
                  <IconifyIcon icon="ri:share-line" className="me-1" />{' '}
                  Compartilhar
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon icon="ri:link" className="me-1" /> Obter Link
                  Compartilhável
                </DropdownItem>
                <DropdownItem href={avatar1} download>
                  <IconifyIcon icon="ri:download-line" className="me-1" />
                  Baixar
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon icon="ri:pushpin-2-line" className=" me-1" />{' '}
                  Fixar
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon icon="ri:edit-box-line" className="me-1" />{' '}
                  Editar
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon icon="ri:delete-bin-line" className="me-1" />{' '}
                  Excluir
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default FileData;
