"use client";

import React, { useState, useMemo } from 'react';
import { quotationModels, locations, QuotationModel } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import {
    Calculator,
    ArrowRight,
    Truck,
    Wrench,
    Droplets,
    Settings,
    CheckCircle2,
    Clock,
    DollarSign,
    Zap
} from 'lucide-react';

export const Quotation = () => {
    const [selectedModelId, setSelectedModelId] = useState(quotationModels[0].id);
    const [selectedLocation, setSelectedLocation] = useState(locations[0].name);
    const [usageHours, setUsageHours] = useState(2000);

    const selectedModel = useMemo(() =>
        quotationModels.find(m => m.id === selectedModelId) || quotationModels[0],
        [selectedModelId]);

    const travelRate = useMemo(() =>
        locations.find(l => l.name === selectedLocation)?.travel_rate || 0,
        [selectedLocation]);

    const hourlyRates = useMemo(() => ({
        parts: selectedModel.parts_rate,
        lubricants: selectedModel.lubricants_rate,
        sos: selectedModel.sos_rate,
        labor: selectedModel.mo_rate,
        travel: travelRate
    }), [selectedModel, travelRate]);

    const totalHourlyRate = useMemo(() =>
        Object.values(hourlyRates).reduce((a, b) => a + b, 0),
        [hourlyRates]);

    const annualTotal = useMemo(() => totalHourlyRate * usageHours, [totalHourlyRate, usageHours]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">Outil de Chiffrage CVA</h3>
                    <p className="text-sm text-gray-400 mt-1">Générez des estimations précises basées sur les taux horaires techniques.</p>
                </div>
                <div className="bg-neemba-yellow/10 border border-neemba-yellow/20 px-4 py-2 rounded-xl">
                    <p className="text-[10px] text-neemba-yellow font-black uppercase tracking-widest leading-none">Status</p>
                    <p className="text-white font-bold text-sm">Mode Manuel • Mock Data</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Model Selection */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Modèle de Machine</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neemba-yellow/50 transition-all appearance-none cursor-pointer"
                                    value={selectedModelId}
                                    onChange={(e) => setSelectedModelId(e.target.value)}
                                >
                                    {quotationModels.map(m => (
                                        <option key={m.id} value={m.id} className="bg-black text-white">{m.name} ({m.type})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Location Selection */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Localisation Client</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neemba-yellow/50 transition-all appearance-none cursor-pointer"
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                >
                                    {locations.map(l => (
                                        <option key={l.name} value={l.name} className="bg-black text-white">{l.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Usage Slider */}
                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Usage Annuel Estimé (Heures)</label>
                                <span className="bg-neemba-yellow text-black font-black px-3 py-1 rounded-full text-sm">{usageHours} h/an</span>
                            </div>
                            <input
                                type="range"
                                min="100"
                                max="5000"
                                step="50"
                                value={usageHours}
                                onChange={(e) => setUsageHours(parseInt(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neemba-yellow"
                            />
                            <div className="flex justify-between text-[10px] text-gray-600 font-bold uppercase">
                                <span>Standby (250h)</span>
                                <span>Standard (2000h)</span>
                                <span>Intensif (4000h+)</span>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Details */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { label: 'Pièces', value: hourlyRates.parts, icon: Settings, color: 'text-blue-400' },
                            { label: 'Lubrifiants', value: hourlyRates.lubricants, icon: Droplets, color: 'text-cyan-400' },
                            { label: 'SOS', value: hourlyRates.sos, icon: Zap, color: 'text-amber-400' },
                            { label: 'Main d\'œuvre', value: hourlyRates.labor, icon: Wrench, color: 'text-neemba-yellow' },
                            { label: 'Déplacement', value: hourlyRates.travel, icon: Truck, color: 'text-purple-400' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center group hover:bg-white/10 transition-all">
                                <item.icon size={20} className={cn("mb-2 group-hover:scale-110 transition-transform", item.color)} />
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.label}</p>
                                <p className="text-sm font-bold text-white mt-1">{item.value.toLocaleString('fr-FR')} F/h</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Panel */}
                <div className="bg-neemba-yellow rounded-3xl p-8 flex flex-col shadow-2xl shadow-neemba-yellow/20 text-black">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                                <Calculator size={18} className="text-neemba-yellow" />
                            </div>
                            <h4 className="font-black uppercase tracking-tighter text-xl">Résumé du Devis</h4>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase opacity-60">Modèle Sélectionné</p>
                                <p className="text-2xl font-black">{selectedModel.name}</p>
                            </div>

                            <div className="h-[1px] bg-black/10" />

                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-bold uppercase opacity-60">Taux Horaire Total</p>
                                    <p className="text-3xl font-black">{totalHourlyRate.toLocaleString('fr-FR')}<span className="text-sm opacity-60 ml-1">F/h</span></p>
                                </div>
                                <Clock size={32} className="opacity-20" />
                            </div>

                            <div className="h-[1px] bg-black/10" />

                            <div>
                                <p className="text-[10px] font-bold uppercase opacity-60">Montant Annuel Estimé</p>
                                <p className="text-4xl font-black tracking-tighter">{annualTotal.toLocaleString('fr-FR')} <span className="text-xl">F CFA</span></p>
                                <p className="text-[10px] font-bold mt-1 opacity-60 italic">Hors taxes • Base {usageHours}h/an</p>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 mt-10 bg-black text-neemba-yellow font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/20 group">
                        <CheckCircle2 size={20} />
                        <span>VALIDER LE CHIFFRAGE</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-[9px] text-center mt-4 font-bold uppercase opacity-40">
                        © 2026 Neemba Price Tool v1.2
                    </p>
                </div>
            </div>
        </div>
    );
};
