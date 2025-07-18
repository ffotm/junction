import React from 'react'
// import PondDashboard from '@/components/pages/Ponds/PondPage'

interface PondPageProps {
  params: { pond: string }
}

const Pond = ({ params }: PondPageProps) => {
  const pondId = params.pond;
  if (!pondId || isNaN(Number(pondId))) {
    return <div>Invalid pond route</div>;
  }

  return (
    <div>
      <h1>Pond Dashboard</h1>
      <p>Pond ID: {pondId}</p>
      {/* <PondDashboard pondId={pondId}/> */}
    </div>
  );
}

export default Pond