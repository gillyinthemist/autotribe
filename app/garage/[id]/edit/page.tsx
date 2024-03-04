import EnterReg from '@/app/garage/add-vehicle/enter-reg';
import Breadcrumbs from '@/app/ui/navigation/breadcrumbs';
import { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clsx from 'clsx';
import EditVehicle from '@/app/garage/[id]/edit/edit-vehicle-form';
import { fetchVehicleById } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Edit Vehicle',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const vehicle = await fetchVehicleById(id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Garage', href: '/garage' },
          {
            label: 'Details',
            href: `/garage/${id}/details`,
          },
          {
            label: 'Edit Vehicle',
            href: `/garage/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="flex h-screen flex-col items-center gap-5">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          limit={2}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <EditVehicle vehicle={vehicle} />
      </div>
    </main>
  );
}
