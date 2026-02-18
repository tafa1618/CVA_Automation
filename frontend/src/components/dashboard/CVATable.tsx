"use client";

import React from 'react';
import { mockMachines, CVAMachine } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { MoreVertical, ExternalLink, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const StatusBadge = ({ status }: { status: CVAMachine['status'] }) => {
    const styles = {
        excellent: "bg-green-500/10 text-green-500",
        advanced: "bg-blue-500/10 text-blue-500",
        emerging: "bg-yellow-500/10 text-yellow-500",
        'non-scoring': "bg-red-500/10 text-red-500",
    };

    return (
        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", styles[status])}>
            {status}
        </span>
    );
};

export const CVATable = () => {
    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-foreground">Suivi des Contrats CVA</h3>
                    <p className="text-xs text-gray-500">Liste détaillée des machines et scores de fulfillment</p>
                </div>
                <button className="text-xs font-semibold text-neemba-yellow hover:underline flex items-center gap-1">
                    Exporter CSV <ExternalLink size={12} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-black/20">
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Client & Machine</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-left">Type</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Inspection</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">SOS</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Connectivity</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fulfillment</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Statut</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {mockMachines.map((machine) => (
                            <tr key={machine.serial_number} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-white group-hover:text-neemba-yellow transition-colors">{machine.client}</p>
                                    <p className="text-[10px] text-gray-500 font-mono uppercase">{machine.model} • {machine.serial_number}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-2 py-0.5 rounded text-[10px] font-bold border",
                                        machine.labor_type === 'CVA 2'
                                            ? "bg-neemba-yellow/10 text-neemba-yellow border-neemba-yellow/20"
                                            : "bg-gray-500/10 text-gray-400 border-white/10"
                                    )}>
                                        {machine.labor_type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className={cn(
                                            "text-xs font-bold",
                                            machine.inspection_score.startsWith('1') ? "text-green-500" : "text-red-400"
                                        )}>
                                            {machine.inspection_score}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className={cn(
                                            "text-xs font-bold",
                                            machine.sos_score.startsWith('1') ? "text-green-500" : "text-gray-500"
                                        )}>
                                            {machine.sos_score}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className={cn(
                                            "text-xs font-bold",
                                            machine.connectivity_score.startsWith('1') ? "text-green-500" : "text-red-400"
                                        )}>
                                            {machine.connectivity_score}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className={cn(
                                                    "h-full rounded-full transition-all duration-500",
                                                    machine.fulfillment_score >= 80 ? "bg-green-500" :
                                                        machine.fulfillment_score >= 60 ? "bg-neemba-yellow" :
                                                            "bg-red-500"
                                                )}
                                                style={{ width: `${machine.fulfillment_score}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-white w-8">{machine.fulfillment_score}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={machine.status} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-gray-500 hover:text-white transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
