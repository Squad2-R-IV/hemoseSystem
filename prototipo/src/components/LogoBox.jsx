import React from 'react';
import logoSm from '@/assets/images/logo-sm.png';
import logo from '@/assets/images/logo.png';
import logoDark from '@/assets/images/logo-dark.png';
import { Link } from 'react-router-dom';
const LogoBox = () => {
  return <Link to="/" className="logo">
      <span className="logo-light">
        <span className="logo-lg"><img style={{width: '8rem', height: '3.5rem'}} src={logo} alt="logo" /></span>
        <span className="logo-sm"><img width={28} height={28} src={logoSm} alt="small logo" /></span>
      </span>
      <span className="logo-dark">
        <span className="logo-lg"><img style={{width: '8rem', height: '3.5rem'}} src={logoDark} alt="dark logo" /></span>
        <span className="logo-sm"><img width={28} height={28} src={logoSm} alt="small logo" /></span>
      </span>
    </Link>;
};
export default LogoBox;