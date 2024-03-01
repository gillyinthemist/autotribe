import Image from 'next/image';

export function Card({ make, model, image }: { make: string; model:string; image: string }) {
  return (
    <div className="flex flex-col w-full max-w-[300px] h-[300px] rounded-xl overflow-hidden">
      <div className="flex-grow relative">
      <Image
        alt="car"
        src={image}
        fill={true}
        className="object-cover object-left w-full h-full"
      />
      </div>
      <div className="h-[50px] bg-raisin p-3 text-center z-10">
        <p>{make} {model}</p>
      </div>
    </div>
  );
}
