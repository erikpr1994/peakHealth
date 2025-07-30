import svgPaths from "./svg-nk6aas7fy1";
import imgImg from "figma:asset/410c340aa057242400c608368f918307cdd72438.png";

function Div() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-8 top-6 w-[1376px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-9 leading-[0] left-0 not-italic text-[30px] text-gray-800 text-left top-[-7.92px] w-[161px]">
        <p className="block leading-[36px]">Dashboard</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-500 text-left top-[39.12px] w-[378px]">
        <p className="block leading-[24px]">{`Welcome back, Alex. Here's your fitness overview.`}</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_998)">
            <path
              d={svgPaths.pb3c1600}
              fill="var(--fill-0, #4F46E5)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_998">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0.5 w-3.5"
      data-name="svg"
    >
      <Frame />
    </div>
  );
}

function I() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-2 top-2.5 w-3.5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg />
    </div>
  );
}

function Div1() {
  return (
    <div
      className="absolute bg-indigo-100 h-10 left-[246px] rounded-md top-0 w-[30px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I />
    </div>
  );
}

function Div2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[25px] top-[25px] w-[276px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-gray-500 text-left top-[7.12px] w-[161px]">
        <p className="block leading-[24px]">Workouts Completed</p>
      </div>
      <Div1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-3.5 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_977)">
            <path
              d={svgPaths.p3b9d19f2}
              fill="var(--fill-0, #16A34A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_977">
            <path d="M0 0H10.5V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 overflow-clip p-0 top-[38.75px] w-[10.5px]"
      data-name="Frame"
    >
      <Frame1 />
    </div>
  );
}

function Div3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-0 top-0 w-[150.188px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-9 leading-[0] left-0 not-italic text-[30px] text-gray-800 text-left top-[-7.92px] w-[39px]">
        <p className="block leading-[36px]">24</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-[14.5px] not-italic text-[14px] text-green-600 text-left top-[34.8px] w-[135px]">
        <p className="block leading-[20px]">12% from last month</p>
      </div>
      <Frame2 />
    </div>
  );
}

function Div4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-px left-0 top-0 w-24"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Div5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[180px] top-2 w-24"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div4 />
    </div>
  );
}

function Div6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-[25px] top-[81px] w-[276px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div3 />
      <Div5 />
    </div>
  );
}

function Div7() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[162px] left-0 rounded-xl top-0 w-[326px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div2 />
      <Div6 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_989)">
            <path
              d={svgPaths.p803d900}
              fill="var(--fill-0, #16A34A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_989">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-4 top-0.5"
      data-name="svg"
    >
      <Frame3 />
    </div>
  );
}

function I1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-2 top-2.5 w-4"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg1 />
    </div>
  );
}

function Div8() {
  return (
    <div
      className="absolute bg-green-100 h-10 left-[244px] rounded-md top-0 w-8"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I1 />
    </div>
  );
}

function Div9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[25px] top-[25px] w-[276px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-gray-500 text-left top-[7.12px] w-[114px]">
        <p className="block leading-[24px]">Active Minutes</p>
      </div>
      <Div8 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-3.5 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_977)">
            <path
              d={svgPaths.p3b9d19f2}
              fill="var(--fill-0, #16A34A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_977">
            <path d="M0 0H10.5V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 overflow-clip p-0 top-[38.75px] w-[10.5px]"
      data-name="Frame"
    >
      <Frame4 />
    </div>
  );
}

function Div10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-0 top-0 w-[138.047px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-9 leading-[0] left-0 not-italic text-[30px] text-gray-800 text-left top-[-7.92px] w-[60px]">
        <p className="block leading-[36px]">342</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-[14.5px] not-italic text-[14px] text-green-600 text-left top-[34.8px] w-[121px]">
        <p className="block leading-[20px]">8% from last week</p>
      </div>
      <Frame5 />
    </div>
  );
}

