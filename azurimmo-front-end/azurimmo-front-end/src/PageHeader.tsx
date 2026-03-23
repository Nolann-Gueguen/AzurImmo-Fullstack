import React from 'react';
import './PageHeader.css';

interface PageHeaderProps {
  title?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title = 'Parc Immobilier (AzurImmo)' }) => {
  return (
    <header className="page-header">
      <div className="page-header__bg-pattern" />
      <div className="page-header__content">
        <div className="page-header__diamond-wrapper" aria-hidden="true">
          <div className="page-header__diamond" />
          <div className="page-header__diamond page-header__diamond--inner" />
        </div>
        <h1 className="page-header__title">{title}</h1>
        <div className="page-header__diamond-wrapper page-header__diamond-wrapper--left" aria-hidden="true">
          <div className="page-header__diamond page-header__diamond--reverse" />
          <div className="page-header__diamond page-header__diamond--inner page-header__diamond--reverse" />
        </div>
      </div>
    </header>
  );
};

export default PageHeader;