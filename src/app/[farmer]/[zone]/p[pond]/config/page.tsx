interface PondConfigProps {
    params: { 
      farmerId: string;
      zoneId: string;
      pondId: string;
    }
  }
  
  export default function PondConfigPage({ params }: PondConfigProps) {
    const { farmerId, zoneId, pondId } = params;
    
    return (
      <div>
        <h1>Pond Configuration</h1>
        <p>Configuring Pond {pondId} in Zone {zoneId} and {farmerId}</p>
        {/* Your pond configuration content */}
      </div>
    );
  }