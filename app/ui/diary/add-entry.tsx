'use client'
import { PlusCircleIcon } from "@heroicons/react/24/outline";
export default function AddEntry({id} : {id: string | undefined}) {

  function handleClick(){

  }

  return (
    <div className="flex flex-col bg-mag items-center rounded-lg p-3">
     <PlusCircleIcon height={40} width={40} onClick={handleClick} className="text-raisin hover:text-dun hover:cursor-pointer"/>
    </div>
  );
}