function Div11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-px left-0 top-0 w-24"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Div12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[180px] top-2 w-24"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div11 />
    </div>
  );
}

function Div13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-[25px] top-[81px] w-[276px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div10 />
      <Div12 />
    </div>
  );
}

function Div14() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[162px] left-[350px] rounded-xl top-0 w-[326px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div9 />
      <Div13 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_983)">
            <path
              d={svgPaths.p1fe74780}
              fill="var(--fill-0, #EA580C)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_983">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0.5 w-3.5"
      data-name="svg"
    >
      <Frame6 />
    </div>
  );
}

function I2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-2 top-2.5 w-3.5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg2 />
    </div>
  );
}

function Div15() {
  return (
    <div
      className="absolute bg-orange-100 h-10 left-[246px] rounded-md top-0 w-[30px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I2 />
    </div>
  );
}

function Div16() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[25px] top-[25px] w-[276px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-gray-500 text-left top-[7.12px] w-[122px]">
        <p className="block leading-[24px]">Calories Burned</p>
      </div>
      <Div15 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-3.5 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_1266)">
            <path
              d={svgPaths.p1432cb00}
              fill="var(--fill-0, #DC2626)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1266">
            <path d="M0 0H10.5V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 overflow-clip p-0 top-[38.75px] w-[10.5px]"
      data-name="Frame"
    >
      <Frame7 />
    </div>
  );
}

function Div17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-0 top-0 w-[138.031px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-9 leading-[0] left-0 not-italic text-[30px] text-gray-800 text-left top-[-7.92px] w-[87px]">
        <p className="block leading-[36px]">8,942</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-[14.5px] not-italic text-[14px] text-left text-red-600 top-[34.8px] w-[122px]">
        <p className="block leading-[20px]">3% from last week</p>
      </div>
      <Frame8 />
    </div>
  );
}

function Div18() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-px left-0 top-0 w-24"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Div19() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[180px] top-2 w-24"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div18 />
    </div>
  );
}

function Div20() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-[25px] top-[81px] w-[276px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div17 />
      <Div19 />
    </div>
  );
}

function Div21() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[162px] left-[700px] rounded-xl top-0 w-[326px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div16 />
      <Div20 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_1257)">
            <path
              d={svgPaths.p2b24dd00}
              fill="var(--fill-0, #9333EA)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1257">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-4 top-0.5"
      data-name="svg"
    >
      <Frame9 />
    </div>
  );
}

function I3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-2 top-2.5 w-4"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg3 />
    </div>
  );
}

function Div22() {
  return (
    <div
      className="absolute bg-purple-100 h-10 left-[244px] rounded-md top-0 w-8"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I3 />
    </div>
  );
}

function Div23() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[25px] top-[25px] w-[276px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-gray-500 text-left top-[7.12px] w-28">
        <p className="block leading-[24px]">Current Streak</p>
      </div>
      <Div22 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="h-3.5 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_977)">
            <path
              d={svgPaths.p3b9d19f2}
              fill="var(--fill-0, #16A34A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_977">
            <path d="M0 0H10.5V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 overflow-clip p-0 top-[38.75px] w-[10.5px]"
      data-name="Frame"
    >
      <Frame10 />
    </div>
  );
}

function Div24() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-0 top-0 w-[101.938px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-9 leading-[0] left-0 not-italic text-[30px] text-gray-800 text-left top-[-7.92px] w-[98px]">
        <p className="block leading-[36px]">6 days</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-[14.5px] not-italic text-[14px] text-green-600 text-left top-[34.8px] w-[89px]">
        <p className="block leading-[20px]">Best: 14 days</p>
      </div>
      <Frame11 />
    </div>
  );
}

