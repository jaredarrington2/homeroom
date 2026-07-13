'use client';
// components/SectionsReadMeta.tsx — the live "· {m} read" tail on a module masthead.
// Reads unit-completion from the shared progress context; renders nothing until loaded
// so the server "{n} sections" text never flickers a wrong count.
import { useProgressContext } from '@/lib/ProgressContext';

export default function SectionsReadMeta({ unitIds }: { unitIds: string[] }) {
  const { isUnitComplete } = useProgressContext();
  const read = unitIds.filter((id) => isUnitComplete(id)).length;
  if (read === 0) return null;
  return <> · {read} read</>;
}
