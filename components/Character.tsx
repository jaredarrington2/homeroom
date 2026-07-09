import Image from 'next/image';
import { pickCharacter } from '@/lib/characters';

interface CharacterProps {
  tags: string[];
  avoid?: string[];
  sectionId: string;
  maxHeight?: number;
  /** Pin a specific character filename, bypassing the picker (for hand-chosen heroes). */
  file?: string;
}

export default function Character({ tags, avoid = [], sectionId, maxHeight = 240, file }: CharacterProps) {
  const filename = file ?? pickCharacter(tags, avoid, sectionId)?.filename;
  if (!filename) return null;
  const src = `/characters/${filename}`;
  return (
    <div className="flex justify-center" aria-hidden="true">
      <Image
        src={src}
        alt=""
        width={maxHeight}
        height={maxHeight}
        style={{ maxHeight, width: 'auto', objectFit: 'contain' }}
        loading="eager"
        unoptimized
      />
    </div>
  );
}
