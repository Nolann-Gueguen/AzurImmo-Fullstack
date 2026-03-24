import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaArrowRight, FaKey, FaMapMarkerAlt, FaChartLine } from 'react-icons/fa';
import PageHeader from './PageHeader';
import './Home.css';

const STATS = [
  { icon: <FaBuilding />, value: '120+', label: 'Appartements' },
  { icon: <FaMapMarkerAlt />, value: '8', label: 'Quartiers' },
  { icon: <FaKey />, value: '95%', label: 'Taux d\'occupation' },
  { icon: <FaChartLine />, value: '12 ans', label: "D'expérience" },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`home-page ${visible ? 'home-page--visible' : ''}`}>
      <PageHeader />

      {/* ── Hero ── */}
      <section className="home-hero">
        <div className="home-hero__bg-blobs" aria-hidden="true">
          <div className="blob blob--1" />
          <div className="blob blob--2" />
          <div className="blob blob--3" />
        </div>

        <div className="home-hero__inner">
          <p className="home-hero__eyebrow">Gestion immobilière simplifiée</p>
          <h1 className="home-hero__title">
            Votre parc&nbsp;<em>immobilier</em>,<br />
            maîtrisé en un clin d'œil
          </h1>
          <p className="home-hero__sub">
            Consultez, gérez et suivez l'ensemble de vos biens depuis une interface
            claire, rapide et moderne.
          </p>
          <div className="home-hero__actions">
            <button className="btn-primary" onClick={() => navigate('/appartements')}>
              Explorer les appartements <FaArrowRight className="btn-arrow" />
            </button>
          </div>
        </div>

        {/* Floating card */}
        <div className="home-hero__card">
          <div className="home-card-chip">Dernière mise à jour</div>
          <div className="home-card-number">24</div>
          <div className="home-card-label">nouveaux biens ce mois</div>
          <div className="home-card-bar">
            <div className="home-card-bar__fill" style={{ width: '72%' }} />
          </div>
          <div className="home-card-bar-labels">
            <span>Disponibles</span>
            <span>72 %</span>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="home-stats">
        {STATS.map((s, i) => (
          <div key={i} className="home-stat" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
            <span className="home-stat__icon">{s.icon}</span>
            <span className="home-stat__value">{s.value}</span>
            <span className="home-stat__label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── Feature cards ── */}
      <section className="home-features">
        <div className="home-feature">
          <div className="home-feature__icon-wrap">
            <FaBuilding />
          </div>
          <h3>Catalogue complet</h3>
          <p>Accédez à la liste exhaustive de vos appartements avec surface, pièces et description.</p>
        </div>
        <div className="home-feature">
          <div className="home-feature__icon-wrap">
            <FaKey />
          </div>
          <h3>Fiche détaillée</h3>
          <p>Consultez chaque bien en détail : bâtiment, étage, état locatif et historique.</p>
        </div>
        <div className="home-feature">
          <div className="home-feature__icon-wrap">
            <FaChartLine />
          </div>
          <h3>Suivi en temps réel</h3>
          <p>Visualisez le taux d'occupation et les indicateurs clés de votre portefeuille.</p>
        </div>
      </section>

      <footer className="home-footer">
        © {new Date().getFullYear()} AzurImmo — Tous droits réservés
      </footer>
    </div>
  );
};

export default Home;