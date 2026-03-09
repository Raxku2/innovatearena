import React, { useEffect, useState } from 'react'
import { useEventDetailsStore } from '../../stores'

export default function Invoice({ customInvoiceData }) {
    const storeInvoice = useEventDetailsStore(state => state.invoice);

    // Use the prop if provided (for the PDF), otherwise use the store (for the UI)
    const invoice = customInvoiceData || storeInvoice;

    if (!invoice) return null;

    // Extract variables DIRECTLY. No useEffect needed!
    const payDate = invoice['pay_data']['payment_created_at'];
    const transactionId = invoice.acquirer_data['rrn'];
    const payMethod = invoice.method;
    const amount = invoice.amount / 100;
    const teamId = invoice.notes['team_id'];
    const nameMember1 = invoice.team_data[0]?.['name'];
    const nameMember2 = invoice.team_data[1]?.['name'];
    const payerName = invoice.notes['username'];
    const payerEmail = invoice.email;
    const payerPhone = invoice.contact;
    const invoiceId = invoice.id;
    const payStatus = invoice.captured;

    const formatReadableDate = (timestamp) => {
        if (!timestamp) return "";
        const cleanTimestamp = timestamp.replace(' ', 'T');
        const dateObj = new Date(cleanTimestamp);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(dateObj);
    };


    return (
        <div>
            {/* <!-- Main Invoice Container --> */}
            <div className="max-w-212.5 w-full bg-slate-900/50 backdrop-blur-xl border border-primary/20 rounded-xl overflow-hidden shadow-2xl print-container glow-border">
                {/* <!-- Tech Accent Bar --> */}
                <div className="h-1.5 w-full bg-linear-to-r from-primary/20 via-primary to-primary/20"></div>
                <div className="p-8 md:p-12">
                    {/* <!-- Branding & Header Section --> */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <div className="size-10 flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(0,212,255,0.4)]">
                                    {/* <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path clip-rule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill-rule="evenodd"></path>
                                    </svg> */}
                                    <img src="./favicon.ico" alt="" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-black tracking-tighter text-white">INNOVATEARENA</h1>
                                    <p className="text-[10px] font-mono tracking-widest text-primary uppercase leading-none">Organized by Yantrayodha Club</p>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-6xl font-black text-white tracking-tighter">INVOICE</h2>
                            </div>
                        </div>
                        <div className="flex flex-col md:items-end font-mono">
                            <div className="text-right">
                                <p className="text-primary text-xs uppercase tracking-widest mb-1">Invoice Identification</p>
                                <p className="text-white text-xl font-bold">{invoiceId}</p>
                            </div>
                            <div className="text-right mt-4">
                                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Issue Date</p>
                                <p className="text-slate-300 font-medium">{formatReadableDate(payDate)}</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Addresses Section --> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 border-t border-b border-primary/10 py-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-primary text-lg">store</span>
                                <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-400">From / Origin</h3>
                            </div>
                            <div className="space-y-1">
                                <p className="text-white font-bold">Rakesh Kundu (Pinaka)</p>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                    {/* Aryan Institute of Engineering &amp; Management<br /> */}
                                    Purba Satgachia, Kalna<br />
                                    Purba-Bardhhaman, WestBengal 712512
                                </p>
                                <p className="text-primary text-sm font-mono mt-2">its.rakesh@myyahoo.com</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-primary text-lg">person_pin_circle</span>
                                <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-400">Bill To / Recipient</h3>
                            </div>
                            <div className="space-y-1">
                                <p className="text-white font-bold">{payerName}</p>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {/* [College/Institution Placeholder]<br /> */}
                                    {payerPhone}
                                </p>
                                <p className="text-primary text-sm font-mono mt-2">{payerEmail}</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Team Info Banner --> */}
                    <div className="mb-10 bg-primary/5 border border-primary/20 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded bg-primary/10 flex items-center justify-center border border-primary/30">
                                <span className="material-symbols-outlined text-primary text-2xl">groups</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Registered Team</p>
                                <p className="text-white font-bold text-lg">{teamId}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                            <div className="font-mono">
                                <p className="text-[10px] uppercase text-slate-500">Member 1</p>
                                <p className="text-slate-300 text-sm">{nameMember1}</p>
                            </div>
                            <div className="font-mono">
                                <p className="text-[10px] uppercase text-slate-500">Member 2</p>
                                <p className="text-slate-300 text-sm">{nameMember2}</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Itemized Table --> */}
                    <div className="mb-12 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-primary/20 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                                    <th className="pb-4 font-medium">Description</th>
                                    <th className="pb-4 font-medium text-center">Qty</th>
                                    <th className="pb-4 font-medium text-right">Unit Price</th>
                                    <th className="pb-4 font-medium text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                <tr className="group">
                                    <td className="py-6">
                                        <p className="text-white font-bold mb-1">InnovateArena</p>
                                        <p className="text-slate-500 text-xs" hidden={!nameMember2}>Full access for 2 members, and participation certificate.</p>
                                        <p className="text-slate-500 text-xs" hidden={nameMember2}>Full access for 1 member, and participation certificate.</p>
                                    </td>
                                    <td className="py-6 text-center text-slate-300 font-mono">01</td>
                                    <td className="py-6 text-right text-slate-300 font-mono">₹ {amount}</td>
                                    <td className="py-6 text-right text-white font-bold font-mono">₹ {amount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* <!-- Summary & Payment --> */}
                    <div className="flex flex-col md:flex-row gap-12 justify-between items-start">
                        {/* <!-- Payment Status Badge --> */}
                        <div className="order-2 md:order-1 flex flex-col gap-4">
                            <div className="inline-flex justify-center items-center px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 font-bold text-xs text-center uppercase tracking-widest" hidden={!payStatus}>
                                {/* <span className="size-2 bg-green-500 rounded-full animate-pulse"></span> */}
                                <p>
                                    Payment Status: PAID
                                </p>
                            </div>
                            <div className="inline-flex justify-center items-center px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-bold text-xs text-center uppercase tracking-widest" hidden={payStatus}>
                                {/* <span className="size-2 bg-green-500 rounded-full animate-pulse"></span> */}
                                <p>
                                    Payment Status: FAILD
                                </p>
                            </div>
                            <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50 space-y-2 font-mono text-xs">
                                <div className="flex justify-between gap-8">
                                    <span className="text-slate-500">Method:</span>
                                    <span className="text-slate-300">{payMethod}</span>
                                </div>
                                <div className="flex justify-between gap-8">
                                    <span className="text-slate-500">Transaction ID:</span>
                                    <span className="text-slate-300">{transactionId}</span>
                                </div>
                                <div className="flex justify-between gap-8">
                                    <span className="text-slate-500">Date Paid:</span>
                                    <span className="text-slate-300">{formatReadableDate(payDate)}</span>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Totals --> */}
                        <div className="order-1 md:order-2 w-full md:w-64 space-y-3 font-mono">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Subtotal</span>
                                <span className="text-slate-300">₹ {amount}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Tax/Platform Fee (0%)</span>
                                <span className="text-slate-300">₹ 0.00</span>
                            </div>
                            <div className="pt-4 border-t border-primary/20 flex justify-between items-center">
                                <span className="text-white font-bold uppercase tracking-widest">Grand Total</span>
                                <span className="text-2xl font-black text-primary drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]">₹ {amount}</span>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Footer / Terms --> */}
                    <div className="mt-10 pt-8 border-t border-primary/10 text-center">
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold mb-4">Terms &amp; Notes</p>
                        <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
                            Please refer to our website for the refund policy.
                            This is a computer-generated invoice and requires no signature.
                            Thank you for registering. We look forward to seeing your team at the event!
                        </p>
                        <div className="flex justify-center gap-4 mt-8 opacity-20 hover:opacity-100 transition-opacity">
                            <div className="h-px w-12 bg-primary self-center"></div>
                            <p className="font-mono text-[9px] text-primary uppercase tracking-widest">Digital Auth Verified</p>
                            <div className="h-px w-12 bg-primary self-center"></div>
                        </div>
                    </div>
                </div>
                {/* <!-- Bottom Tech Accent --> */}
                <div className="flex h-1">
                    <div className="w-1/3 bg-primary/20"></div>
                    <div className="w-1/3 bg-primary"></div>
                    <div className="w-1/3 bg-primary/20"></div>
                </div>
            </div>
            {/* <!-- Supportive Branding --> */}
            {/* <div className="mt-8 flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all no-print">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">SECURE PAYMENT BY</span>
                    <span className="font-bold text-white tracking-tighter">Razorpay</span>
                </div>
                <div className="w-px h-4 bg-slate-800"></div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">ORGANISED BY</span>
                    <span className="font-bold text-white tracking-tighter uppercase">AIEM</span>
                </div>
            </div> */}
        </div>

    )
}
