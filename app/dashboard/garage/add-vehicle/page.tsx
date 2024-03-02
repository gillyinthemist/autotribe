import Form from '@/app/ui/add-vehicle/add-vehicle-form';
import Breadcrumbs from '@/app/ui/garage/breadcrumbs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer
				position='bottom-center'
				autoClose={5000}
				limit={2}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
        <Form />
      </div>
      
    </main>
  );
}
