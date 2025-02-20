import IconifyIcon from '@/components/wrappers/IconifyIcon';
import React from 'react';
import reactcoffeeCup from '@/assets/images/coffee-cup.svg';

const OffcanvasCard = ({ toggle, isTrue }) => {
  console.log(isTrue);
  return (
    // <Offcanvas show={isTrue} onHide={toggle} className=" offcanvas-xl offcanvas-start file-manager" tabIndex={-1} id="fileManagerSidebar" aria-labelledby="fileManagerSidebarLabel">
    <div className="card d-flex flex-column">
      <div className="p-3">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between gap-2 align-items-center mb-2">
            <button type="button" className="btn fw-medium btn-danger w-100">
              Criar Novo <IconifyIcon icon="ri:add-line" className=" ms-1" />
            </button>
            <button
              type="button"
              onClick={toggle}
              className="btn btn-soft-danger ms-auto d-xl-none"
              data-bs-dismiss="offcanvas"
              data-bs-target="#fileManagerSidebar"
              aria-label="Fechar"
            >
              <IconifyIcon icon="ri:close-line" />
            </button>
          </div>
          <div className="file-menu">
            <a href="#" className="list-group-item rounded active">
              <IconifyIcon
                icon="ri:folder-2-line"
                className="fs-18 align-middle me-2"
              />
              Meus Arquivos
            </a>
            <a href="#" className="list-group-item rounded">
              <IconifyIcon
                icon="ri:drive-line"
                className="fs-18 align-middle me-2"
              />
              Google Drive
            </a>
            <a href="#" className="list-group-item rounded">
              <IconifyIcon
                icon="ri:share-line"
                className="fs-18 align-middle me-2"
              />
              Compartilhar Comigo
            </a>
            <a href="#" className="list-group-item rounded">
              <IconifyIcon
                icon="ri:time-line"
                className="fs-18 align-middle me-2"
              />
              Recentes
            </a>
            <a href="#" className="list-group-item rounded">
              <IconifyIcon
                icon="ri:star-line"
                className="fs-18 align-middle me-2"
              />
              Favoritos
            </a>
            <a href="#" className="list-group-item rounded">
              <IconifyIcon
                icon="ri:delete-bin-line"
                className="fs-18 align-middle me-2"
              />
              Arquivos Excluídos
            </a>
          </div>
          <div className="mt-5 pt-5">
            <div
              className="alert alert-info p-3 pt-0 text-center mb-0"
              role="alert"
            >
              <img
                src={reactcoffeeCup}
                alt="reactcoffeeCup"
                className="img-fluid mt-n5"
                style={{
                  maxWidth: 135,
                }}
              />
              <div>
                <h5 className="alert-heading fw-medium fs-18 mt-2">
                  Obtenha mais espaço para arquivos
                </h5>
                <p>
                  Oferecemos espaço de armazenamento ilimitado para todas as
                  suas necessidades
                </p>
                <a href="#!" className="btn btn-secondary">
                  Atualizar para Pro
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    //  </Offcanvas>
  );
};

export default OffcanvasCard;
