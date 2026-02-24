# Neemba CVA Automation & Monitoring

Une solution centralisée pour la gestion et le suivi des **Customer Value Agreements (CVA)** pour Neemba Caterpillar.

![CVA Dashboard Monitoring](https://img.shields.io/badge/Status-Live_Demo-FFCD00?style=for-the-badge&logo=caterpillar&logoColor=black)

## 🎯 Objectifs du Projet
Ce projet automatise le suivi des KPIs critiques pour la performance du service après-vente :
- **CVA Fulfillment** : Mesure de la conformité des contrats basée sur le SOS, les inspections et la connectivité.
- **PM Accuracy** : Suivi précis de la ponctualité des maintenances préventives.
- **CVA 1 vs CVA 2** : Distinction claire entre la main-d'œuvre client (DIM) et concessionnaire (DIFM).
- **Proactivité** : Alertes automatiques pour les renouvellements et les chutes de score de fulfillment.

## 🚀 Présentation & Démo
Le dashboard interactif est disponible en version statique (données mockées) pour démonstration :
👉 **[Accéder au Dashboard Live](https://tafa1618.github.io/CVA_Automation/)**

## 🛠️ Architecture Technique

### Frontend (Next.js 15)
- **UI/UX** : Charte graphique Neemba (Jaune #FFCD00 / Noir #000000).
- **Composants** : Dashboard interactif avec graphiques (Chart.js) et cartographie (Leaflet/VisionLink).
- **Déploiement** : Export statique via GitHub Actions sur GitHub Pages.

### Backend (FastAPI & PostgreSQL)
- **API** : Endpoints de santé, gestion des utilisateurs et ingestion de données.
- **Ingestion** : Logique de traitement Excel complexe pour extraire les données de `CVAF_DATA.xlsx` et `cva metrics.xlsx`.
- **Database** : PostgreSQL avec migration via Alembic.
- **Docker** : Architecture micro-services via `docker-compose`.

## 📦 Installation Locale

### Prérequis
- Docker Desktop
- Node.js 20+ (pour le frontend)
- Python 3.10+ (pour le backend)

### Lancer avec Docker
```bash
docker-compose up --build
```
Le backend sera disponible sur `http://localhost:8000` et le frontend sur `http://localhost:3000`.

## 📁 Structure du Projet
```text
.
├── backend/            # API FastAPI & Logique d'ingestion
├── frontend/           # Interface Next.js (Tailwind CSS)
├── Data/               # Fichiers sources (Excel CVAF, Metrics)
├── .github/workflows/  # CI/CD (GitHub Pages)
└── docker-compose.yml  # Orchestration des services
```

---
© 2026 **Neemba Caterpillar Support Bureau** • Centralizing CVA Performance
