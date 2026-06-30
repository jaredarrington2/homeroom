import LooseLeaf from './LooseLeaf';

interface DiagramProps {
  title?: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
}

export default function Diagram({ title, children, width = 600, height = 200 }: DiagramProps) {
  return (
    <LooseLeaf>
      {title && (
        <p className="font-hand text-[17px] text-pencil mb-2" style={{ transform: 'rotate(-0.5deg)' }}>
          {title}
        </p>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily: 'Caveat, cursive' }}
      >
        {children}
      </svg>
    </LooseLeaf>
  );
}
