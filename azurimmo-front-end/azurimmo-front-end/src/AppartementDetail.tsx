import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRulerCombined, FaDoorOpen, FaHashtag, FaBuilding, FaMapMarkerAlt, FaCity, FaMailBulk, FaArrowLeft, FaFileAlt } from 'react-icons/fa';
import './AppartementDetail.css';

interface Batiment {
  id: number;
  nom: string;
  adresse: string;
  ville: string;
  codePostal: string;
}

interface Appartement {
  id: number;
  surface: number;
  nbPiece: number;
  description: string;
  numero: string;
  batiment?: Batiment;
}

const AppartementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [appartement, setAppartement] = useState<Appartement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppartement = async () => {
      try {
        const response = await axios.get<Appartement>(`http://localhost:9008/api/appartements/${id}`);
        setAppartement(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération :', err);
        setError("Impossible de charger les données de l'appartement.");
        setLoading(false);
      }
    };

    fetchAppartement();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-page">
        <header className="detail-header">
          <h1>Parc Immobilier (AzurImmo)</h1>
        </header>
        <div className="detail-loading">
          <div className="loading-spinner"></div>
          <p>Chargement en cours...</p>
        </div>
      </div>
    );
  }

  if (error || !appartement) {
    return (
      <div className="detail-page">
        <header className="detail-header">
          <h1>Parc Immobilier (AzurImmo)</h1>
        </header>
        <div className="detail-error">
          <p>{error ?? "Appartement introuvable."}</p>
          <button className="btn-back" onClick={() => navigate('/appartements')}>
            <FaArrowLeft /> Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <header className="detail-header">
        <h1>Parc Immobilier (AzurImmo)</h1>
      </header>

      <div className="detail-container">
        <button className="btn-back" onClick={() => navigate('/appartements')}>
          <FaArrowLeft /> Retour à la liste
        </button>

        <div className="detail-card">
          <div className="detail-title-block">
            <span className="detail-badge">Appartement n°{appartement.numero}</span>
            <h2 className="detail-title">Fiche détaillée</h2>
          </div>

          <div className="detail-stats">
            <div className="stat-box">
              <FaRulerCombined className="stat-icon" />
              <span className="stat-value">{appartement.surface} m²</span>
              <span className="stat-label">Surface</span>
            </div>
            <div className="stat-box">
              <FaDoorOpen className="stat-icon" />
              <span className="stat-value">{appartement.nbPiece}</span>
              <span className="stat-label">Pièces</span>
            </div>
           
          </div>

          <hr className="detail-divider" />

          {appartement.description && (
            <div className="detail-section">
              <h3 className="section-title">
                <FaFileAlt className="section-icon" /> Description
              </h3>
              <p className="detail-description">{appartement.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppartementDetail;