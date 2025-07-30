import svgPaths from "./svg-fviwoozasi";
import imgImg from "figma:asset/410c340aa057242400c608368f918307cdd72438.png";

function Div() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-0 top-0 w-[344.734px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-0 not-italic text-[24px] text-gray-800 text-left top-[-4.76px] w-[146px]">
        <p className="block leading-[32px]">My Routines</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-500 text-left top-[31.12px] w-[343px]">
        <p className="block leading-[24px]">
          Manage and organize your workout programs
        </p>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-8 top-6 w-[1376px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_338)">
            <path
              d={svgPaths.p1d73a600}
              fill="var(--fill-0, #9CA3AF)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_338">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-3 overflow-clip p-0 size-4 top-4"
      data-name="Frame"
    >
      <Frame />
    </div>
  );
}

function Input() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[42px] left-0 rounded-md top-0 w-80"
      data-name="input"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[42px] justify-center leading-[0] left-10 not-italic text-[#adaebc] text-[16px] text-left top-[21px] translate-y-[-50%] w-[132px]">
        <p className="block leading-[24px]">Search routines...</p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-0 top-0 w-80"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame1 />
      <Input />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute left-[109px] size-6 top-2" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Frame">
          <path
            clipRule="evenodd"
            d={svgPaths.p1cee2900}
            fill="var(--fill-0, black)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Select() {
  return (
    <div
      className="absolute bg-[#ffffff] h-10 left-0 rounded-md top-0 w-[141px]"
      data-name="select"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-10 justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden text-[#000000] text-[16px] text-left text-nowrap top-5 translate-y-[-50%] w-[72px]">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          All Levels
        </p>
      </div>
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute left-[109px] size-6 top-2" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Frame">
          <path
            clipRule="evenodd"
            d={svgPaths.p1cee2900}
            fill="var(--fill-0, black)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Select1() {
  return (
    <div
      className="absolute bg-[#ffffff] h-10 left-[149px] rounded-md top-0 w-[141px]"
      data-name="select"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-10 justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden text-[#000000] text-[16px] text-left text-nowrap top-5 translate-y-[-50%] w-[66px]">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          All Goals
        </p>
      </div>
      <Frame3 />
    </div>
  );
}

function Div3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[336px] top-px w-[290px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Select />
      <Select1 />
    </div>
  );
}

function Div4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-0 top-0 w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div2 />
      <Div3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p32f04400}
            fill="var(--fill-0, #4B5563)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[9px] overflow-clip p-0 top-[13px] w-3.5"
      data-name="Frame"
    >
      <Frame4 />
    </div>
  );
}

function Button() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-0 rounded-md top-0 w-8"
      data-name="button"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <path d="M16 16H0V0H16V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p1d151f00}
            fill="var(--fill-0, #4F46E5)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-4 top-0.5"
      data-name="svg"
    >
      <Frame6 />
    </div>
  );
}

function I() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[9px] top-[11px] w-4"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg />
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute bg-indigo-50 h-[42px] left-10 rounded-md top-0 w-[34px]"
      data-name="button"
    >
      <div className="absolute border border-indigo-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I />
    </div>
  );
}

function Div5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-[1252px] top-0 w-[74px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button />
      <Button1 />
    </div>
  );
}

function Div6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-[25px] top-[25px] w-[1326px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div4 />
      <Div5 />
    </div>
  );
}

function Div7() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[92px] left-8 rounded-xl top-[104px] w-[1376px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div6 />
    </div>
  );
}

function Div8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-0 top-0 w-[93.453px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-500 text-left top-[-1.2px] w-[94px]">
        <p className="block leading-[20px]">Total Routines</p>
      </div>
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-0 not-italic text-[24px] text-gray-800 text-left top-[15.56px] w-4">
        <p className="block leading-[32px]">8</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 size-5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_326)">
            <path
              d={svgPaths.p36592f00}
              fill="var(--fill-0, #4F46E5)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_326">
            <path d="M0 0H20V20H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-5 top-[3.5px]"
      data-name="svg"
    >
      <Frame7 />
    </div>
  );
}

function I1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-3.5 top-2.5 w-5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg1 />
    </div>
  );
}

function Div9() {
  return (
    <div
      className="absolute bg-indigo-100 left-[228px] rounded-lg size-12 top-0.5"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <I1 />
    </div>
  );
}

