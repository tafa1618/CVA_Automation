"use client";

import React from 'react';
import {
    LayoutDashboard,
    Map as MapIcon,
    FileText,
    Settings,
    PlusCircle,
    LogOut,
    ChevronRight,
    TrendingUp,
    ShieldCheck,
    ClipboardCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
}

const NavItem = ({ icon: Icon, label, active }: NavItemProps) => (
    <div className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group",
        active
            ? "bg-neemba-yellow text-neemba-black font-semibold shadow-md"
            : "text-gray-400 hover:text-neemba-yellow hover:bg-white/5"
    )}>
        <Icon size={20} className={cn(active ? "text-neemba-black" : "group-hover:scale-110 transition-transform")} />
        <span className="text-sm">{label}</span>
    </div>
);

export const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-black border-r border-white/10 flex flex-col p-4 fixed left-0 top-0 z-50">
            {/* Brand */}
            <div className="flex items-center gap-3 px-2 mb-10 py-4">
                <div className="w-10 h-10 bg-neemba-yellow rounded-lg flex items-center justify-center font-bold text-black text-xl">
                    N
                </div>
                <div>
                    <h1 className="text-white font-bold tracking-tight">NEEMBA</h1>
                    <p className="text-[10px] text-neemba-yellow font-bold uppercase tracking-widest">CVA Automation</p>
                </div>
            </div>

            {/* Nav */}
            <div className="flex-1 flex flex-col gap-2">
                <p className="px-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Main Menu</p>
                <NavItem icon={LayoutDashboard} label="Dashboard" active />
                <NavItem icon={MapIcon} label="Machine Map" />
                <NavItem icon={ShieldCheck} label="CVA Fulfillment" />
                <NavItem icon={TrendingUp} label="PM Accuracy" />
                <NavItem icon={ClipboardCheck} label="Service Commitment" />

                <p className="px-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-8 mb-2">Tools</p>
                <NavItem icon={PlusCircle} label="New Contract" />
                <NavItem icon={Settings} label="Settings" />
            </div>

            {/* User */}
            <div className="mt-auto border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 mb-4 group cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden ring-2 ring-neemba-yellow/20">
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-white">AD</div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-xs font-semibold text-white truncate">Admin User</p>
                        <p className="text-[10px] text-gray-500 truncate">admin@neemba.com</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-500 group-hover:text-neemba-yellow transition-colors" />
                </div>

                <div className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-400 cursor-pointer transition-colors">
                    <LogOut size={18} />
                    <span className="text-xs">Logout</span>
                </div>
            </div>
        </div>
    );
};
