import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageHeader from './PageHeader';
import './ListAppartement.css';

interface Appartement {
  id: number;
  surface: number;
  nbPiece: number;
  description: string;
  numero: string;
}

const ListAppartement: React.FC = () => {
  const [appartements, setAppartements] = useState<Appartement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppartements = async () => {
      try {
        const response = await axios.get<Appartement[]>('http://localhost:9008/api/appartements/');
        setAppartements(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération :', err);
        setError('Impossible de charger les données du backend.');
        setLoading(false);
      }
    };

    fetchAppartements();
  }, []);

  if (loading) return (
    <div className="container" style={{ backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <PageHeader />
      <div className="text-center p-10" style={{ textAlign: 'center', padding: '4rem' }}>Chargement en cours...</div>
    </div>
  );

  if (error) return (
    <div className="container" style={{ backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <PageHeader />
      <div style={{ color: '#e74c3c', textAlign: 'center', padding: '4rem' }}>{error}</div>
    </div>
  );

  return (
    <div className="container" style={{ backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <PageHeader />
      <div className="apt-grid">
        {appartements.length > 0 ? (
          appartements.map((app) => (
            <div key={app.id} className="apt-card">
              <div className="apt-card-header">
                <h2 className="apt-badge">Appartement n°{app.numero}</h2>
              </div>
              <div className="apt-card-body">
                <hr className="my-3" />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', color: '#666' }}>
                  <span><strong>{app.surface} m²</strong></span>
                  <span><strong>{app.nbPiece} pièces</strong></span>
                </div>
                <button
                  className="btn-details"
                  onClick={() => navigate(`/appartements/${app.id}`)}
                  style={{
                    marginTop: '20px',
                    width: '100%',
                    backgroundColor: '#2ecc71',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Voir les détails
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Aucun appartement trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default ListAppartement;