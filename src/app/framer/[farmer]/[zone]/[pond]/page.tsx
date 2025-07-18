import React from 'react'
// import PondDashboard from '@/components/pages/Ponds/PondPage'

interface PondPageProps {
  params: Promise<{ farmer: string; zone: string; pond: string }>
}

export default async function Pond({ params }: PondPageProps) {
  const { farmer, zone, pond } = await params;

  // Validate farmer parameter (expecting format like "f2")
  const farmerMatch = farmer.match(/^f(\d+)$/);
  const farmerId = farmerMatch ? farmerMatch[1] : null;

  if (!farmerId) {
    return <div>Invalid farmer route</div>;
  }

  // Validate zone parameter (expecting format like "z2")
  const zoneMatch = zone.match(/^z(\d+)$/);
  const zoneId = zoneMatch ? zoneMatch[1] : null;

  if (!zoneId) {
    return <div>Invalid zone route</div>;
  }

  // Validate pond parameter (expecting format like "p2")
  const pondMatch = pond.match(/^p(\d+)$/);
  const pondId = pondMatch ? pondMatch[1] : null;

  if (!pondId) {
    return <div>Invalid pond route</div>;
  }

  return (
    <div>
      <h1>Pond Dashboard</h1>
      <p>Farmer ID: {farmerId}</p>
      <p>Zone ID: {zoneId}</p>
      <p>Pond ID: {pondId}</p>
      {/* <PondDashboard pondId={pondId}/> */}
    </div>
  );
}