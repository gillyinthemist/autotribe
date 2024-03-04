import { fetchVehicleByReg } from '@/app/lib/data';
import Form from '@/app/garage/add-vehicle/add-vehicle-form';
import EnterReg from '@/app/garage/add-vehicle/enter-reg';
import Breadcrumbs from '@/app/ui/navigation/breadcrumbs';
import { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clsx from 'clsx';

export const metadata: Metadata = {
  title: 'Add Vehicle',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    vrm?: string;
  };
}) {
  const vrm = searchParams?.vrm || '';
  let newVehicle = null;
  if (vrm !== '') {
    newVehicle = await fetchVehicleByReg(vrm);
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Garage', href: '/garage' },
          {
            label: 'Add Vehicle',
            href: `garage/add-vehicle`,
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

        <EnterReg
          className={clsx(
            { 'border-green-600': newVehicle?.status === 'Success' },
            { 'border-red-600': newVehicle && newVehicle.status !== 'Success' },
          )}
        />

        {newVehicle &&
          (newVehicle.status === 'Success' ? (
            <>
              <Form newVehicle={newVehicle} />
            </>
          ) : (
            <p>{newVehicle.message}</p>
          ))}
      </div>
    </main>
  );
}