function Div10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-[25px] top-[25px] w-[276px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div8 />
      <Div9 />
    </div>
  );
}

function Div11() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[102px] left-0 rounded-xl top-0 w-[326px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div10 />
    </div>
  );
}

function Div12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-0 top-0 w-[124.25px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-500 text-left top-[-1.2px] w-24">
        <p className="block leading-[20px]">Active Routine</p>
      </div>
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[18px] text-gray-800 text-left top-[19.08px] w-[125px]">
        <p className="block leading-[28px]">Full Body Split</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="h-5 relative shrink-0 w-[15px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 15 20"
      >
        <g id="Frame">
          <path d="M15 20H0V0H15V20Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.pf83100}
            fill="var(--fill-0, #16A34A)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-5 items-center justify-center left-0 p-0 top-[3.5px] w-[15px]"
      data-name="svg"
    >
      <Frame8 />
    </div>
  );
}

function I2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[16.5px] top-2.5 w-[15px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg2 />
    </div>
  );
}

function Div13() {
  return (
    <div
      className="absolute bg-green-100 left-[228px] rounded-lg size-12 top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <I2 />
    </div>
  );
}

function Div14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[25px] top-[25px] w-[276px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div12 />
      <Div13 />
    </div>
  );
}

function Div15() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[102px] left-[350px] rounded-xl top-0 w-[326px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div14 />
    </div>
  );
}

function Div16() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-0 top-0 w-[103.984px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-500 text-left top-[-1.2px] w-[103px]">
        <p className="block leading-[20px]">Avg Days/Week</p>
      </div>
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-0 not-italic text-[24px] text-gray-800 text-left top-[15.56px] w-[39px]">
        <p className="block leading-[32px]">4.2</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="h-5 relative shrink-0 w-[17.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 20"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_317)">
            <path
              d={svgPaths.p3b2c9980}
              fill="var(--fill-0, #D97706)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_317">
            <path d="M0 0H17.5V20H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-5 items-center justify-center left-0 p-0 top-[3.5px] w-[17.5px]"
      data-name="svg"
    >
      <Frame9 />
    </div>
  );
}

function I3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[15.25px] top-2.5 w-[17.5px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg3 />
    </div>
  );
}

function Div17() {
  return (
    <div
      className="absolute bg-amber-100 left-[228px] rounded-lg size-12 top-0.5"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <I3 />
    </div>
  );
}

function Div18() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-[25px] top-[25px] w-[276px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div16 />
      <Div17 />
    </div>
  );
}

function Div19() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[102px] left-[700px] rounded-xl top-0 w-[326px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div18 />
    </div>
  );
}

function Div20() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-0 top-0 w-[60.375px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-500 text-left top-[-1.2px] w-[61px]">
        <p className="block leading-[20px]">Favorites</p>
      </div>
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-0 not-italic text-[24px] text-gray-800 text-left top-[15.56px] w-4">
        <p className="block leading-[32px]">3</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 size-5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Frame">
          <path d="M20 20H0V0H20V20Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p3c291a00}
            fill="var(--fill-0, #DC2626)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg4() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-5 top-[3.5px]"
      data-name="svg"
    >
      <Frame10 />
    </div>
  );
}

function I4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-3.5 top-2.5 w-5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg4 />
    </div>
  );
}

function Div21() {
  return (
    <div
      className="absolute bg-red-100 left-[228px] rounded-lg size-12 top-0.5"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <I4 />
    </div>
  );
}

function Div22() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-[25px] top-[25px] w-[276px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div20 />
      <Div21 />
    </div>
  );
}

function Div23() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[102px] left-[1050px] rounded-xl top-0 w-[326px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div22 />
    </div>
  );
}

function Div24() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[102px] left-8 top-[220px] w-[1376px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div11 />
      <Div15 />
      <Div19 />
      <Div23 />
    </div>
  );
}

function Span() {
  return (
    <div
      className="absolute bg-indigo-100 h-[23px] left-0 rounded-[9999px] top-0.5 w-[52.172px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-4 leading-[0] left-2 not-italic text-[12px] text-indigo-700 text-left top-[3.28px] w-[37px]">
        <p className="block leading-[normal]">Active</p>
      </div>
    </div>
  );
}

