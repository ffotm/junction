interface FarmerPageProps {
  params: { farmer: string }
}

export default async function FarmerPage({ params }: FarmerPageProps) {
  // Expecting params.farmer to be like "f2"
  const match = await params.farmer.match(/^f(\d+)$/);
  const farmerId = match ? match[1] : null;

  if (!farmerId) {
    return <div>Invalid farmer route</div>;
  }

  return (
    <div>
      <h1>Farmer Dashboard</h1>
      <p>Farmer ID: {farmerId}</p>
      {/* Your farmer dashboard content */}
    </div>
  );
}