function Div25() {
  return (
    <div
      className="absolute bg-indigo-600 h-8 left-0 rounded-sm top-0 w-4"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div26() {
  return (
    <div
      className="absolute bg-indigo-600 h-10 left-5 rounded-sm top-0 w-4"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div27() {
  return (
    <div
      className="absolute bg-indigo-600 h-6 left-10 rounded-sm top-0 w-4"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div28() {
  return (
    <div
      className="absolute bg-indigo-600 h-12 left-[60px] rounded-sm top-0 w-4"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div29() {
  return (
    <div
      className="absolute bg-indigo-600 h-8 left-20 rounded-sm top-0 w-4"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div30() {
  return (
    <div
      className="absolute bg-indigo-600 h-10 left-[100px] rounded-sm top-0 w-4"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div31() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-40 top-2 w-[116px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div25 />
      <Div26 />
      <Div27 />
      <Div28 />
      <Div29 />
      <Div30 />
    </div>
  );
}

function Div32() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-[25px] top-[81px] w-[276px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div24 />
      <Div31 />
    </div>
  );
}

function Div33() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[162px] left-[1050px] rounded-xl top-0 w-[326px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div23 />
      <Div32 />
    </div>
  );
}

function Section() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[162px] left-8 top-[120px] w-[1376px]"
      data-name="section"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div7 />
      <Div14 />
      <Div21 />
      <Div33 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_1260)">
            <path
              d={svgPaths.p1865080}
              fill="var(--fill-0, #4F46E5)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1260">
            <path d="M0 0H14V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg4() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-3.5 top-[1.75px]"
      data-name="svg"
    >
      <Frame12 />
    </div>
  );
}

function I4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[17px] left-3 top-[5px] w-3.5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg4 />
    </div>
  );
}

function Span() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[17px] left-[29.938px] top-[5px] w-[48.422px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-6 not-italic text-[14px] text-center text-indigo-600 top-[-1.1px] translate-x-[-50%] w-12">
        <p className="block leading-[normal]">Weekly</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div
      className="absolute bg-indigo-50 h-7 left-0 rounded-md top-0 w-[90.359px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I4 />
      <Span />
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_1263)">
            <path
              d={svgPaths.p1865080}
              fill="var(--fill-0, #6B7280)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1263">
            <path d="M0 0H14V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-3 overflow-clip p-0 size-3.5 top-[6.75px]"
      data-name="Frame"
    >
      <Frame13 />
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[98.359px] rounded-md top-0 w-[95.438px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame14 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[56.938px] not-italic text-[14px] text-center text-gray-500 top-[2.8px] translate-x-[-50%] w-[54px]">
        <p className="block leading-[20px]">Monthly</p>
      </div>
    </div>
  );
}

function Div34() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[665.531px] top-0 w-[193.797px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button />
      <Button1 />
    </div>
  );
}

function Div35() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[25px] top-[25px] w-[859.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[18px] text-gray-800 text-left top-[-0.64px] w-[149px]">
        <p className="block leading-[28px]">Weekly Progress</p>
      </div>
      <Div34 />
    </div>
  );
}

function Div36() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[280px] left-[25px] top-[77px] w-[859.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Div37() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[382px] left-0 rounded-xl top-0 w-[909.328px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div35 />
      <Div36 />
    </div>
  );
}

function Frame15() {
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
            fill="var(--fill-0, #9CA3AF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-1"
      data-name="Frame"
    >
      <Frame15 />
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[388.656px] top-0.5 w-1"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame16 />
    </div>
  );
}

function Div38() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[25px] top-[25px] w-[392.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[18px] text-gray-800 text-left top-[-0.92px] w-[184px]">
        <p className="block leading-[28px]">Workout Distribution</p>
      </div>
      <Button2 />
    </div>
  );
}

function Div39() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[280px] left-[25px] top-[77px] w-[392.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Div40() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[382px] left-[933.328px] rounded-xl top-0 w-[442.656px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div38 />
      <Div39 />
    </div>
  );
}

function Section1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[382px] left-8 top-[314px] w-[1376px]"
      data-name="section"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div37 />
      <Div40 />
    </div>
  );
}