function Div25() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[605.828px] top-[18px] w-[52.172px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span />
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-3.5 relative shrink-0 w-[12.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_335)">
            <path
              d={svgPaths.p33de6c80}
              fill="var(--fill-0, #4B5563)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_335">
            <path d="M0 0H12.25V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 overflow-clip p-0 top-[2.75px] w-[12.25px]"
      data-name="Frame"
    >
      <Frame11 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="h-3.5 relative shrink-0 w-[17.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 14"
      >
        <g id="Frame">
          <path d="M17.5 14H0V0H17.5V14Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p41e6200}
            fill="var(--fill-0, #4B5563)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-[108.578px] overflow-clip p-0 top-[2.75px] w-[17.5px]"
      data-name="Frame"
    >
      <Frame13 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[1.66%]" data-name="Group">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Group">
          <path
            d={svgPaths.pf719280}
            fill="var(--fill-0, #4B5563)"
            id="Vector"
          />
          <path
            d={svgPaths.p289c1b00}
            fill="var(--fill-0, #4B5563)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p24799600}
            fill="var(--fill-0, #4B5563)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p39002100}
            fill="var(--fill-0, #4B5563)"
            id="Vector_4"
            opacity="0"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] relative shrink-0 size-3.5"
      data-name="Frame"
    >
      <div className="overflow-clip relative size-3.5">
        <Group />
      </div>
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame16() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[221.062px] overflow-clip p-0 size-3.5 top-[2.75px]"
      data-name="Frame"
    >
      <Frame15 />
    </div>
  );
}

function Div26() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-9 w-[624px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-[16.25px] not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[85px]">
        <p className="block leading-[20px]">3 days/week</p>
      </div>
      <Frame12 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-[130.078px] not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[84px]">
        <p className="block leading-[20px]">Intermediate</p>
      </div>
      <Frame14 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-[239.062px] not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[84px]">
        <p className="block leading-[20px]">Hypertrophy</p>
      </div>
      <Frame16 />
    </div>
  );
}

function Div27() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-[26px] top-[26px] w-[624px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[20px] text-gray-800 text-left top-[-2.2px] w-[138px]">
        <p className="block leading-[28px]">Full Body Split</p>
      </div>
      <Div26 />
    </div>
  );
}

function Div28() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[26px] top-[98px] w-[624px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-0 not-italic text-[14px] text-gray-600 text-left top-[0.6px] w-[566px]">
        <p className="block leading-[20px]">
          A comprehensive full-body workout targeting all major muscle groups
          with compound movements.
        </p>
      </div>
    </div>
  );
}

function Div29() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[624px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[-1.2px] w-[119px]">
        <p className="block leading-[20px]">Weekly Schedule:</p>
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div
      className="absolute bg-green-100 left-0 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[9.609px] not-italic text-[14px] text-green-700 text-left top-[5.9px] w-[13px]">
        <p className="block leading-[normal]">M</p>
      </div>
    </div>
  );
}

function Span2() {
  return (
    <div
      className="absolute bg-gray-200 left-10 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[11.469px] not-italic text-[14px] text-gray-500 text-left top-[5.9px] w-[9px]">
        <p className="block leading-[normal]">T</p>
      </div>
    </div>
  );
}

function Span3() {
  return (
    <div
      className="absolute bg-green-100 left-20 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[8.969px] not-italic text-[14px] text-green-700 text-left top-[5.9px] w-3.5">
        <p className="block leading-[normal]">W</p>
      </div>
    </div>
  );
}

function Span4() {
  return (
    <div
      className="absolute bg-gray-200 left-[120px] rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[11.469px] not-italic text-[14px] text-gray-500 text-left top-[5.9px] w-[9px]">
        <p className="block leading-[normal]">T</p>
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div
      className="absolute bg-green-100 left-40 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[11.859px] not-italic text-[14px] text-green-700 text-left top-[5.9px] w-[9px]">
        <p className="block leading-[normal]">F</p>
      </div>
    </div>
  );
}

function Span6() {
  return (
    <div
      className="absolute bg-gray-200 left-[200px] rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[11.5px] not-italic text-[14px] text-gray-500 text-left top-[5.9px] w-[9px]">
        <p className="block leading-[normal]">S</p>
      </div>
    </div>
  );
}

