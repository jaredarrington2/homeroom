'use client';
import ExplainPopover from './ExplainPopover';

type Props = {
  children: React.ReactNode;
  sectionId: string;
  sectionTitle: string;
  chapterId: string;
};

export default function ExplainableBody({ children, sectionId, sectionTitle, chapterId }: Props) {
  return (
    <>
      <div
        data-explainable
        data-section-id={sectionId}
        data-section-title={sectionTitle}
        data-chapter-id={chapterId}
      >
        {children}
      </div>
      <ExplainPopover />
    </>
  );
}
