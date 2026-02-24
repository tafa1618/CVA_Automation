"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import {
    BarChart3,
    Settings2,
    Users,
    ShieldCheck,
    Search,
    Bell,
    Calendar,
    Filter,
    Clock,
    Expand
} from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { KPICard } from '@/components/dashboard/KPICard';
import { CVATable } from '@/components/dashboard/CVATable';
import { Quotation } from '@/components/dashboard/Quotation';
import { PMAccuracy } from '@/components/dashboard/PMAccuracy';
import { FulfillmentDetails } from '@/components/dashboard/FulfillmentDetails';
import { ServiceCommitment } from '@/components/dashboard/ServiceCommitment';
import { kpiStats } from '@/lib/mockData';
import { cn } from '@/lib/utils';

// Dynamic import for Map to avoid SSR issues
const CVAMap = dynamic(() => import('@/components/dashboard/CVAMap'), {
    ssr: false,
    loading: () => <div className="w-full h-[400px] bg-black/20 animate-pulse rounded-2xl border border-border" />
});

export default function Dashboard() {
    const [activeTab, setActiveTab] = React.useState('dashboard');

    return (
        <div className="flex bg-black min-h-screen">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight">
                            {activeTab === 'dashboard' ? 'CVA Monitoring' :
                                activeTab === 'map' ? 'Machine Strategy Map' :
                                    activeTab === 'fulfillment' ? 'CVA Fulfillment Details' :
                                        activeTab === 'accuracy' ? 'Maintenance Accuracy' :
                                            activeTab === 'commitment' ? 'Service Fleet Health' :
                                                'CVA Pricing Tool'}
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            {activeTab === 'dashboard' ? 'Plateforme de gestion centralisée des contrats de valeur client.' :
                                activeTab === 'map' ? 'Visualisation temps réel de la localisation et santé du parc.' :
                                    activeTab === 'fulfillment' ? 'Analyse comparative SOS, Inspection et Connectivité.' :
                                        activeTab === 'accuracy' ? 'Suivi de la conformité des intervalles de maintenance.' :
                                            activeTab === 'commitment' ? 'Engagement de service et support client prospectif.' :
                                                'Automatisation du chiffrage technique et commercial.'}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-neemba-yellow transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Rechercher machine ou client..."
                                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-neemba-yellow/50 w-64 transition-all"
                            />
                        </div>
                        <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all relative">
                            <Bell size={20} />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-neemba-yellow rounded-full border-2 border-black" />
                        </button>
                        <div className="h-10 w-[1px] bg-white/10 mx-2" />
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-neemba-yellow hover:bg-neemba-yellow/90 text-black font-bold rounded-xl transition-all shadow-lg shadow-neemba-yellow/20 active:scale-95">
                            <Calendar size={18} />
                            <span className="text-xs">Programmer Intervention</span>
                        </button>
                    </div>
                </header>

                {activeTab === 'dashboard' ? (
                    <>
                        {/* KPI Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            <KPICard
                                label="CVA Fulfillment"
                                value={kpiStats.fulfillment_avg}
                                suffix="%"
                                trend={12}
                                icon={ShieldCheck}
                                onClick={() => setActiveTab('fulfillment')}
                                description="Moyenne globale basée sur le SOS, l'Inspection et la Connectivité."
                            />
                            <KPICard
                                label="PM Accuracy"
                                value={kpiStats.pm_accuracy}
                                suffix="%"
                                trend={5}
                                icon={Settings2}
                                onClick={() => setActiveTab('accuracy')}
                                description="Conformité des opérations de maintenance préventive."
                            />
                            <KPICard
                                label="Active Contracts"
                                value={kpiStats.active_contracts}
                                icon={Users}
                                onClick={() => setActiveTab('commitment')}
                                description="Nombre total de contrats CVA enregistrés sur le périmètre."
                            />
                            <KPICard
                                label="Inspection Rate"
                                value={kpiStats.inspection_rate}
                                suffix="%"
                                trend={-2}
                                icon={BarChart3}
                                description="Taux de couverture des inspections conditionnelles."
                            />
                        </div>

                        {/* Map & Secondary Tools */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                            <div className="lg:col-span-2">
                                <div className="flex justify-between items-end mb-4 px-2">
                                    <div>
                                        <h3 className="font-bold text-white">Répartition Géographique</h3>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Données VisionLink temps réel</p>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('map')}
                                        className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-neemba-yellow transition-colors"
                                    >
                                        <Expand size={14} /> Voir en plein écran
                                    </button>
                                </div>
                                <CVAMap />
                            </div>

                            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col">
                                <h3 className="font-bold text-white mb-6">Alertes & Renouvellements</h3>
                                <div className="space-y-4 flex-1">
                                    {[
                                        { client: "MWP Mining", date: "Dans 12 jours", type: "Fulfillment Faible", color: "text-red-400" },
                                        { client: "BTP Global", date: "Dans 25 jours", type: "Renouvellement", color: "text-neemba-yellow" },
                                        { client: "Senegal Gold", date: "Dans 30 jours", type: "Connectivité Perdue", color: "text-orange-400" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10 group">
                                            <div className={cn("w-1 h-12 rounded-full", i === 0 ? "bg-red-400" : i === 1 ? "bg-neemba-yellow" : "bg-orange-400")} />
                                            <div>
                                                <p className="text-xs font-bold text-white group-hover:text-neemba-yellow transition-colors">{item.client}</p>
                                                <p className={cn("text-[10px] font-bold uppercase", item.color)}>{item.type}</p>
                                                <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                                                    <Clock size={10} /> {item.date}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full py-3 mt-6 bg-white/5 hover:bg-white/10 text-xs font-bold text-white rounded-xl border border-white/10 transition-all uppercase tracking-widest">
                                    Voir toutes les alertes
                                </button>
                            </div>
                        </div>

                        {/* Data Table */}
                        <CVATable />
                    </>
                ) : activeTab === 'map' ? (
                    <div className="h-[calc(100vh-180px)]">
                        <CVAMap />
                    </div>
                ) : activeTab === 'fulfillment' ? (
                    <FulfillmentDetails />
                ) : activeTab === 'accuracy' ? (
                    <PMAccuracy />
                ) : activeTab === 'commitment' ? (
                    <ServiceCommitment />
                ) : activeTab === 'quotation' ? (
                    <Quotation />
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/10 rounded-3xl">
                        <p className="text-gray-500 font-bold uppercase tracking-widest">Contenu en cours de développement</p>
                    </div>
                )}

                {/* Footer */}
                <footer className="mt-12 text-center">
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
                        © 2026 Neemba Caterpillar Support Bureau • CVA Automation v1.0
                    </p>
                </footer>
            </main>
        </div>
    );
}
