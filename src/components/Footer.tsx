const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-white/5 backdrop-blur-2xl">
      <div className="container mx-auto px-6 py-16 flex items-center justify-center">
        <h1 
          className="font-display font-black text-[clamp(5rem,20vw,12rem)] leading-none tracking-tighter select-none text-transparent bg-clip-text"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.15) 0px,
              rgba(255,255,255,0.15) 1px,
              transparent 1px,
              transparent 4px
            )`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 0 30px rgba(255,255,255,0.05))"
          }}
        >
          sentinelOps
        </h1>
      </div>
    </footer>
  );
};

export default Footer;