function Span7() {
  return (
    <div
      className="absolute bg-gray-200 left-60 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[11.5px] not-italic text-[14px] text-gray-500 text-left top-[5.9px] w-[9px]">
        <p className="block leading-[normal]">S</p>
      </div>
    </div>
  );
}

function Div30() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-7 w-[624px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span1 />
      <Span2 />
      <Span3 />
      <Span4 />
      <Span5 />
      <Span6 />
      <Span7 />
    </div>
  );
}

function Div31() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[60px] left-[26px] top-[154px] w-[624px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div29 />
      <Div30 />
    </div>
  );
}

function Div32() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[624px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[59px]">
        <p className="block leading-[20px]">Progress</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[543.422px] not-italic text-[14px] text-gray-800 text-left top-[-1.2px] w-20">
        <p className="block leading-[20px]">Week 4 of 8</p>
      </div>
    </div>
  );
}

function Div33() {
  return (
    <div
      className="absolute bg-indigo-600 h-2 left-0 rounded-[9999px] top-0 w-[312px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Div34() {
  return (
    <div
      className="absolute bg-gray-200 h-2 left-0 rounded-[9999px] top-7 w-[624px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Div33 />
    </div>
  );
}

function Div35() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[26px] top-[230px] w-[624px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div32 />
      <Div34 />
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute bg-indigo-600 h-[42px] left-0 rounded-md top-0 w-[528px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[264.719px] not-italic text-[#ffffff] text-[14px] text-center top-[10.9px] translate-x-[-50%] w-[94px]">
        <p className="block leading-[normal]">Start Workout</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_311)">
            <path
              d={svgPaths.p37081400}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_311">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[13px] overflow-clip p-0 size-4 top-[13px]"
      data-name="Frame"
    >
      <Frame17 />
    </div>
  );
}

function Button3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[540px] rounded-md size-[42px] top-0"
      data-name="button"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame18 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="h-4 relative shrink-0 w-1" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 4 16"
      >
        <g id="Frame">
          <path d="M4 16H0V0H4V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p1483c000}
            fill="var(--fill-0, #374151)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[13px] overflow-clip p-0 top-[13px] w-1"
      data-name="Frame"
    >
      <Frame19 />
    </div>
  );
}

function Button4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-[594px] rounded-md top-0 w-[30px]"
      data-name="button"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame20 />
    </div>
  );
}

function Div36() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-[26px] top-[290px] w-[624px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Div37() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[358px] left-0 rounded-xl top-0 w-[676px]"
      data-name="div"
    >
      <div className="absolute border-2 border-indigo-500 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div25 />
      <Div27 />
      <Div28 />
      <Div31 />
      <Div35 />
      <Div36 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <path d="M16 16H0V0H16V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p26e94600}
            fill="var(--fill-0, #9CA3AF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame22() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-1"
      data-name="Frame"
    >
      <Frame21 />
    </div>
  );
}

function Button5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[610px] top-0 w-4"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame22 />
    </div>
  );
}

function Div38() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[25px] top-[25px] w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[20px] text-gray-800 text-left top-[-2.48px] w-[177px]">
        <p className="block leading-[28px]">Upper/Lower Split</p>
      </div>
      <Button5 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="h-3.5 relative shrink-0 w-[12.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_335)">
            <path
              d={svgPaths.p33de6c80}
              fill="var(--fill-0, #4B5563)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_335">
            <path d="M0 0H12.25V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame24() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 overflow-clip p-0 top-[2.75px] w-[12.25px]"
      data-name="Frame"
    >
      <Frame23 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="h-3.5 relative shrink-0 w-[17.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 14"
      >
        <g id="Frame">
          <path d="M17.5 14H0V0H17.5V14Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p41e6200}
            fill="var(--fill-0, #4B5563)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame26() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-[116.984px] overflow-clip p-0 top-[2.75px] w-[17.5px]"
      data-name="Frame"
    >
      <Frame25 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[1.66%]" data-name="Group">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Group">
          <path
            d={svgPaths.pf719280}
            fill="var(--fill-0, #4B5563)"
            id="Vector"
          />
          <path
            d={svgPaths.p289c1b00}
            fill="var(--fill-0, #4B5563)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p24799600}
            fill="var(--fill-0, #4B5563)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p39002100}
            fill="var(--fill-0, #4B5563)"
            id="Vector_4"
            opacity="0"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame27() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] relative shrink-0 size-3.5"
      data-name="Frame"
    >
      <div className="overflow-clip relative size-3.5">
        <Group1 />
      </div>
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame28() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[221.453px] overflow-clip p-0 size-3.5 top-[2.75px]"
      data-name="Frame"
    >
      <Frame27 />
    </div>
  );
}

