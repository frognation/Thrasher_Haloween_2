import svgPaths from "./svg-vgk3yiv62h";
import imgSubtract from "../assets/c3d04aa6f1f22a327e52d9fe38d22fc47cadcf0f.png";

function Frame1() {
  return (
    <div className="absolute h-[886.655px] left-0 top-0 w-[709.324px]">
      <div className="absolute h-[886.655px] left-0 top-0 w-[709.324px]" data-name="Subtract">
        <img alt="" className="block max-w-none size-full" height="886.655" src={imgSubtract} width="709.324" />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[886.655px] left-[605.34px] top-[72px] w-[709.324px]">
      <div className="absolute h-[886.655px] left-0 top-0 w-[709.324px]" data-name="back">
        <video autoPlay className="absolute max-w-none object-cover size-full" controlsList="nodownload" loop playsInline>
          <source src="/_videos/v1/900c665ba115bd6fd1ec61466f4266afd1fb7a51" />
        </video>
      </div>
      <Frame1 />
    </div>
  );
}

function Group1() {
  return (
    <div className="h-[25.917px] relative shrink-0 w-[27.654px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.6537 25.9167">
        <g id="Group 2">
          <path d={svgPaths.p1b5901f0} fill="var(--fill-0, #D9D9D9)" id="Polygon 3" />
          <path d={svgPaths.p9c4ef00} fill="var(--fill-0, #D9D9D9)" id="Polygon 4" />
        </g>
      </svg>
    </div>
  );
}

function Prev() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[894px] overflow-clip px-[7px] py-[8px] top-[981.85px] w-[42px]" data-name="prev">
      <Group1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="h-[25.917px] relative shrink-0 w-[27.654px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.6537 25.9167">
        <g id="Group 4">
          <path d={svgPaths.p2caf4480} fill="var(--fill-0, #D9D9D9)" id="Polygon 1" />
          <path d={svgPaths.p1d93d180} fill="var(--fill-0, #D9D9D9)" id="Polygon 2" />
        </g>
      </svg>
    </div>
  );
}

function Next() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[999px] overflow-clip px-[7px] py-[8px] top-[981.85px] w-[42px]" data-name="next">
      <Group3 />
    </div>
  );
}

function Lightning() {
  return (
    <div className="absolute left-[1272.66px] size-[42px] top-[981.85px]" data-name="lightning">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
        <g id="lightning">
          <path d={svgPaths.p2735d900} fill="var(--fill-0, #D9D9D9)" id="Vector 1" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="[grid-area:1_/_1] h-[34.986px] ml-0 mt-0 relative w-[17.029px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0287 34.9868">
        <g id="Group 1">
          <path d={svgPaths.p24a36300} fill="var(--fill-0, #D9D9D9)" id="Subtract" />
          <rect fill="var(--fill-0, #D9D9D9)" height="14.4053" id="Rectangle 3" width="11.6765" x="2.90749" y="20.5815" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group />
    </div>
  );
}

function Candle() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[1216px] overflow-clip px-[7px] py-[8px] size-[42px] top-[981.85px]" data-name="candle">
      <Group4 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-center relative rounded-[10px] shrink-0 w-[42px]">
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="font-['Helvetica:CE_Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#d9d9d9] text-[16.812px] text-nowrap">ON</p>
    </div>
  );
}

function Switch() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[605.34px] overflow-clip px-[7px] py-[8px] size-[42px] top-[978.57px]" data-name="switch">
      <Frame2 />
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] bg-[#d9d9d9] h-[26.688px] ml-0 mt-0 w-[8.263px]" />
      <div className="[grid-area:1_/_1] bg-[#d9d9d9] h-[26.688px] ml-[12.34px] mt-0 w-[8.263px]" />
    </div>
  );
}

function PlayPause() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[949px] overflow-clip px-[7px] py-[8px] top-[981.85px] w-[42px]" data-name="play/pause">
      <Group2 />
    </div>
  );
}

export default function HalloweenPoster() {
  return (
    <div className="bg-black relative size-full" data-name="Halloween Poster">
      <Frame />
      <Prev />
      <Next />
      <Lightning />
      <Candle />
      <Switch />
      <PlayPause />
    </div>
  );
}