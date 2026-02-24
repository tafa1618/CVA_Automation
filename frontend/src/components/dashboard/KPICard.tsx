"use client";

import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
    label: string;
    value: string | number;
    suffix?: string;
    trend?: number;
    icon: React.ElementType;
    description?: string;
    onClick?: () => void;
}

export const KPICard = ({ label, value, suffix, trend, icon: Icon, description, onClick }: KPICardProps) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "bg-card border border-border rounded-2xl p-6 transition-all duration-300 group",
                onClick ? "cursor-pointer hover:shadow-xl hover:shadow-neemba-yellow/5 hover:border-neemba-yellow/20" : ""
            )}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-neemba-yellow/10 rounded-xl group-hover:bg-neemba-yellow group-hover:text-black transition-colors duration-300">
                    <Icon size={24} className="text-neemba-yellow group-hover:text-black transition-colors" />
                </div>
                {trend && (
                    <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold",
                        trend > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    )}>
                        {trend > 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
            <div>
                <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-1">{label}</p>
                <div className="flex items-baseline gap-1">
                    <h3 className="text-2xl font-bold text-foreground tracking-tight">{value}</h3>
                    {suffix && <span className="text-sm font-semibold text-gray-500">{suffix}</span>}
                </div>
                {description && (
                    <p className="mt-2 text-[10px] text-gray-500 leading-relaxed">{description}</p>
                )}
            </div>
        </div>
    );
};
