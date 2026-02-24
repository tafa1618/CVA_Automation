"use client";

import React from 'react';
import { fulfillmentByPillar } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import {
    ShieldCheck,
    Zap,
    Droplets,
    ClipboardCheck,
    TrendingUp,
    Users,
    ChevronRight,
    Search
} from 'lucide-react';

export const FulfillmentDetails = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Legend / Filter Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-3xl">
                <div>
                    <h3 className="text-xl font-black text-white">Comparatif CVA 1 vs CVA 2</h3>
                    <p className="text-xs text-gray-400 mt-1">Analyse de la performance par type de contrat et pilier technique.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                        <div className="w-3 h-3 rounded-full bg-gray-500" />
                        <span className="text-[10px] text-white font-bold uppercase">CVA 1 (Client)</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-neemba-yellow rounded-xl border border-neemba-yellow/20">
                        <div className="w-3 h-3 rounded-full bg-black" />
                        <span className="text-[10px] text-black font-black uppercase">CVA 2 (Dealer)</span>
                    </div>
                </div>
            </div>

            {/* Performance Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {fulfillmentByPillar.map((p, i) => (
                    <div key={i} className="bg-card border border-border rounded-2xl p-8 group hover:border-neemba-yellow/30 transition-all">
                        <div className="flex justify-between items-center mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-neemba-yellow group-hover:scale-110 transition-transform">
                                {p.pillar === 'SOS' ? <Zap size={24} /> : p.pillar === 'Inspection' ? <ShieldCheck size={24} /> : <Zap size={24} />}
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{p.pillar}</p>
                                <p className="text-sm font-black text-white mt-1">Global: {((p.score_cva1 + p.score_cva2) / 2).toFixed(1)}%</p>
                            </div>
                        </div>

                        {/* Comparison Bars */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                                    <span>CVA 1</span>
                                    <span>{p.score_cva1}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gray-500 rounded-full transition-all duration-1000 delay-300" style={{ width: `${p.score_cva1}%` }} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold text-neemba-yellow uppercase">
                                    <span>CVA 2</span>
                                    <span>{p.score_cva2}%</span>
                                </div>
                                <div className="h-2 bg-neemba-yellow/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-neemba-yellow rounded-full shadow-[0_0_15px_rgba(255,205,0,0.3)] transition-all duration-1000 delay-500" style={{ width: `${p.score_cva2}%` }} />
                                </div>
                            </div>
                        </div>

                        <p className="mt-8 text-[10px] text-gray-600 font-bold uppercase leading-relaxed">
                            Écart de performance de <span className="text-neemba-yellow">{p.score_cva2 - p.score_cva1}%</span> en faveur de la maintenance concessionnaire.
                        </p>
                    </div>
                ))}
            </div>

            {/* Insight Card */}
            <div className="bg-neemba-yellow rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <Users className="text-black" size={32} />
                        <h4 className="text-3xl font-black text-black tracking-tighter uppercase">Analyse de Valeur</h4>
                    </div>
                    <p className="text-black/80 font-medium leading-relaxed max-w-2xl">
                        Les contrats **CVA 2 (DIFM)** affichent une conformité moyenne supérieure de **22%** sur les inspections conditionnelles. L'automatisation des rapports SOS permet d'anticiper les pannes sur **94%** du parc sous gestion Dealer.
                    </p>
                    <div className="flex gap-6 mt-8">
                        <button className="bg-black text-neemba-yellow px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20">
                            VOIR LES RECOMMANDATIONS
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    <div className="bg-black/5 p-6 rounded-2xl border border-black/10">
                        <p className="text-[10px] font-black uppercase opacity-60 text-black">Uptime Moyen</p>
                        <p className="text-3xl font-black text-black">98.5%</p>
                    </div>
                    <div className="bg-black/5 p-6 rounded-2xl border border-black/10">
                        <p className="text-[10px] font-black uppercase opacity-60 text-black">Renouvellements</p>
                        <p className="text-3xl font-black text-black">88%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