function Div41() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[25px] top-[25px] w-[859.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[18px] text-gray-800 text-left top-[-0.92px] w-[177px]">
        <p className="block leading-[28px]">Upcoming Trainings</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[762.125px] not-italic text-[14px] text-indigo-600 text-left top-[2.8px] w-[98px]">
        <p className="block leading-[20px]">View Calendar</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="h-4 relative shrink-0 w-5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 16"
      >
        <g id="Frame">
          <path d="M20 16H0V0H20V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p12718500}
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
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0.5 w-5"
      data-name="svg"
    >
      <Frame17 />
    </div>
  );
}

function I5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-3 size-5 top-3.5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg5 />
    </div>
  );
}

function Div42() {
  return (
    <div
      className="absolute bg-indigo-600 h-12 left-[17px] rounded-md top-[17px] w-11"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I5 />
    </div>
  );
}

function Div43() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-0 top-0 w-[172.219px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-800 text-left top-[-0.88px] w-[165px]">
        <p className="block leading-[24px]">Upper Body Strength</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-600 text-left top-[22.8px] w-[174px]">
        <p className="block leading-[20px]">45 minutes • Intermediate</p>
      </div>
    </div>
  );
}

function Div44() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-0 top-0 w-[765.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div43 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[709.328px] not-italic text-[14px] text-indigo-600 text-left top-[-1.2px] w-14">
        <p className="block leading-[20px]">5:30 PM</p>
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div
      className="absolute bg-indigo-100 h-6 left-0 rounded top-0 w-[49.125px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-2 not-italic text-[12px] text-indigo-700 text-left top-[3.28px] w-[34px]">
        <p className="block leading-[normal]">Chest</p>
      </div>
    </div>
  );
}

function Span2() {
  return (
    <div
      className="absolute bg-indigo-100 h-6 left-[61.125px] rounded top-0 w-[73.188px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-2 not-italic text-[12px] text-indigo-700 text-left top-[3.28px] w-[57px]">
        <p className="block leading-[normal]">Shoulders</p>
      </div>
    </div>
  );
}

function Span3() {
  return (
    <div
      className="absolute bg-indigo-100 h-6 left-[146.312px] rounded top-0 w-[58.141px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-2 not-italic text-[12px] text-indigo-700 text-left top-[3.28px] w-[42px]">
        <p className="block leading-[normal]">Triceps</p>
      </div>
    </div>
  );
}

function Div45() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-14 w-[765.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span1 />
      <Span2 />
      <Span3 />
    </div>
  );
}

function Div46() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-20 left-[77px] top-[17px] w-[765.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div44 />
      <Div45 />
    </div>
  );
}

function Div47() {
  return (
    <div
      className="absolute bg-indigo-50 h-[114px] left-0 rounded-lg top-8 w-[859.328px]"
      data-name="div"
    >
      <div className="absolute border border-indigo-100 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div42 />
      <Div46 />
    </div>
  );
}

function Div48() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[146px] left-0 top-0 w-[859.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-500 text-left top-[-1.2px] w-[116px]">
        <p className="block leading-[20px]">TODAY - JULY 13</p>
      </div>
      <Div47 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_1251)">
            <path
              d={svgPaths.p2645e2c0}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1251">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg6() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0.5 w-3.5"
      data-name="svg"
    >
      <Frame18 />
    </div>
  );
}

function I6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-3 top-3.5 w-3.5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg6 />
    </div>
  );
}

function Div49() {
  return (
    <div
      className="absolute bg-green-600 h-12 left-[17px] rounded-md top-[17px] w-[38px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I6 />
    </div>
  );
}

function Div50() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-0 top-0 w-[156.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-800 text-left top-[-1.12px] w-[88px]">
        <p className="block leading-[24px]">HIIT Cardio</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-600 text-left top-[22.8px] w-[157px]">
        <p className="block leading-[20px]">30 minutes • Advanced</p>
      </div>
    </div>
  );
}

