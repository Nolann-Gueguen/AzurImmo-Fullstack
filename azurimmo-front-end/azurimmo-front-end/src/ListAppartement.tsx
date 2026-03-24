import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaArrowRight, FaBuilding } from 'react-icons/fa';
import './ListAppartement.css';

interface Appartement {
  id: number;
  surface: number;
  nbPiece: number;
  description: string;
  numero: string;
}

type SortKey = 'numero' | 'surface' | 'nbPiece';

const ListAppartement: React.FC = () => {
  const [appartements, setAppartements] = useState<Appartement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('numero');
  const [minPieces, setMinPieces] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Appartement[]>('http://localhost:9008/api/appartements/')
      .then((r) => { setAppartements(r.data); setLoading(false); })
      .catch(() => { setError('Impossible de charger les données du backend.'); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    let list = [...appartements];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.numero.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q)
      );
    }

    if (minPieces) {
      list = list.filter((a) => a.nbPiece >= Number(minPieces));
    }

    list.sort((a, b) => {
      if (sortBy === 'numero') return a.numero.localeCompare(b.numero);
      if (sortBy === 'surface') return b.surface - a.surface;
      if (sortBy === 'nbPiece') return b.nbPiece - a.nbPiece;
      return 0;
    });

    return list;
  }, [appartements, search, sortBy, minPieces]);

  if (loading) {
    return (
      <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <div className="apt-page-header">
          <h1>Parc Immobilier — AzurImmo</h1>
        </div>
        <div className="apt-loading">
          <div className="apt-spinner" />
          <p>Chargement en cours…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <div className="apt-page-header">
          <h1>Parc Immobilier — AzurImmo</h1>
        </div>
        <div className="apt-loading" style={{ color: '#e74c3c' }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <header className="apt-page-header">
        <h1>Parc Immobilier — AzurImmo</h1>
        <p>{appartements.length} appartement{appartements.length !== 1 ? 's' : ''} disponible{appartements.length !== 1 ? 's' : ''}</p>
      </header>

      {/* ── Toolbar ── */}
      <div className="apt-toolbar">
        <div className="apt-search-wrap">
          <FaSearch className="apt-search-icon" />
          <input
            className="apt-search"
            type="text"
            placeholder="Rechercher par numéro ou description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="apt-select"
          value={minPieces}
          onChange={(e) => setMinPieces(e.target.value)}
          aria-label="Filtrer par pièces min."
        >
          <option value="">Toutes les pièces</option>
          <option value="1">≥ 1 pièce</option>
          <option value="2">≥ 2 pièces</option>
          <option value="3">≥ 3 pièces</option>
          <option value="4">≥ 4 pièces</option>
          <option value="5">≥ 5 pièces</option>
        </select>

        <select
          className="apt-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortKey)}
          aria-label="Trier par"
        >
          <option value="numero">Trier : numéro</option>
          <option value="surface">Trier : surface ↓</option>
          <option value="nbPiece">Trier : pièces ↓</option>
        </select>

        <span className="apt-count">
          <strong>{filtered.length}</strong> résultat{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Grid ── */}
      <div className="apt-grid">
        {filtered.length > 0 ? (
          filtered.map((app) => (
            <article key={app.id} className="apt-card">
              <div className="apt-card-header">
                <span className="apt-badge">N° {app.numero}</span>
                <span className="apt-card-id">ID #{app.id}</span>
              </div>

              <div className="apt-card-body">
                <div className="apt-stats-row">
                  <div className="apt-stat">
                    <span className="apt-stat-value">{app.surface}</span>
                    <span className="apt-stat-label">m²</span>
                  </div>
                  <div className="apt-stat">
                    <span className="apt-stat-value">{app.nbPiece}</span>
                    <span className="apt-stat-label">pièce{app.nbPiece !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                {app.description && (
                  <p className="apt-description">{app.description}</p>
                )}
              </div>

              <div className="apt-card-footer">
                <button
                  className="btn-details"
                  onClick={() => navigate(`/appartements/${app.id}`)}
                >
                  Voir les détails <FaArrowRight size={12} />
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="apt-empty">
            <div className="apt-empty-icon">
              <FaBuilding />
            </div>
            <p>Aucun appartement ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListAppartement;