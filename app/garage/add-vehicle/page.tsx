import { fetchVehicleByReg } from '@/app/lib/data';
import Form from '@/app/ui/add-vehicle/add-vehicle-form';
import EnterReg from '@/app/ui/query/enter-reg';
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
  } else {
    newVehicle = null;
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Garage', href: 'garage' },
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
            { 'border-4 border-green-600': newVehicle?.status === 'Success' },
            { 'border-4 border-red-600': newVehicle && newVehicle.status !== 'Success' },
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
