import { useState, useEffect, useRef } from 'react';

const DateCounter = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00', hours: '00', minutes: '00', seconds: '00'
  });
  const [isSyncing, setIsSyncing] = useState(true);
  const driftRef = useRef(0); // Difference between Internet and Local time

  useEffect(() => {
    const syncAndStart = async () => {
      try {
        // 1. Get True Internet Time for Kolkata
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
        const data = await response.json();

        const internetTime = new Date(data.datetime).getTime();
        const localTime = new Date().getTime();

        // 2. Calculate the "Drift"
        driftRef.current = internetTime - localTime;
        setIsSyncing(false);
      } catch (error) {
        console.warn("Internet sync failed, falling back to local machine time.");
        setIsSyncing(false);
      }
    };

    syncAndStart();
  }, []);

  useEffect(() => {
    // Target: April 8, 2026 00:00:00 IST
    const targetDate = new Date('2026-04-21T11:00:00+05:30').getTime();

    const updateTimer = () => {
      // 3. Apply the drift to the current local time to get the "True" time
      const trueNow = new Date().getTime() + driftRef.current;
      const difference = targetDate - trueNow;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: d.toString().padStart(2, '0'),
          hours: h.toString().padStart(2, '0'),
          minutes: m.toString().padStart(2, '0'),
          seconds: s.toString().padStart(2, '0')
        });
      } else {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call

    return () => clearInterval(timer);
  }, [isSyncing]); // Re-run timer logic once sync is done

  return (
    <div className="col-span-1 md:col-span-4 glass-panel border border-slate-700 rounded-xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden bg-black/40">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

      <h3 className="text-slate-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">
        {isSyncing ? 'Syncing_with_Atomic_Clock...' : 'Event_Countdown'}
      </h3>

      <div className="text-4xl md:text-5xl font-display font-black text-white mb-2 tracking-tighter tabular-nums">
        {timeLeft.days}
        <span className="text-(--neon-pink) animate-pulse">:</span>
        {timeLeft.hours}
        <span className="text-(--neon-pink) animate-pink/50 animate-pulse">:</span>
        {timeLeft.minutes}
        <span className="text-2xl text-slate-500 ml-1">:{timeLeft.seconds}</span>
      </div>

      <div className="flex gap-4 text-[10px] font-mono text-slate-500 uppercase">
        <span className="w-10">Days</span>
        <span className="w-10">Hours</span>
        <span className="w-10">Mins</span>
        <span className="w-10">Secs</span>
      </div>
    </div>
  );
};

export default DateCounter;