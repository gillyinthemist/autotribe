import { VehicleDetails } from "../../lib/definitions";

export default function VehicleDiary({vehicle} : {vehicle:VehicleDetails | undefined}) {
  return (
    <div className="flex flex-col flex-grow bg-brown rounded-lg p-5">
      <p>Diary Goes here</p>
    </div>
  );
}