function Div39() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[25px] top-[69px] w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-[16.25px] not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[85px]">
        <p className="block leading-[20px]">4 days/week</p>
      </div>
      <Frame24 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-[138.484px] not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[67px]">
        <p className="block leading-[20px]">Advanced</p>
      </div>
      <Frame26 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-[239.453px] not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[58px]">
        <p className="block leading-[20px]">Strength</p>
      </div>
      <Frame28 />
    </div>
  );
}

function Div40() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[25px] top-[105px] w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-0 not-italic text-[14px] text-gray-600 text-left top-[0.6px] w-[567px]">
        <p className="block leading-[20px]">
          Split routine focusing on upper body and lower body on alternating
          days for maximum recovery.
        </p>
      </div>
    </div>
  );
}

function Span8() {
  return (
    <div
      className="absolute bg-green-100 left-0 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[9.609px] not-italic text-[14px] text-green-700 text-left top-[5.9px] w-[13px]">
        <p className="block leading-[normal]">M</p>
      </div>
    </div>
  );
}

function Span9() {
  return (
    <div
      className="absolute bg-green-100 left-10 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[11.422px] not-italic text-[14px] text-green-700 text-left top-[5.9px] w-2.5">
        <p className="block leading-[normal]">T</p>
      </div>
    </div>
  );
}

function Span10() {
  return (
    <div
      className="absolute bg-gray-200 left-20 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[9.094px] not-italic text-[14px] text-gray-500 text-left top-[5.9px] w-3.5">
        <p className="block leading-[normal]">W</p>
      </div>
    </div>
  );
}

function Span11() {
  return (
    <div
      className="absolute bg-green-100 left-[120px] rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[11.422px] not-italic text-[14px] text-green-700 text-left top-[5.9px] w-2.5">
        <p className="block leading-[normal]">T</p>
      </div>
    </div>
  );
}

function Span12() {
  return (
    <div
      className="absolute bg-green-100 left-40 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[11.859px] not-italic text-[14px] text-green-700 text-left top-[5.9px] w-[9px]">
        <p className="block leading-[normal]">F</p>
      </div>
    </div>
  );
}

function Span13() {
  return (
    <div
      className="absolute bg-gray-200 left-[200px] rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[11.5px] not-italic text-[14px] text-gray-500 text-left top-[5.9px] w-[9px]">
        <p className="block leading-[normal]">S</p>
      </div>
    </div>
  );
}

function Span14() {
  return (
    <div
      className="absolute bg-gray-200 left-60 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[11.5px] not-italic text-[14px] text-gray-500 text-left top-[5.9px] w-[9px]">
        <p className="block leading-[normal]">S</p>
      </div>
    </div>
  );
}

function Div41() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span8 />
      <Span9 />
      <Span10 />
      <Span11 />
      <Span12 />
      <Span13 />
      <Span14 />
    </div>
  );
}

function Div42() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[25px] top-[161px] w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div41 />
    </div>
  );
}

function Div43() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[67px]">
        <p className="block leading-[20px]">Last Used</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[541.625px] not-italic text-[14px] text-gray-800 text-left top-[-1.2px] w-[85px]">
        <p className="block leading-[20px]">2 weeks ago</p>
      </div>
    </div>
  );
}

function Div44() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[25px] top-[209px] w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div43 />
    </div>
  );
}

function Button6() {
  return (
    <div
      className="absolute bg-gray-100 h-[42px] left-0 rounded-md top-0 w-[530px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[265.516px] not-italic text-[14px] text-center text-gray-700 top-[10.9px] translate-x-[-50%] w-14">
        <p className="block leading-[normal]">Activate</p>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_311)">
            <path
              d={svgPaths.p37081400}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_311">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame30() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[13px] overflow-clip p-0 size-4 top-[13px]"
      data-name="Frame"
    >
      <Frame29 />
    </div>
  );
}

