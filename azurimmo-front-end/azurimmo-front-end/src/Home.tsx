import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaArrowRight } from 'react-icons/fa';
import PageHeader from './PageHeader';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <PageHeader />

      <div className="home-container">
        <div className="home-card">
          <div className="home-icon-wrapper">
            <FaBuilding className="home-icon" />
          </div>
          <h2 className="home-title">Bienvenue sur AzurImmo</h2>
          <p className="home-subtitle">
            Gérez et consultez l'ensemble de votre parc immobilier en toute simplicité.
          </p>
          <button className="home-cta" onClick={() => navigate('/appartements')}>
            Voir les appartements <FaArrowRight className="cta-arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;