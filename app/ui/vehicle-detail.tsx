import { VehicleDetails } from "../lib/definitions";

export default function VehicleDetail({vehicle} : {vehicle:VehicleDetails | undefined}) {
  return (
    <div className="">
      {vehicle?.make}
    </div>
  );
}
