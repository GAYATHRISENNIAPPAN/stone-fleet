'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  FilePlus,
  FilePen,
  PlayCircle,
  StopCircle,
  CheckCircle,
  Truck,
  User,
  Receipt,
  FileBarChart,
} from 'lucide-react';

type MenuItemProps = {
  label: string;
  href?: string;
  active?: boolean;
  arrow?: boolean;
  open?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const MenuItem = ({ label, href, active, arrow = false, open, icon, onClick }: MenuItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (!href) return;
    if (window.location.pathname === href) {
      router.refresh();
    } else {
      router.push(href);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 16px',
        padding: '10px 16px',
        borderRadius: '24px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
        backgroundColor: active ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
        color: active ? 'var(--primary)' : 'var(--text-secondary)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {icon}
        <span>{label}</span>
      </div>
      {arrow && (
        <span style={{ fontSize: '12px', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ▾
        </span>
      )}
    </div>
  );
};

export default function Sidebar() {
  const pathname = usePathname();
  const [reportOpen, setReportOpen] = useState(pathname.startsWith('/tms-report'));

  const iconStyle = (active?: boolean) => ({
    width: '16px',
    height: '16px',
    color: active ? 'var(--primary)' : 'var(--text-secondary)',
  });

  return (
    <aside style={{
      height: '100vh',
      width: '256px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid var(--border-color)',
    }}>
      {/* Logo */}
      <div style={{ height: '64px', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 24px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)' }}>StoneFleet</h1>
      </div>

      {/* Menu */}
      <nav style={{ marginTop: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <MenuItem label="Driver" href="/driver" active={pathname === '/driver'} icon={<User style={iconStyle(pathname === '/driver')} />} />
        <MenuItem label="Vehicle" href="/vehicle" active={pathname === '/vehicle'} icon={<Truck style={iconStyle(pathname === '/vehicle')} />} />
        
        <MenuItem label="LR Booking New" href="/tms/lr-booking" active={pathname === '/tms/lr-booking'} icon={<FilePlus style={iconStyle(pathname === '/tms/lr-booking')} />} />
        <MenuItem label="LR Creation New" href="/tms/lr-creation" active={pathname === '/tms/lr-creation'} icon={<FilePen style={iconStyle(pathname === '/tms/lr-creation')} />} />
        <MenuItem label="Trip Start" href="/tms/trip-start" active={pathname === '/tms/trip-start'} icon={<PlayCircle style={iconStyle(pathname === '/tms/trip-start')} />} />
        <MenuItem label="Trip Close" href="/tms/trip-close" active={pathname === '/tms/trip-close'} icon={<StopCircle style={iconStyle(pathname === '/tms/trip-close')} />} />
        <MenuItem label="Proof of Delivery" href="/tms/pod" active={pathname === '/tms/pod'} icon={<CheckCircle style={iconStyle(pathname === '/tms/pod')} />} />
        <MenuItem label="Vehicle Status Update" href="/tms/vehicle-status" active={pathname === '/tms/vehicle-status'} icon={<Truck style={iconStyle(pathname === '/tms/vehicle-status')} />} />
        <MenuItem label="Driver Status Update" href="/tms/driver-status" active={pathname === '/tms/driver-status'} icon={<User style={iconStyle(pathname === '/tms/driver-status')} />} />
        <MenuItem label="Transport Invoice" href="/tms/transport-invoice" active={pathname === '/tms/transport-invoice'} icon={<Receipt style={iconStyle(pathname === '/tms/transport-invoice')} />} />
        <MenuItem label="TMS Report" active={reportOpen} arrow open={reportOpen} icon={<FileBarChart style={iconStyle(reportOpen)} />} onClick={() => setReportOpen(!reportOpen)} />

        {reportOpen && (
          <div style={{ marginLeft: '40px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px' }}>
            <MenuItem label="Trip Report" href="/tms-report/trip" active={pathname === '/tms-report/trip'} />
            <MenuItem label="TMS MIS Report" href="/tms-report/tms-mis" active={pathname === '/tms-report/tms-mis'} />
            <MenuItem label="MIS Sales Report" href="/tms-report/mis-sales" active={pathname === '/tms-report/mis-sales'} />
            <MenuItem label="Vehicle Movement Report" href="/tms-report/vehicle-movement" active={pathname === '/tms-report/vehicle-movement'} />
            <MenuItem label="Driver Status Report" href="/tms-report/driver-status" active={pathname === '/tms-report/driver-status'} />
            <MenuItem label="Vehicle TAT Report" href="/tms-report/vehicle-tat" active={pathname === '/tms-report/vehicle-tat'} />
          </div>
        )}
      </nav>
    </aside>
  );
}
