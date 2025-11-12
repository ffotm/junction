interface ZonePageProps {
    params: { 
      farmerId: string;
      zoneId: string;
    }
  }
  
  export default function ZonePage({ params }: ZonePageProps) {
    const { farmerId, zoneId } = params;
    
    return (
      <div>
        <h1>Zone Dashboard</h1>
        <p>Farmer: {farmerId}, Zone: {zoneId}</p>
        {/* Your zone dashboard content */}
      </div>
    );
  }