import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Guitar } from '../../interfaces/models/guitar';

type HouseholdGridProps = {
  data: Guitar[];
  isMobile?: boolean;
};

const HouseholdGrid: React.FC<HouseholdGridProps> = ({ data: guitars }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {guitars.map((guitar) => (
          <Link
            key={guitar.id}
            href={`/detail/${guitar.id}`}
            className="group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-neutral-200 transition-all duration-200"
          >
            <div className="relative w-full aspect-[3/4] bg-neutral-100 flex items-center justify-center">
              {guitar.picture ? (
                <Image
                  src={guitar.picture}
                  alt={guitar.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <span className="text-2xl">🎸</span>
              )}
            </div>
            <div className="p-2.5">
              <h4 className="font-medium text-xs text-neutral-800 line-clamp-1 group-hover:text-[#FE6B8B]">
                {guitar.name}
              </h4>
              <p className="text-[11px] text-neutral-500 line-clamp-1">
                {[guitar.make, guitar.bodyStyle].filter(Boolean).join(' ')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HouseholdGrid;
