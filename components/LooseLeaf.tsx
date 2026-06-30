export default function LooseLeaf({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}>
      {/* Hole punches */}
      <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-around items-center py-8 z-10 pointer-events-none">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-5 h-5 rounded-full border-2 border-hairline-strong bg-paper"
            style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)' }}
          />
        ))}
      </div>
      <div
        className="ml-10 rounded-sm overflow-hidden"
        style={{
          background: '#FAF7EE',
          backgroundImage: `
            repeating-linear-gradient(
              transparent,
              transparent 27px,
              #B8D4E8 27px,
              #B8D4E8 28px
            ),
            linear-gradient(
              to right,
              transparent 47px,
              #C8534F 47px,
              #C8534F 49px,
              transparent 49px
            )
          `,
          minHeight: '220px',
          padding: '16px 24px 16px 56px',
        }}
      >
        {children}
      </div>
    </div>
  );
}