function Div51() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-0 top-0 w-[771.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div50 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[715.047px] not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-14">
        <p className="block leading-[20px]">7:00 AM</p>
      </div>
    </div>
  );
}

function Span4() {
  return (
    <div
      className="absolute bg-gray-100 h-6 left-0 rounded top-0 w-[53.281px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-2 not-italic text-[12px] text-gray-700 text-left top-[3.28px] w-[38px]">
        <p className="block leading-[normal]">Cardio</p>
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div
      className="absolute bg-gray-100 h-6 left-[65.281px] rounded top-0 w-[68.172px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-2 not-italic text-[12px] text-gray-700 text-left top-[3.28px] w-[52px]">
        <p className="block leading-[normal]">Full Body</p>
      </div>
    </div>
  );
}

function Div52() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-14 w-[771.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span4 />
      <Span5 />
    </div>
  );
}

function Div53() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-20 left-[71px] top-[17px] w-[771.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div51 />
      <Div52 />
    </div>
  );
}

function Div54() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[114px] left-0 rounded-lg top-8 w-[859.328px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div49 />
      <Div53 />
    </div>
  );
}

function Div55() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[146px] left-0 top-[162px] w-[859.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-500 text-left top-[-1.2px] w-[154px]">
        <p className="block leading-[20px]">TOMORROW - JULY 14</p>
      </div>
      <Div54 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="h-4 relative shrink-0 w-5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 16"
      >
        <g id="Frame">
          <path d="M20 16H0V0H20V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p12718500}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg7() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0.5 w-5"
      data-name="svg"
    >
      <Frame19 />
    </div>
  );
}

function I7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-3 size-5 top-3.5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg7 />
    </div>
  );
}

function Div56() {
  return (
    <div
      className="absolute bg-purple-600 h-12 left-[17px] rounded-md top-[17px] w-11"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I7 />
    </div>
  );
}

function Div57() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-0 top-0 w-[172.016px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-800 text-left top-[-0.88px] w-[143px]">
        <p className="block leading-[24px]">Lower Body Focus</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-600 text-left top-[22.8px] w-[173px]">
        <p className="block leading-[20px]">50 minutes • Intermediate</p>
      </div>
    </div>
  );
}

function Div58() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-0 top-0 w-[765.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div57 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[708.688px] not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[57px]">
        <p className="block leading-[20px]">6:00 PM</p>
      </div>
    </div>
  );
}

function Span6() {
  return (
    <div
      className="absolute bg-gray-100 h-6 left-0 rounded top-0 w-[43.484px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-2 not-italic text-[12px] text-gray-700 text-left top-[3.28px] w-7">
        <p className="block leading-[normal]">Legs</p>
      </div>
    </div>
  );
}

function Span7() {
  return (
    <div
      className="absolute bg-gray-100 h-6 left-[55.484px] rounded top-0 w-[52.094px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-2 not-italic text-[12px] text-gray-700 text-left top-[3.28px] w-[37px]">
        <p className="block leading-[normal]">Glutes</p>
      </div>
    </div>
  );
}

function Div59() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-14 w-[765.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span6 />
      <Span7 />
    </div>
  );
}

function Div60() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-20 left-[77px] top-[17px] w-[765.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div58 />
      <Div59 />
    </div>
  );
}

function Div61() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[114px] left-0 rounded-lg top-8 w-[859.328px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div56 />
      <Div60 />
    </div>
  );
}

function Div62() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[146px] left-0 top-[324px] w-[859.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-500 text-left top-[-1.2px] w-[54px]">
        <p className="block leading-[20px]">JULY 15</p>
      </div>
      <Div61 />
    </div>
  );
}

function Div63() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[470px] left-[25px] top-[77px] w-[859.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div48 />
      <Div55 />
      <Div62 />
    </div>
  );
}

