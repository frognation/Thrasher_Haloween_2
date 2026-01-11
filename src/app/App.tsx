import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import svgPaths from "../imports/svg-vgk3yiv62h";
import imgSubtract from "../assets/c3d04aa6f1f22a327e52d9fe38d22fc47cadcf0f.png";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTopLayerFirst, setIsTopLayerFirst] = useState(true);
  const [isCandleMode, setIsCandleMode] = useState(true);
  const [clipIndex, setClipIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [lightningOpacity, setLightningOpacity] = useState(1);
  
  const topVideoRef = useRef<HTMLVideoElement>(null);
  const bottomVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resolveAsset = useCallback((path: string) => {
    // Ensure assets work both in dev ("/") and on GitHub Pages base ("/Thrasher-Haloween/")
    const base = import.meta.env.BASE_URL.endsWith('/') 
      ? import.meta.env.BASE_URL 
      : `${import.meta.env.BASE_URL}/`;
    return `${base}${path}`;
  }, []);

  const bottomClips = useMemo(
    () => [
      resolveAsset("videos/1.mp4"),
      resolveAsset("videos/2.mp4"),
      resolveAsset("videos/3.mp4"),
      resolveAsset("videos/4.mp4"),
    ],
    [resolveAsset]
  );
  const topClips = useMemo(
    () => [
      resolveAsset("videos/1-front.mp4"),
      resolveAsset("videos/2-front.mp4"),
      resolveAsset("videos/3-front.mp4"),
      resolveAsset("videos/4-front.mp4"),
    ],
    [resolveAsset]
  );

  const currentBottomSrc = bottomClips[clipIndex] ?? bottomClips[0];
  const currentTopSrc = topClips[clipIndex] ?? topClips[0];

  const goToClip = useCallback(
    (direction: "prev" | "next") => {
      const delta = direction === "next" ? 1 : -1;
      setClipIndex((current) => {
        const next = (current + delta + bottomClips.length) % bottomClips.length;
        return next;
      });
    },
    [bottomClips.length]
  );

  const handleClipEnded = useCallback(() => {
    goToClip("next");
  }, [goToClip]);

  useEffect(() => {
    const videos = [topVideoRef.current, bottomVideoRef.current];

    videos.forEach((video) => {
      if (!video) return;

      try {
        video.currentTime = 0;
      } catch {
        // ignore
      }

      if (isPlaying) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [clipIndex, isPlaying]);

  // Lightning effect
  useEffect(() => {
    if (!isCandleMode) {
      const flash = () => {
        // Random number of flashes (2-5)
        const flashCount = Math.floor(Math.random() * 4) + 2;
        let currentFlash = 0;

        const flashInterval = setInterval(() => {
          setLightningOpacity(prev => prev === 1 ? 0 : 1);
          currentFlash++;
          
          if (currentFlash >= flashCount * 2) {
            clearInterval(flashInterval);
            setLightningOpacity(1);
            // Wait 1-2 seconds before next flash sequence
            setTimeout(flash, Math.random() * 1000 + 1000);
          }
        }, Math.random() * 100 + 50);
      };

      flash();
    } else {
      setLightningOpacity(1);
    }
  }, [isCandleMode]);

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Play/Pause toggle
  const togglePlayPause = () => {
    const videos = [topVideoRef.current, bottomVideoRef.current];
    videos.forEach(video => {
      if (video) {
        if (isPlaying) {
          video.pause();
        } else {
          video.play().catch(() => undefined);
        }
      }
    });
    setIsPlaying(!isPlaying);
  };

  // Switch layers
  const toggleSwitch = () => {
    setIsTopLayerFirst(!isTopLayerFirst);
  };

  // Toggle between candle and lightning mode
  const toggleMode = (mode: 'candle' | 'lightning') => {
    setIsCandleMode(mode === 'candle');
  };

  const [scale, setScale] = useState(1);
  const BASE_WIDTH = 851.19; // 709.324 * 1.2
  const BASE_HEIGHT = 1063.99; // 886.655 * 1.2
  const CONTROLS_HEIGHT = 80;

  useEffect(() => {
    const handleResize = () => {
      const padding = 40; // Total horizontal/vertical padding
      const vh = window.innerHeight - padding;
      const vw = window.innerWidth - padding;
      const scaleH = vh / (BASE_HEIGHT + CONTROLS_HEIGHT);
      const scaleW = vw / BASE_WIDTH;
      setScale(Math.min(scaleH, scaleW, 1.2)); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-black relative h-[100dvh] w-full flex items-center justify-center overflow-hidden" data-name="Halloween Poster">
      <div 
        style={{ 
          transform: `scale(${scale})`,
          width: `${BASE_WIDTH}px`,
          height: `${BASE_HEIGHT + CONTROLS_HEIGHT}px`,
          position: 'relative',
          transition: 'transform 0.2s ease-out'
        }}
        className="flex flex-col items-center"
      >
        <div 
          ref={containerRef}
          className="relative w-full h-[1063.99px]"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ cursor: isHovering ? 'none' : 'auto' }}
        >
          {/* Bottom video layer */}
          <div 
            className="absolute inset-0"
            style={{ 
              zIndex: isTopLayerFirst ? 1 : 2,
              opacity: !isTopLayerFirst ? (isCandleMode ? 1 : lightningOpacity) : 1
            }}
          >
            <video 
              ref={bottomVideoRef}
              autoPlay 
              className="absolute max-w-none object-cover size-full" 
              controlsList="nodownload" 
              playsInline
              muted
              preload="auto"
              src={currentBottomSrc}
              onEnded={handleClipEnded}
              style={{
                maskImage: !isTopLayerFirst && isCandleMode && isHovering 
                  ? `radial-gradient(circle 284px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 236px, rgba(0,0,0,0.15) 255px, black 284px)`
                  : 'none',
                WebkitMaskImage: !isTopLayerFirst && isCandleMode && isHovering 
                  ? `radial-gradient(circle 284px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 236px, rgba(0,0,0,0.15) 255px, black 284px)`
                  : 'none'
              }}
            >
            </video>
          </div>

          {/* Top video layer with masking */}
          <div 
            className="absolute inset-0"
            style={{ 
              zIndex: isTopLayerFirst ? 2 : 1,
              opacity: isTopLayerFirst ? (isCandleMode ? 1 : lightningOpacity) : 1
            }}
          >
            <video 
              ref={topVideoRef}
              autoPlay 
              className="absolute max-w-none object-cover size-full" 
              controlsList="nodownload" 
              playsInline
              muted
              preload="auto"
              src={currentTopSrc}
              style={{
                maskImage: isTopLayerFirst && isCandleMode && isHovering 
                  ? `radial-gradient(circle 284px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 236px, rgba(0,0,0,0.15) 255px, black 284px)`
                  : 'none',
                WebkitMaskImage: isTopLayerFirst && isCandleMode && isHovering 
                  ? `radial-gradient(circle 284px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 236px, rgba(0,0,0,0.15) 255px, black 284px)`
                  : 'none'
              }}
            >
            </video>

            {/* Subtract image overlay (for reference) */}
            <div className="absolute inset-0 pointer-events-none opacity-0">
              <img alt="" className="block max-w-none size-full" src={imgSubtract} />
            </div>
          </div>

        </div>

        {/* Control Buttons Container */}
        <div className="relative w-full h-[80px] mt-4 flex items-center justify-between px-2">
          {/* Left Controls */}
          <div className="flex items-center gap-4">
            {/* Switch Button */}
            <button 
              onClick={toggleSwitch}
              className="content-stretch flex flex-col items-center justify-center overflow-clip px-[7px] py-[8px] size-[42px] cursor-pointer"
              data-name="switch"
            >
              <div className={`content-stretch flex h-[28px] items-center justify-center relative rounded-[10px] shrink-0 w-[42px] transition-all ${
                isTopLayerFirst 
                  ? 'bg-transparent' 
                  : 'bg-white'
              }`}>
                <div 
                  aria-hidden="true" 
                  className={`absolute border border-solid inset-0 pointer-events-none rounded-[10px] ${
                    isTopLayerFirst ? 'border-[#d9d9d9]' : 'border-white'
                  }`} 
                />
                <p className={`font-['Helvetica:CE_Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16.812px] text-nowrap transition-colors ${
                  isTopLayerFirst ? 'text-[#d9d9d9]' : 'text-black'
                }`}>
                  {isTopLayerFirst ? 'ON' : 'OFF'}
                </p>
              </div>
            </button>
          </div>

          {/* Center Playback Controls */}
          <div className="flex items-center gap-4">
            {/* Prev Button */}
            <button 
              onClick={() => goToClip('prev')}
              className="content-stretch flex flex-col items-center justify-center overflow-clip px-[7px] py-[8px] w-[42px] cursor-pointer hover:opacity-70 transition-opacity"
              data-name="prev"
            >
              <div className="h-[25.917px] relative shrink-0 w-[27.654px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.6537 25.9167">
                  <g id="Group 2">
                    <path d={svgPaths.p1b5901f0} fill="var(--fill-0, #D9D9D9)" id="Polygon 3" />
                    <path d={svgPaths.p9c4ef00} fill="var(--fill-0, #D9D9D9)" id="Polygon 4" />
                  </g>
                </svg>
              </div>
            </button>

            {/* Play/Pause Button */}
            <button 
              onClick={togglePlayPause}
              className="content-stretch flex flex-col items-center justify-center overflow-clip px-[7px] py-[8px] w-[42px] cursor-pointer hover:opacity-70 transition-opacity"
              data-name="play/pause"
            >
              {isPlaying ? (
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                  <div className="[grid-area:1_/_1] bg-[#d9d9d9] h-[26.688px] ml-0 mt-0 w-[8.263px]" />
                  <div className="[grid-area:1_/_1] bg-[#d9d9d9] h-[26.688px] ml-[12.34px] mt-0 w-[8.263px]" />
                </div>
              ) : (
                <div className="h-[26.688px] relative shrink-0 w-[20.603px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 27">
                    <path d="M0 0L21 13.5L0 27V0Z" fill="#D9D9D9" />
                  </svg>
                </div>
              )}
            </button>

            {/* Next Button */}
            <button 
              onClick={() => goToClip('next')}
              className="content-stretch flex flex-col items-center justify-center overflow-clip px-[7px] py-[8px] w-[42px] cursor-pointer hover:opacity-70 transition-opacity"
              data-name="next"
            >
              <div className="h-[25.917px] relative shrink-0 w-[27.654px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.6537 25.9167">
                  <g id="Group 4">
                    <path d={svgPaths.p2caf4480} fill="var(--fill-0, #D9D9D9)" id="Polygon 1" />
                    <path d={svgPaths.p1d93d180} fill="var(--fill-0, #D9D9D9)" id="Polygon 2" />
                  </g>
                </svg>
              </div>
            </button>
          </div>

          {/* Right Mode Controls */}
          <div className="flex items-center gap-4">
            {/* Candle Button */}
            <button 
              onClick={() => toggleMode('candle')}
              className={`content-stretch flex flex-col items-center justify-center overflow-clip px-[7px] py-[8px] size-[42px] cursor-pointer transition-opacity ${
                isCandleMode ? 'opacity-100' : 'opacity-40'
              }`}
              data-name="candle"
            >
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                <div className="[grid-area:1_/_1] h-[34.986px] ml-0 mt-0 relative w-[17.029px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0287 34.9868">
                    <g id="Group 1">
                      <path d={svgPaths.p24a36300} fill={isCandleMode ? "#FFFFFF" : "#D9D9D9"} id="Subtract" />
                      <rect fill={isCandleMode ? "#FFFFFF" : "#D9D9D9"} height="14.4053" id="Rectangle 3" width="11.6765" x="2.90749" y="20.5815" />
                    </g>
                  </svg>
                </div>
              </div>
            </button>

            {/* Lightning Button */}
            <button 
              onClick={() => toggleMode('lightning')}
              className={`size-[42px] cursor-pointer transition-opacity ${
                !isCandleMode ? 'opacity-100' : 'opacity-40'
              }`}
              data-name="lightning"
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
                <g id="lightning">
                  <path d={svgPaths.p2735d900} fill={!isCandleMode ? "#FFFFFF" : "#D9D9D9"} id="Vector 1" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
