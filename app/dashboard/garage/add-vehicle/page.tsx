import Form from '@/app/ui/add-vehicle/add-vehicle-form';
import Breadcrumbs from '@/app/ui/garage/breadcrumbs';

export default async function Page() {
  
  return (

    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Garage', href: '/dashboard/garage' },
          {
            label: 'Add Vehicle',
            href: `/dashboard/garage/add-vehicle`,
            active: true,
          },
        ]}
      />
      <div className="flex flex-col items-center h-screen">
        <Form />
      </div>
      
    </main>
  );
}