function Button7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[542px] rounded-md size-[42px] top-0"
      data-name="button"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame30 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="h-4 relative shrink-0 w-1" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 4 16"
      >
        <g id="Frame">
          <path d="M4 16H0V0H4V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p1483c000}
            fill="var(--fill-0, #374151)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame32() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[13px] overflow-clip p-0 top-[13px] w-1"
      data-name="Frame"
    >
      <Frame31 />
    </div>
  );
}

function Button8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-[596px] rounded-md top-0 w-[30px]"
      data-name="button"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame32 />
    </div>
  );
}

function Div45() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-[25px] top-[253px] w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Div46() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[358px] left-[700px] rounded-xl top-0 w-[676px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div38 />
      <Div39 />
      <Div40 />
      <Div42 />
      <Div44 />
      <Div45 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <path d="M16 16H0V0H16V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.pd2c0e00}
            fill="var(--fill-0, #EF4444)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-1"
      data-name="Frame"
    >
      <Frame33 />
    </div>
  );
}

function Button9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[610px] top-0 w-4"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame34 />
    </div>
  );
}

function Div47() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[25px] top-[25px] w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[20px] text-gray-800 text-left top-[-2.48px] w-[149px]">
        <p className="block leading-[28px]">Push/Pull/Legs</p>
      </div>
      <Button9 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="h-3.5 relative shrink-0 w-[12.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_335)">
            <path
              d={svgPaths.p33de6c80}
              fill="var(--fill-0, #4B5563)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_335">
            <path d="M0 0H12.25V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 overflow-clip p-0 top-[2.75px] w-[12.25px]"
      data-name="Frame"
    >
      <Frame35 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="h-3.5 relative shrink-0 w-[17.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 14"
      >
        <g id="Frame">
          <path d="M17.5 14H0V0H17.5V14Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p41e6200}
            fill="var(--fill-0, #4B5563)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame38() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-[116.625px] overflow-clip p-0 top-[2.75px] w-[17.5px]"
      data-name="Frame"
    >
      <Frame37 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[1.66%]" data-name="Group">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Group">
          <path
            d={svgPaths.pf719280}
            fill="var(--fill-0, #4B5563)"
            id="Vector"
          />
          <path
            d={svgPaths.p289c1b00}
            fill="var(--fill-0, #4B5563)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p24799600}
            fill="var(--fill-0, #4B5563)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p39002100}
            fill="var(--fill-0, #4B5563)"
            id="Vector_4"
            opacity="0"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame39() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] relative shrink-0 size-3.5"
      data-name="Frame"
    >
      <div className="overflow-clip relative size-3.5">
        <Group2 />
      </div>
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame40() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[221.094px] overflow-clip p-0 size-3.5 top-[2.75px]"
      data-name="Frame"
    >
      <Frame39 />
    </div>
  );
}

function Div48() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[25px] top-[69px] w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-[16.25px] not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[85px]">
        <p className="block leading-[20px]">6 days/week</p>
      </div>
      <Frame36 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-[138.125px] not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[67px]">
        <p className="block leading-[20px]">Advanced</p>
      </div>
      <Frame38 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-[239.094px] not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[84px]">
        <p className="block leading-[20px]">Hypertrophy</p>
      </div>
      <Frame40 />
    </div>
  );
}

function Div49() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[25px] top-[105px] w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[609px]">
        <p className="block leading-[20px]">
          High-frequency training split targeting push muscles, pull muscles,
          and legs twice per week.
        </p>
      </div>
    </div>
  );
}

function Span15() {
  return (
    <div
      className="absolute bg-green-100 left-0 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[9.609px] not-italic text-[14px] text-green-700 text-left top-[5.9px] w-[13px]">
        <p className="block leading-[normal]">M</p>
      </div>
    </div>
  );
}

function Span16() {
  return (
    <div
      className="absolute bg-green-100 left-10 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[11.422px] not-italic text-[14px] text-green-700 text-left top-[5.9px] w-2.5">
        <p className="block leading-[normal]">T</p>
      </div>
    </div>
  );
}

function Span17() {
  return (
    <div
      className="absolute bg-green-100 left-20 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[8.969px] not-italic text-[14px] text-green-700 text-left top-[5.9px] w-3.5">
        <p className="block leading-[normal]">W</p>
      </div>
    </div>
  );
}