function Div64() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[572px] left-0 rounded-xl top-0 w-[909.328px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div41 />
      <Div63 />
    </div>
  );
}

function H3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-4 top-4 w-[362.656px]"
      data-name="h3"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[#ffffff] text-[16px] text-left top-[0.56px] w-[143px]">
        <p className="block leading-[normal]">Training Overview:</p>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_1248)">
            <path
              d={svgPaths.p1865080}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1248">
            <path d="M0 0H14V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame21() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-3.5 top-[2.75px]"
      data-name="Frame"
    >
      <Frame20 />
    </div>
  );
}

function Li() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[362.656px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame21 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22px] not-italic text-[#ffffff] text-[14px] text-left top-[-1.2px] w-[75px]">
        <p className="block leading-[20px]">8 exercises</p>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_1248)">
            <path
              d={svgPaths.p1865080}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1248">
            <path d="M0 0H14V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame23() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-3.5 top-[2.75px]"
      data-name="Frame"
    >
      <Frame22 />
    </div>
  );
}

function Li1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-7 w-[362.656px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame23 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22px] not-italic text-[#ffffff] text-[14px] text-left top-[-1.2px] w-[133px]">
        <p className="block leading-[20px]">45 minutes duration</p>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_1248)">
            <path
              d={svgPaths.p1865080}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1248">
            <path d="M0 0H14V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-3.5 top-[2.75px]"
      data-name="Frame"
    >
      <Frame24 />
    </div>
  );
}

function Li2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-14 w-[362.656px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame25 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22px] not-italic text-[#ffffff] text-[14px] text-left top-[-1.2px] w-[221px]">
        <p className="block leading-[20px]">
          Target: Chest, Shoulders, Triceps
        </p>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_1248)">
            <path
              d={svgPaths.p1865080}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1248">
            <path d="M0 0H14V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame27() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-3.5 top-[2.75px]"
      data-name="Frame"
    >
      <Frame26 />
    </div>
  );
}

function Li3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-[84px] w-[362.656px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame27 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22px] not-italic text-[#ffffff] text-[14px] text-left top-[-1.2px] w-[198px]">
        <p className="block leading-[20px]">Equipment: Dumbbells, Bench</p>
      </div>
    </div>
  );
}

function Ul() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[104px] left-4 top-12 w-[362.656px]"
      data-name="ul"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Li />
      <Li1 />
      <Li2 />
      <Li3 />
    </div>
  );
}

function Div65() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.1)] h-[168px] left-0 rounded-lg top-[108px] w-[394.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <H3 />
      <Ul />
    </div>
  );
}

function Div66() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[308px] left-6 top-6 w-[394.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[#ffffff] text-[20px] text-left top-[-1.92px] w-72">
        <p className="block leading-[28px]">Ready for your next workout?</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-12 leading-[0] left-0 not-italic text-[#ffffff] text-[16px] text-left top-[36.24px] w-[385px]">
        <p className="block leading-[24px]">
          Your Upper Body Strength training is scheduled for today.
        </p>
      </div>
      <Div65 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="h-4 relative shrink-0 w-3" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 16"
      >
        <g id="Frame">
          <path d="M12 16H0V0H12V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p29731900}
            fill="var(--fill-0, #4338CA)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg8() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-3"
      data-name="svg"
    >
      <Frame28 />
    </div>
  );
}

function I8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[114.609px] top-4 w-3"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg8 />
    </div>
  );
}

function Span8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[134.609px] top-4 w-[145.422px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-[73px] not-italic text-[16px] text-center text-indigo-700 top-[0.44px] translate-x-[-50%] w-[146px]">
        <p className="block leading-[normal]">Start Training Now</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div
      className="absolute bg-[#ffffff] h-14 left-6 rounded-lg top-[492px] w-[394.656px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <I8 />
      <Span8 />
    </div>
  );
}

