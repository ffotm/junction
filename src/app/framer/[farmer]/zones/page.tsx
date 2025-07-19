import ZonesPage from '@/components/pages/Zones/ZonesPage';

interface FarmerZonesPageProps {
  params: Promise<{ 
    farmer: string;
  }>
}

export default async function FarmerZonesPage({ params }: FarmerZonesPageProps) {
  const { farmer } = await params;

  // Validate farmer parameter
  const farmerMatch = farmer.match(/^f(\d+)$/);
  if (!farmerMatch) {
    return <div>Invalid farmer route</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ZonesPage params={{ farmer }} />
    </div>
  );
}
