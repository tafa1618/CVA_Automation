"use client";

import React from 'react';
import { pmAccuracyData, mockMachines } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import {
    Clock,
    AlertTriangle,
    CheckCircle2,
    TrendingUp,
    ChevronRight,
    History
} from 'lucide-react';

export const PMAccuracy = () => {
    const overdueMachines = mockMachines.filter(m => m.fulfillment_score < 70).slice(0, 5);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Global Accuracy</p>
                        <h4 className="text-3xl font-black text-white mt-2">82.4%</h4>
                        <p className="text-xs text-green-500 font-bold flex items-center gap-1 mt-1">
                            <TrendingUp size={12} /> +5% vs mois dernier
                        </p>
                    </div>
                    <History size={80} className="absolute -right-4 -bottom-4 text-white/[0.03] group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Interventions à l'heure</p>
                    <h4 className="text-3xl font-black text-white mt-2">124</h4>
                    <div className="w-full h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full w-[82%]" />
                    </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">En retard (Overdue)</p>
                    <h4 className="text-3xl font-black text-red-500 mt-2">28</h4>
                    <div className="w-full h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full w-[18%]" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Historical Chart Placeholder */}
                <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-8">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="font-black text-xl text-white">Tendance de Conformité</h3>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest pb-2 border-b border-neemba-yellow/30 inline-block">Historique 6 derniers mois</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-neemba-yellow" />
                                <span className="text-[10px] text-gray-400 font-bold uppercase">Conforme</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-white/10" />
                                <span className="text-[10px] text-gray-400 font-bold uppercase">En retard</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end justify-between gap-4 h-64 px-4">
                        {pmAccuracyData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                <div className="w-full flex flex-col gap-1 items-end justify-end h-full">
                                    <div
                                        className="w-full bg-white/10 rounded-t-lg transition-all duration-500 group-hover:bg-white/20"
                                        style={{ height: `${d.overdue}%` }}
                                    />
                                    <div
                                        className="w-full bg-neemba-yellow rounded-t-sm transition-all duration-500 group-hover:brightness-110"
                                        style={{ height: `${d.compliant}%` }}
                                    />
                                </div>
                                <span className="text-[10px] text-gray-500 font-bold uppercase">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Critical Machines */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <AlertTriangle className="text-red-500" size={18} />
                        <h3 className="font-black text-white uppercase tracking-tighter">Priorités Critiques</h3>
                    </div>

                    <div className="space-y-4">
                        {overdueMachines.map((m, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-transparent hover:border-red-500/30 transition-all cursor-pointer group">
                                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                                    <Clock size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-white group-hover:text-neemba-yellow transition-colors">{m.client}</p>
                                    <p className="text-[10px] text-gray-500 uppercase font-mono">{m.model} • {m.serial_number}</p>
                                </div>
                                <ChevronRight size={16} className="text-gray-700 group-hover:text-white transition-colors" />
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-4 mt-6 bg-red-500 text-white font-black rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-red-500/10 hover:brightness-110 transition-all">
                        DÉPÊCHER INTERVENTION (28)
                    </button>
                </div>
            </div>
        </div>
    );
};