function Div67() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[#4f46e5] h-[572px] left-[933.328px] rounded-xl to-[#3730a3] top-0 w-[442.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_10px_15px_0px_rgba(0,0,0,0.1)]" />
      <Div66 />
      <Button3 />
    </div>
  );
}

function Div68() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[572px] left-8 top-[728px] w-[1376px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div64 />
      <Div67 />
    </div>
  );
}

function Div69() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1324px] left-0 top-16 w-[1440px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div />
      <Section />
      <Section1 />
      <Div68 />
    </div>
  );
}

function Div70() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1388px] left-0 top-0 w-[1440px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div69 />
    </div>
  );
}

function Frame29() {
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

function Frame30() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[9.25px] overflow-clip p-0 top-[6.25px] w-[13.5px]"
      data-name="Frame"
    >
      <Frame29 />
    </div>
  );
}

function Div71() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[#4f46e5] left-0 rounded-md size-8 to-[#3730a3] top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame30 />
    </div>
  );
}

function Div72() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-3 top-0 w-[157.062px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div71 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-10 not-italic text-[20px] text-gray-800 text-left top-[0.08px] w-[118px]">
        <p className="block leading-[28px]">Peak Health</p>
      </div>
    </div>
  );
}

function Div73() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-4 w-[169.062px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div72 />
    </div>
  );
}

function Nav() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[387.953px] top-5 w-[486.172px]"
      data-name="nav"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-indigo-600 text-left top-[-0.88px] w-[84px]">
        <p className="block leading-[24px]">Dashboard</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[115.453px] not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[72px]">
        <p className="block leading-[24px]">Exercises</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[219.766px] not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[66px]">
        <p className="block leading-[24px]">Routines</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[317.219px] not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[69px]">
        <p className="block leading-[24px]">Calendar</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[417.359px] not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[70px]">
        <p className="block leading-[24px]">Statistics</p>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_953)">
            <path
              d={svgPaths.p2d9f400}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_953">
            <path d="M0 0H14V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame32() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[17px] overflow-clip p-0 size-3.5 top-[11.75px]"
      data-name="Frame"
    >
      <Frame31 />
    </div>
  );
}

function Button4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-0 rounded-md top-[3px] w-[89.141px]"
      data-name="button"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame32 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-14 not-italic text-[14px] text-center text-gray-700 top-[7.8px] translate-x-[-50%] w-[34px]">
        <p className="block leading-[20px]">Filter</p>
      </div>
    </div>
  );
}

function Span9() {
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

function Frame33() {
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

function Frame34() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-5 items-center justify-center left-2 overflow-clip p-0 top-[11.5px] w-[17.5px]"
      data-name="Frame"
    >
      <Frame33 />
    </div>
  );
}

function Button5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-0 top-0 w-[33.5px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span9 />
      <Frame34 />
    </div>
  );
}

function Div74() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-[105.141px] top-0 w-[33.5px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button5 />
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

function Div75() {
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

function Div76() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[154.641px] top-1 w-[128.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Img />
      <Div75 />
    </div>
  );
}

function Div77() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-[1093.02px] top-2.5 w-[282.984px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button4 />
      <Div74 />
      <Div76 />
    </div>
  );
}

function Div78() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-8 top-0 w-[1376px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div73 />
      <Nav />
      <Div77 />
    </div>
  );
}

function Div79() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-0 top-0 w-[1440px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div78 />
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
      <Div79 />
    </div>
  );
}

function Body() {
  return (
    <div
      className="bg-gray-50 h-[1388px] relative shrink-0 w-[1440px]"
      data-name="body"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div70 />
      <Header />
    </div>
  );
}

export default function MainPage() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-lg size-full"
      data-name="Main page"
    >
      <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative size-full">
        <Body />
      </div>
      <div className="absolute border-2 border-[#ced4da] border-solid inset-0 pointer-events-none rounded-lg" />
    </div>
  );
}