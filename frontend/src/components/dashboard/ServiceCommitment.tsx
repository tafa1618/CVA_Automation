"use client";

import React from 'react';
import { serviceCommitmentData } from '@/lib/mockData';
import {
    Activity,
    ShieldCheck,
    RefreshCcw,
    MessageSquare,
    Clock,
    CheckCircle2,
    BarChart3
} from 'lucide-react';

export const ServiceCommitment = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Fleet Health Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Parc Actif', value: serviceCommitmentData.active_fleet, icon: Activity, color: 'text-blue-400' },
                    { label: 'Sous Contrat', value: serviceCommitmentData.under_contract, icon: ShieldCheck, color: 'text-neemba-yellow' },
                    { label: 'Prévisions Renouvellement', value: serviceCommitmentData.renewals_predicted, icon: RefreshCcw, color: 'text-orange-400' },
                    { label: 'Temps de Réponse', value: serviceCommitmentData.average_response, icon: Clock, color: 'text-green-400' },
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border rounded-2xl p-6 group hover:border-white/20 transition-all">
                        <stat.icon className={stat.color} size={24} />
                        <h4 className="text-3xl font-black text-white mt-4">{stat.value}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contract Distribution */}
                <div className="bg-card border border-border rounded-3xl p-8">
                    <h3 className="text-xl font-black text-white mb-8">Pénétration du Service</h3>
                    <div className="relative h-64 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border-[16px] border-white/5 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-4xl font-black text-white">34%</p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase">Couverture</p>
                            </div>
                        </div>
                        {/* Fake pie slices using borders or simple divs if needed, but keeping it clean */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-48 rounded-full border-[16px] border-neemba-yellow border-t-transparent border-r-transparent border-l-transparent -rotate-45" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Machines sous CVA</p>
                            <p className="text-lg font-black text-white">{serviceCommitmentData.under_contract}</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Machines hors Contrat</p>
                            <p className="text-lg font-black text-white">{serviceCommitmentData.active_fleet - serviceCommitmentData.under_contract}</p>
                        </div>
                    </div>
                </div>

                {/* Engagement & Support */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare className="text-neemba-yellow" />
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter">Support & Satisfaction</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { task: "Rapport d'inspection envoyé", status: "Terminé", date: "Il y a 2h" },
                                { task: "Alerte SOS - Analyse d'huile", status: "En cours", date: "Il y a 5h" },
                                { task: "Planification maintenance 1000h", status: "Planifié", date: "Demain" },
                            ].map((task, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-neemba-yellow" />
                                        <div>
                                            <p className="text-sm font-bold text-white">{task.task}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase">{task.date}</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-neemba-yellow/10 text-neemba-yellow text-[10px] font-black uppercase rounded-lg">
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-neemba-yellow rounded-3xl p-8 group overflow-hidden relative">
                        <h4 className="text-2xl font-black text-black uppercase tracking-tighter relative z-10">Optimiser le Support</h4>
                        <p className="text-black/70 text-sm font-medium mt-2 relative z-10">
                            Accédez aux rapports VisionLink détaillés pour anticiper les besoins clients et augmenter le taux de renouvellement.
                        </p>
                        <button className="mt-6 px-6 py-3 bg-black text-neemba-yellow rounded-xl font-black text-[10px] uppercase tracking-widest relative z-10 hover:scale-105 active:scale-95 transition-all">
                            OUVRIR VISIONLINK
                        </button>
                        <BarChart3 size={120} className="absolute -right-8 -bottom-8 text-black opacity-5 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                </div>
            </div>
        </div>
    );
};