function Span18() {
  return (
    <div
      className="absolute bg-green-100 left-[120px] rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[11.422px] not-italic text-[14px] text-green-700 text-left top-[5.9px] w-2.5">
        <p className="block leading-[normal]">T</p>
      </div>
    </div>
  );
}

function Span19() {
  return (
    <div
      className="absolute bg-green-100 left-40 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[11.859px] not-italic text-[14px] text-green-700 text-left top-[5.9px] w-[9px]">
        <p className="block leading-[normal]">F</p>
      </div>
    </div>
  );
}

function Span20() {
  return (
    <div
      className="absolute bg-gray-200 left-[200px] rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[11.5px] not-italic text-[14px] text-gray-500 text-left top-[5.9px] w-[9px]">
        <p className="block leading-[normal]">S</p>
      </div>
    </div>
  );
}

function Span21() {
  return (
    <div
      className="absolute bg-gray-200 left-60 rounded-[9999px] size-8 top-0"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[11.5px] not-italic text-[14px] text-gray-500 text-left top-[5.9px] w-[9px]">
        <p className="block leading-[normal]">S</p>
      </div>
    </div>
  );
}

function Div50() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span15 />
      <Span16 />
      <Span17 />
      <Span18 />
      <Span19 />
      <Span20 />
      <Span21 />
    </div>
  );
}

function Div51() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[25px] top-[141px] w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div50 />
    </div>
  );
}

function Div52() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[67px]">
        <p className="block leading-[20px]">Last Used</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[541.625px] not-italic text-[14px] text-gray-800 text-left top-[-1.2px] w-[85px]">
        <p className="block leading-[20px]">2 weeks ago</p>
      </div>
    </div>
  );
}

function Div53() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[25px] top-[189px] w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div52 />
    </div>
  );
}

function Button10() {
  return (
    <div
      className="absolute bg-gray-100 h-[42px] left-0 rounded-md top-0 w-[530px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[265.516px] not-italic text-[14px] text-center text-gray-700 top-[10.9px] translate-x-[-50%] w-14">
        <p className="block leading-[normal]">Activate</p>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_311)">
            <path
              d={svgPaths.p37081400}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_311">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame42() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[13px] overflow-clip p-0 size-4 top-[13px]"
      data-name="Frame"
    >
      <Frame41 />
    </div>
  );
}

function Button11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[542px] rounded-md size-[42px] top-0"
      data-name="button"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame42 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="h-4 relative shrink-0 w-1" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 4 16"
      >
        <g id="Frame">
          <path d="M4 16H0V0H4V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p1483c000}
            fill="var(--fill-0, #374151)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame44() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[13px] overflow-clip p-0 top-[13px] w-1"
      data-name="Frame"
    >
      <Frame43 />
    </div>
  );
}

function Button12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-[596px] rounded-md top-0 w-[30px]"
      data-name="button"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame44 />
    </div>
  );
}

function Div54() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-[25px] top-[233px] w-[626px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button10 />
      <Button11 />
      <Button12 />
    </div>
  );
}

function Div55() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[300px] left-0 rounded-xl top-[382px] w-[676px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div47 />
      <Div48 />
      <Div49 />
      <Div51 />
      <Div53 />
      <Div54 />
    </div>
  );
}

function Div56() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[682px] left-8 top-[354px] w-[1376px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div37 />
      <Div46 />
      <Div55 />
    </div>
  );
}

function Div57() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1060px] left-0 top-[65px] w-[1440px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div1 />
      <Div7 />
      <Div24 />
      <Div56 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="h-[18px] relative shrink-0 w-[13.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 18"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_431)">
            <path
              d={svgPaths.p2e458f70}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_431">
            <path d="M0 0H13.5V18H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame46() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[9.25px] overflow-clip p-0 top-[6.25px] w-[13.5px]"
      data-name="Frame"
    >
      <Frame45 />
    </div>
  );
}

function Div58() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[#4f46e5] left-0 rounded-md size-8 to-[#3730a3] top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame46 />
    </div>
  );
}

function Div59() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-[3px] w-[157.062px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div58 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-10 not-italic text-[20px] text-gray-800 text-left top-[0.08px] w-[118px]">
        <p className="block leading-[28px]">Peak Health</p>
      </div>
    </div>
  );
}

