import Image from 'next/image';

export function Card({ make, model, image }: { make: string; model:string; image: string }) {
  return (
    <div className="flex flex-col w-[300px] rounded-xl overflow-hidden">
      <Image
        alt="car"
        src={image}
        height={300}
        width={300}

      />
      <div className="bg-mag p-3 text-center">
        <p className="text-night">{make} {model}</p>
      </div>
    </div>
  );
}
