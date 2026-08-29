import * as React from 'react';
import * as Constants from '../../infrastructure/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Guitar } from '../../interfaces/models/guitar';
import { getGuitarPictureUrl } from '../../infrastructure/imageutils';

type HouseholdGridListProps = {
  data: Guitar[];
  isMobile?: boolean;
};

const HouseholdGridList: React.FC<HouseholdGridListProps> = ({ data: guitars }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {guitars.map((guitar) => {
          const pictureUrl = getGuitarPictureUrl(guitar);

          return (
            <Link
              key={guitar.id}
              href={`/detail/${guitar.id}`}
              className="group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-neutral-200/80 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden flex items-center justify-center">
                {pictureUrl ? (
                  <Image
                    src={pictureUrl}
                    alt={guitar.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-neutral-400 p-4 text-center">
                    <span className="text-3xl mb-1">🎸</span>
                    <span className="text-xs font-medium uppercase tracking-wider">
                      {Constants.ImagePlaceholder}
                    </span>
                  </div>
                )}
              </div>

              {/* Info Bar */}
              <div className="p-3 bg-white border-t border-neutral-100 flex flex-col justify-between flex-1">
                <h3 className="font-semibold text-neutral-800 text-sm line-clamp-1 group-hover:text-[#FE6B8B] transition-colors">
                  {guitar.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                  {[guitar.make, guitar.bodyStyle].filter(Boolean).join(' ')}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HouseholdGridList;
