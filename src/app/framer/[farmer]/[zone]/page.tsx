interface ZonePageProps {
  params: Promise<{ farmer: string; zone: string }>;
}

export default async function ZonePage({ params }: ZonePageProps) {
  const { farmer, zone } = await params;

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

  return (
    <div>
      <h1>Zone Dashboard</h1>
      <p>Farmer ID: {farmerId}</p>
      <p>Zone ID: {zoneId}</p>
    </div>
  );
}