function Span22() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-[249.234px] top-0 w-[82.234px]"
      data-name="span"
    >
      <div className="absolute border-[0px_0px_2px] border-indigo-600 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-3 not-italic text-[14px] text-indigo-600 text-left top-[7.9px] w-[59px]">
        <p className="block leading-[normal]">Routines</p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-[189.062px] top-0 w-[565.469px]"
      data-name="nav"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-[38px] leading-[0] left-3 not-italic text-[14px] text-gray-700 text-left top-[6.91px] w-[74px]">
        <p className="block leading-[20px]">Dashboard</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-[38px] leading-[0] left-[141.016px] not-italic text-[14px] text-gray-700 text-left top-[6.91px] w-16">
        <p className="block leading-[20px]">Exercises</p>
      </div>
      <Span22 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-[38px] leading-[0] left-[375.469px] not-italic text-[14px] text-gray-700 text-left top-[6.91px] w-[61px]">
        <p className="block leading-[20px]">Calendar</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-[38px] leading-[0] left-[491.891px] not-italic text-[14px] text-gray-700 text-left top-[6.91px] w-[63px]">
        <p className="block leading-[20px]">Statistics</p>
      </div>
    </div>
  );
}

function Div60() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-0 top-[13px] w-[754.531px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div59 />
      <Nav />
    </div>
  );
}

function Frame47() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p2cd26500}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-3.5"
      data-name="svg"
    >
      <Frame47 />
    </div>
  );
}

function I5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-4 top-2 w-3.5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg5 />
    </div>
  );
}

function Span23() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[38px] top-2 w-[111.828px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[56.5px] not-italic text-[#ffffff] text-[16px] text-center top-[0.56px] translate-x-[-50%] w-[113px]">
        <p className="block leading-[normal]">Create Routine</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div
      className="absolute bg-indigo-600 h-10 left-0 rounded-md top-0.5 w-[165.828px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I5 />
      <Span23 />
    </div>
  );
}

function Span24() {
  return (
    <div
      className="absolute bg-red-500 left-[17.5px] rounded-[9999px] size-5 top-[-4px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[10.281px] not-italic text-[#ffffff] text-[12px] text-center top-[1.28px] translate-x-[-50%] w-2">
        <p className="block leading-[normal]">3</p>
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="h-5 relative shrink-0 w-[17.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 20"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_950)">
            <path
              d={svgPaths.p9ed0800}
              fill="var(--fill-0, #4B5563)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_950">
            <path d="M0 0H17.5V20H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame49() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-5 items-center justify-center left-2 overflow-clip p-0 top-[11.5px] w-[17.5px]"
      data-name="Frame"
    >
      <Frame48 />
    </div>
  );
}

function Button14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-0 top-0 w-[33.5px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span24 />
      <Frame49 />
    </div>
  );
}

function Div61() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-[181.828px] top-0 w-[33.5px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button14 />
    </div>
  );
}

function Img() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat left-0 rounded-[9999px] size-8 top-0.5"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg}')` }}
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Div62() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-11 top-0 w-[84.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-800 text-left top-[-1.2px] w-[84px]">
        <p className="block leading-[20px]">Alex Morgan</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-[18.56px] w-[70px]">
        <p className="block leading-[16px]">Pro Member</p>
      </div>
    </div>
  );
}

function Div63() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[231.328px] top-1 w-[128.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Img />
      <Div62 />
    </div>
  );
}

function Div64() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-[1016.33px] top-2.5 w-[359.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button13 />
      <Div61 />
      <Div63 />
    </div>
  );
}

function Div65() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-8 top-0 w-[1376px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div60 />
      <Div64 />
    </div>
  );
}

function Div66() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-0 top-0 w-[1440px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div65 />
    </div>
  );
}

function Header() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[65px] left-0 top-0 w-[1440px]"
      data-name="header"
    >
      <div className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div66 />
    </div>
  );
}

function Body() {
  return (
    <div
      className="bg-gray-50 h-[1125px] relative shrink-0 w-[1440px]"
      data-name="body"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div57 />
      <Header />
    </div>
  );
}

export default function RoutinesView() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-lg size-full"
      data-name="Routines view"
    >
      <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative size-full">
        <Body />
      </div>
      <div className="absolute border-2 border-[#ced4da] border-solid inset-0 pointer-events-none rounded-lg" />
    </div>
  );
}