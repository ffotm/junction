interface ZonePageProps {
  params: Promise<{ zone: string }>;
}

export default async function ZonePage({ params }: ZonePageProps) {
  const { zone } = await params;

  if (!zone || isNaN(Number(zone))) {
    return <div>Invalid zone route</div>;
  }

  return (
    <div>
      <h1>Zone Dashboard</h1>
      <p>Zone ID: {zone}</p>
    </div>
  );
}
