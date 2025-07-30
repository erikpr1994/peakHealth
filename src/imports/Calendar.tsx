import svgPaths from "./svg-uxpjzrnyjj";
import imgImg from "figma:asset/410c340aa057242400c608368f918307cdd72438.png";

function Div() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-0 top-0 w-[312.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-0 not-italic text-[24px] text-gray-800 text-left top-[-4.44px] w-[107px]">
        <p className="block leading-[32px]">Calendar</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-500 text-left top-[31.12px] w-[312px]">
        <p className="block leading-[24px]">
          View and manage your workout schedule
        </p>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-0 top-0 w-[1376px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div />
    </div>
  );
}

function Div2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-8 top-6 w-[1376px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="h-4 relative shrink-0 w-2.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 10 16"
      >
        <g id="Frame">
          <path d="M10 16H0V0H10V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p31e57680}
            fill="var(--fill-0, #6B7280)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-2 overflow-clip p-0 top-3 w-2.5"
      data-name="Frame"
    >
      <Frame />
    </div>
  );
}

function Button() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-0 rounded-md top-0 w-[26px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-4 relative shrink-0 w-2.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 10 16"
      >
        <g id="Frame">
          <path d="M10 16H0V0H10V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p2a458f00}
            fill="var(--fill-0, #6B7280)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-2 overflow-clip p-0 top-3 w-2.5"
      data-name="Frame"
    >
      <Frame2 />
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[34px] rounded-md top-0 w-[26px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame3 />
    </div>
  );
}

function Div3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[114.141px] top-0 w-[60px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button />
      <Button1 />
    </div>
  );
}

function Div4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-0 top-0 w-[174.141px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[20px] text-gray-800 text-left top-[4.08px] w-[98px]">
        <p className="block leading-[28px]">July 2023</p>
      </div>
      <Div3 />
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute bg-indigo-50 h-7 left-0 rounded-md top-0 w-[66.172px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[33.5px] not-italic text-[14px] text-center text-indigo-600 top-[3.9px] translate-x-[-50%] w-[43px]">
        <p className="block leading-[normal]">Month</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[74.172px] rounded-md top-0 w-[61.094px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[30.5px] not-italic text-[14px] text-center text-gray-500 top-[3.9px] translate-x-[-50%] w-[37px]">
        <p className="block leading-[normal]">Week</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[143.266px] rounded-md top-0 w-[49.641px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[25px] not-italic text-[14px] text-center text-gray-500 top-[3.9px] translate-x-[-50%] w-[26px]">
        <p className="block leading-[normal]">Day</p>
      </div>
    </div>
  );
}

function Div5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[1133.09px] top-1.5 w-[192.906px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Div6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[25px] top-[25px] w-[1326px]"
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
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[54.359px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[#000000] text-[14px] text-left top-[-0.1px] w-[55px]">
        <p className="block leading-[normal]">Legend:</p>
      </div>
    </div>
  );
}

function Div8() {
  return (
    <div
      className="absolute bg-indigo-600 left-0 rounded-[9999px] size-3 top-1"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Div9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[70.359px] top-0 w-[76.484px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div8 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-5 not-italic text-[14px] text-gray-700 text-left top-[-1.2px] w-[58px]">
        <p className="block leading-[20px]">Strength</p>
      </div>
    </div>
  );
}

function Div10() {
  return (
    <div
      className="absolute bg-green-500 left-0 rounded-[9999px] size-3 top-1"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Div11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[162.844px] top-0 w-[63.484px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div10 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-5 not-italic text-[14px] text-gray-700 text-left top-[-1.2px] w-11">
        <p className="block leading-[20px]">Cardio</p>
      </div>
    </div>
  );
}

function Div12() {
  return (
    <div
      className="absolute bg-orange-500 left-0 rounded-[9999px] size-3 top-1"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Div13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[242.328px] top-0 w-[46.969px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div12 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-5 not-italic text-[14px] text-gray-700 text-left top-[-1.2px] w-[27px]">
        <p className="block leading-[20px]">HIIT</p>
      </div>
    </div>
  );
}

function Div14() {
  return (
    <div
      className="absolute bg-purple-500 left-0 rounded-[9999px] size-3 top-1"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Div15() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[305.297px] top-0 w-[82.016px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div14 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-5 not-italic text-[14px] text-gray-700 text-left top-[-1.2px] w-[62px]">
        <p className="block leading-[20px]">Flexibility</p>
      </div>
    </div>
  );
}

function Div16() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[25px] top-[81px] w-[1326px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div7 />
      <Div9 />
      <Div11 />
      <Div13 />
      <Div15 />
    </div>
  );
}

function Section() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[142px] left-8 rounded-xl top-[104px] w-[1376px]"
      data-name="section"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div6 />
      <Div16 />
    </div>
  );
}

function Div17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-4 w-[196.562px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[98.328px] not-italic text-[14px] text-center text-gray-800 top-[-0.1px] translate-x-[-50%] w-[26px]">
        <p className="block leading-[normal]">Sun</p>
      </div>
    </div>
  );
}

function Div18() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[196.562px] top-4 w-[196.578px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[98.453px] not-italic text-[14px] text-center text-gray-800 top-[-0.1px] translate-x-[-50%] w-[30px]">
        <p className="block leading-[normal]">Mon</p>
      </div>
    </div>
  );
}

function Div19() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[393.141px] top-4 w-[196.562px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[98.391px] not-italic text-[14px] text-center text-gray-800 top-[-0.1px] translate-x-[-50%] w-[25px]">
        <p className="block leading-[normal]">Tue</p>
      </div>
    </div>
  );
}

function Div20() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[589.703px] top-4 w-[196.578px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[98.172px] not-italic text-[14px] text-center text-gray-800 top-[-0.1px] translate-x-[-50%] w-[30px]">
        <p className="block leading-[normal]">Wed</p>
      </div>
    </div>
  );
}

function Div21() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[786.281px] top-4 w-[196.562px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[98.281px] not-italic text-[14px] text-center text-gray-800 top-[-0.1px] translate-x-[-50%] w-[26px]">
        <p className="block leading-[normal]">Thu</p>
      </div>
    </div>
  );
}

function Div22() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[982.844px] top-4 w-[196.578px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[98.313px] not-italic text-[14px] text-center text-gray-800 top-[-0.1px] translate-x-[-50%] w-[17px]">
        <p className="block leading-[normal]">Fri</p>
      </div>
    </div>
  );
}

function Div23() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[1179.42px] top-4 w-[196.562px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[98.891px] not-italic text-[14px] text-center text-gray-800 top-[-0.1px] translate-x-[-50%] w-[23px]">
        <p className="block leading-[normal]">Sat</p>
      </div>
    </div>
  );
}

function Div24() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[53px] left-8 top-[270px] w-[1376px]"
      data-name="div"
    >
      <div className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div17 />
      <Div18 />
      <Div19 />
      <Div20 />
      <Div21 />
      <Div22 />
      <Div23 />
    </div>
  );
}

function Button5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[1272.23px] top-1 w-[53.766px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[27px] not-italic text-[14px] text-center text-indigo-600 top-[-0.1px] translate-x-[-50%] w-[54px]">
        <p className="block leading-[normal]">View All</p>
      </div>
    </div>
  );
}

function Div25() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[25px] top-[25px] w-[1326px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[18px] text-gray-800 text-left top-[-0.92px] w-[180px]">
        <p className="block leading-[28px]">Upcoming Workouts</p>
      </div>
      <Button5 />
    </div>
  );
}

function Frame4() {
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

function Svg() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0.5 w-5"
      data-name="svg"
    >
      <Frame4 />
    </div>
  );
}

function I() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-3 size-5 top-3.5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg />
    </div>
  );
}

function Div26() {
  return (
    <div
      className="absolute bg-indigo-600 h-12 left-[17px] rounded-md top-[19px] w-11"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I />
    </div>
  );
}

function Div27() {
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

function Frame5() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_4_1809)">
            <path
              d={svgPaths.p37081400}
              fill="var(--fill-0, #4F46E5)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_1809">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-1"
      data-name="Frame"
    >
      <Frame5 />
    </div>
  );
}

function Button6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[66.188px] top-0 w-4"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_4_1797)">
            <path
              d={svgPaths.p7b6dd00}
              fill="var(--fill-0, #EF4444)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_1797">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3.5"
      data-name="Frame"
    >
      <Frame7 />
    </div>
  );
}

function Button7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[90.188px] top-0 w-3.5"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame8 />
    </div>
  );
}

function Div28() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-7 w-[104.188px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Div29() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-[1127.81px] top-0 w-[104.188px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[104px] not-italic text-[14px] text-indigo-600 text-right top-[1.8px] translate-x-[-100%] w-[104px]">
        <p className="block leading-[20px]">Today, 5:30 PM</p>
      </div>
      <Div28 />
    </div>
  );
}

function Div30() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-0 top-0 w-[1232px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div27 />
      <Div29 />
    </div>
  );
}

function Div31() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-[77px] top-[17px] w-[1232px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div30 />
    </div>
  );
}

function Div32() {
  return (
    <div
      className="absolute bg-indigo-50 h-[86px] left-0 rounded-lg top-0 w-[1326px]"
      data-name="div"
    >
      <div className="absolute border border-indigo-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div26 />
      <Div31 />
    </div>
  );
}

function Frame9() {
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

function Svg1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0.5 w-3.5"
      data-name="svg"
    >
      <Frame9 />
    </div>
  );
}

function I1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-3 top-3.5 w-3.5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg1 />
    </div>
  );
}

function Div33() {
  return (
    <div
      className="absolute bg-green-600 h-12 left-[17px] rounded-md top-[19px] w-[38px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I1 />
    </div>
  );
}

function Div34() {
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

function Frame10() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_4_1809)">
            <path
              d={svgPaths.p37081400}
              fill="var(--fill-0, #4F46E5)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_1809">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-1"
      data-name="Frame"
    >
      <Frame10 />
    </div>
  );
}

function Button8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[93.047px] top-0 w-4"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame11 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_4_1797)">
            <path
              d={svgPaths.p7b6dd00}
              fill="var(--fill-0, #EF4444)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_1797">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3.5"
      data-name="Frame"
    >
      <Frame12 />
    </div>
  );
}

function Button9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[117.047px] top-0 w-3.5"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame13 />
    </div>
  );
}

function Div35() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-7 w-[131.047px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Div36() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-[1106.95px] top-0 w-[131.047px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[130px] not-italic text-[14px] text-gray-600 text-right top-[1.8px] translate-x-[-100%] w-[130px]">
        <p className="block leading-[20px]">Tomorrow, 7:00 AM</p>
      </div>
      <Div35 />
    </div>
  );
}

function Div37() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-0 top-0 w-[1238px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div34 />
      <Div36 />
    </div>
  );
}

function Div38() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-[71px] top-[17px] w-[1238px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div37 />
    </div>
  );
}

function Div39() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[86px] left-0 rounded-lg top-[102px] w-[1326px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div33 />
      <Div38 />
    </div>
  );
}

function Frame14() {
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

function Svg2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0.5 w-5"
      data-name="svg"
    >
      <Frame14 />
    </div>
  );
}

function I2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-3 size-5 top-3.5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg2 />
    </div>
  );
}

function Div40() {
  return (
    <div
      className="absolute bg-purple-600 h-12 left-[17px] rounded-md top-[19px] w-11"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I2 />
    </div>
  );
}

function Div41() {
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

function Frame15() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_4_1809)">
            <path
              d={svgPaths.p37081400}
              fill="var(--fill-0, #4F46E5)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_1809">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-1"
      data-name="Frame"
    >
      <Frame15 />
    </div>
  );
}

function Button10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[72.25px] top-0 w-4"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame16 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_4_1797)">
            <path
              d={svgPaths.p7b6dd00}
              fill="var(--fill-0, #EF4444)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_1797">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3.5"
      data-name="Frame"
    >
      <Frame17 />
    </div>
  );
}

function Button11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[96.25px] top-0 w-3.5"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame18 />
    </div>
  );
}

function Div42() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-7 w-[110.25px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button10 />
      <Button11 />
    </div>
  );
}

function Div43() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-[1121.75px] top-0 w-[110.25px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[110px] not-italic text-[14px] text-gray-600 text-right top-[1.8px] translate-x-[-100%] w-[110px]">
        <p className="block leading-[20px]">July 15, 6:00 PM</p>
      </div>
      <Div42 />
    </div>
  );
}

function Div44() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-0 top-0 w-[1232px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div41 />
      <Div43 />
    </div>
  );
}

function Div45() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-[77px] top-[17px] w-[1232px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div44 />
    </div>
  );
}

function Div46() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[86px] left-0 rounded-lg top-[204px] w-[1326px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div40 />
      <Div45 />
    </div>
  );
}

function Div47() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[290px] left-[25px] top-[77px] w-[1326px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div32 />
      <Div39 />
      <Div46 />
    </div>
  );
}

function Section1() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[392px] left-8 rounded-xl top-[323px] w-[1376px]"
      data-name="section"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div25 />
      <Div47 />
    </div>
  );
}

function Div48() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[25px] top-[25px] w-[392.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-800 text-left top-[-1.12px] w-[108px]">
        <p className="block leading-[24px]">Quick Actions</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="h-5 relative shrink-0 w-[17.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 20"
      >
        <g id="Frame">
          <path d="M17.5 20H0V0H17.5V20Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p39376600}
            fill="var(--fill-0, #4F46E5)"
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
      className="absolute box-border content-stretch flex flex-row h-5 items-center justify-center left-[85.406px] overflow-clip p-0 top-[20.5px] w-[17.5px]"
      data-name="Frame"
    >
      <Frame19 />
    </div>
  );
}

function Button12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[90px] left-0 rounded-lg top-0 w-[188.328px]"
      data-name="button"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Frame20 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[93.984px] not-italic text-[14px] text-center text-gray-700 top-[51.8px] translate-x-[-50%] w-[86px]">
        <p className="block leading-[20px]">Add Workout</p>
      </div>
    </div>
  );
}

function Frame21() {
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
            d={svgPaths.pa250f00}
            fill="var(--fill-0, #16A34A)"
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
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[84.156px] overflow-clip p-0 size-5 top-[20.5px]"
      data-name="Frame"
    >
      <Frame21 />
    </div>
  );
}

function Button13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[90px] left-[204.328px] rounded-lg top-0 w-[188.328px]"
      data-name="button"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Frame22 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[94.063px] not-italic text-[14px] text-center text-gray-700 top-[51.8px] translate-x-[-50%] w-[77px]">
        <p className="block leading-[20px]">Reschedule</p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="relative shrink-0 size-5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_4_1803)">
            <path
              d={svgPaths.p3dbd2050}
              fill="var(--fill-0, #EA580C)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_1803">
            <path d="M0 0H20V20H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame24() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[84.156px] overflow-clip p-0 size-5 top-[20.5px]"
      data-name="Frame"
    >
      <Frame23 />
    </div>
  );
}

function Button14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[90px] left-0 rounded-lg top-[106px] w-[188.328px]"
      data-name="button"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Frame24 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[94.484px] not-italic text-[14px] text-center text-gray-700 top-[51.8px] translate-x-[-50%] w-[63px]">
        <p className="block leading-[20px]">Duplicate</p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="h-5 relative shrink-0 w-[17.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 20"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_4_1800)">
            <path
              d={svgPaths.p22f3a000}
              fill="var(--fill-0, #9333EA)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_1800">
            <path d="M0 0H17.5V20H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame26() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-5 items-center justify-center left-[85.406px] overflow-clip p-0 top-[20.5px] w-[17.5px]"
      data-name="Frame"
    >
      <Frame25 />
    </div>
  );
}

function Button15() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[90px] left-[204.328px] rounded-lg top-[106px] w-[188.328px]"
      data-name="button"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Frame26 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[94.5px] not-italic text-[14px] text-center text-gray-700 top-[51.8px] translate-x-[-50%] w-[39px]">
        <p className="block leading-[20px]">Share</p>
      </div>
    </div>
  );
}

function Div49() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[196px] left-[25px] top-[65px] w-[392.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
    </div>
  );
}

function Div50() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[290px] left-0 rounded-xl top-0 w-[442.656px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div48 />
      <Div49 />
    </div>
  );
}

function Div51() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[772.062px] top-0.5 w-[87.281px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-500 text-left top-[-0.1px] w-[88px]">
        <p className="block leading-[normal]">Last 4 weeks</p>
      </div>
    </div>
  );
}

function Div52() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[25px] top-[25px] w-[859.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-800 text-left top-[-1.12px] w-[167px]">
        <p className="block leading-[24px]">Workout Consistency</p>
      </div>
      <Div51 />
    </div>
  );
}

function Div53() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-0 top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[59.594px] not-italic text-[12px] text-center text-gray-500 top-[-0.72px] translate-x-[-50%] w-[25px]">
        <p className="block leading-[normal]">Mon</p>
      </div>
    </div>
  );
}

function Div54() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[123.328px] top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[59.688px] not-italic text-[12px] text-center text-gray-500 top-[-0.72px] translate-x-[-50%] w-[21px]">
        <p className="block leading-[normal]">Tue</p>
      </div>
    </div>
  );
}

function Div55() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[246.656px] top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[59.891px] not-italic text-[12px] text-center text-gray-500 top-[-0.72px] translate-x-[-50%] w-[26px]">
        <p className="block leading-[normal]">Wed</p>
      </div>
    </div>
  );
}

function Div56() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[370px] top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[59.688px] not-italic text-[12px] text-center text-gray-500 top-[-0.72px] translate-x-[-50%] w-[22px]">
        <p className="block leading-[normal]">Thu</p>
      </div>
    </div>
  );
}

function Div57() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[493.328px] top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[60.031px] not-italic text-[12px] text-center text-gray-500 top-[-0.72px] translate-x-[-50%] w-[15px]">
        <p className="block leading-[normal]">Fri</p>
      </div>
    </div>
  );
}

function Div58() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[616.672px] top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[59.969px] not-italic text-[12px] text-center text-gray-500 top-[-0.72px] translate-x-[-50%] w-[19px]">
        <p className="block leading-[normal]">Sat</p>
      </div>
    </div>
  );
}

function Div59() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[740px] top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[59.719px] not-italic text-[12px] text-center text-gray-500 top-[-0.72px] translate-x-[-50%] w-[22px]">
        <p className="block leading-[normal]">Sun</p>
      </div>
    </div>
  );
}

function Div60() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-[25px] top-[65px] w-[859.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div53 />
      <Div54 />
      <Div55 />
      <Div56 />
      <Div57 />
      <Div58 />
      <Div59 />
    </div>
  );
}

function Div61() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-0 rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div62() {
  return (
    <div
      className="absolute bg-indigo-600 h-8 left-[123.328px] rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div63() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-[246.656px] rounded-sm top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div64() {
  return (
    <div
      className="absolute bg-green-500 h-8 left-[370px] rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div65() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-[493.328px] rounded-sm top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div66() {
  return (
    <div
      className="absolute bg-purple-500 h-8 left-[616.672px] rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div67() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-[740px] rounded-sm top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div68() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[25px] top-[89px] w-[859.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div61 />
      <Div62 />
      <Div63 />
      <Div64 />
      <Div65 />
      <Div66 />
      <Div67 />
    </div>
  );
}

function Div69() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-0 rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div70() {
  return (
    <div
      className="absolute bg-indigo-600 h-8 left-[123.328px] rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div71() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-[246.656px] rounded-sm top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div72() {
  return (
    <div
      className="absolute bg-orange-500 h-8 left-[370px] rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div73() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-[493.328px] rounded-sm top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div74() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-[616.672px] rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div75() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-[740px] rounded-sm top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div76() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[25px] top-[125px] w-[859.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div69 />
      <Div70 />
      <Div71 />
      <Div72 />
      <Div73 />
      <Div74 />
      <Div75 />
    </div>
  );
}

function Div77() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-0 rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div78() {
  return (
    <div
      className="absolute bg-indigo-600 h-8 left-[123.328px] rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div79() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-[246.656px] rounded-sm top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div80() {
  return (
    <div
      className="absolute bg-green-500 h-8 left-[370px] rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div81() {
  return (
    <div
      className="absolute bg-indigo-600 h-8 left-[493.328px] rounded-sm top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div82() {
  return (
    <div
      className="absolute bg-green-500 h-8 left-[616.672px] rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div83() {
  return (
    <div
      className="absolute bg-purple-500 h-8 left-[740px] rounded-sm top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div84() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[25px] top-[161px] w-[859.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div77 />
      <Div78 />
      <Div79 />
      <Div80 />
      <Div81 />
      <Div82 />
      <Div83 />
    </div>
  );
}

function Div85() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-0 rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div86() {
  return (
    <div
      className="absolute bg-indigo-600 h-8 left-[123.328px] rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div87() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-[246.656px] rounded-sm top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div88() {
  return (
    <div
      className="absolute bg-green-500 h-8 left-[370px] rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div89() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 rounded-sm top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-2 border-solid border-yellow-400 inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div90() {
  return (
    <div
      className="absolute bg-indigo-600 h-8 left-[493.328px] rounded-sm top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
      <Div89 />
    </div>
  );
}

function Div91() {
  return (
    <div
      className="absolute bg-orange-500 h-8 left-[616.672px] rounded-sm top-0 w-[119.328px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div92() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-[740px] rounded-sm top-0 w-[119.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-sm" />
    </div>
  );
}

function Div93() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[25px] top-[197px] w-[859.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div85 />
      <Div86 />
      <Div87 />
      <Div88 />
      <Div90 />
      <Div91 />
      <Div92 />
    </div>
  );
}

function Div94() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[25px] top-[245px] w-[859.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-600 text-left top-[-1.2px] w-[178px]">
        <p className="block leading-[20px]">Total workouts this month:</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[177.078px] not-italic text-[14px] text-gray-600 text-left top-[-0.2px] w-[252px]">
        <p className="block leading-[normal]">
          15 / 20 planned (75% completion rate)
        </p>
      </div>
    </div>
  );
}

function Div95() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[290px] left-[466.656px] rounded-xl top-0 w-[909.344px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div52 />
      <Div60 />
      <Div68 />
      <Div76 />
      <Div84 />
      <Div93 />
      <Div94 />
    </div>
  );
}

function Section2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[290px] left-8 top-[747px] w-[1376px]"
      data-name="section"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div50 />
      <Div95 />
    </div>
  );
}

function Div96() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1061px] left-0 top-[65px] w-[1440px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div2 />
      <Section />
      <Div24 />
      <Section1 />
      <Section2 />
    </div>
  );
}

function Frame27() {
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

function Frame28() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[9.25px] overflow-clip p-0 top-[6.25px] w-[13.5px]"
      data-name="Frame"
    >
      <Frame27 />
    </div>
  );
}

function Div97() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[#4f46e5] left-0 rounded-md size-8 to-[#3730a3] top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame28 />
    </div>
  );
}

function Div98() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-[157.062px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div97 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-10 not-italic text-[20px] text-gray-800 text-left top-[0.08px] w-[118px]">
        <p className="block leading-[28px]">Peak Health</p>
      </div>
    </div>
  );
}

function Div99() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-4 w-[157.062px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div98 />
    </div>
  );
}

function Span() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-[363.469px] top-0 w-[84.422px]"
      data-name="span"
    >
      <div className="absolute border-[0px_0px_2px] border-indigo-600 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-3 not-italic text-[14px] text-indigo-600 text-left top-[7.9px] w-[61px]">
        <p className="block leading-[normal]">Calendar</p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-[318.453px] top-[13px] w-[565.469px]"
      data-name="nav"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-[38px] leading-[0] left-3 not-italic text-[14px] text-gray-700 text-left top-[6.91px] w-[74px]">
        <p className="block leading-[20px]">Dashboard</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-[38px] leading-[0] left-[141.016px] not-italic text-[14px] text-gray-700 text-left top-[6.91px] w-16">
        <p className="block leading-[20px]">Exercises</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-[38px] leading-[0] left-[261.234px] not-italic text-[14px] text-gray-700 text-left top-[6.91px] w-[59px]">
        <p className="block leading-[20px]">Routines</p>
      </div>
      <Span />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-[38px] leading-[0] left-[491.891px] not-italic text-[14px] text-gray-700 text-left top-[6.91px] w-[63px]">
        <p className="block leading-[20px]">Statistics</p>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="h-3.5 relative shrink-0 w-[12.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 14"
      >
        <g id="Frame">
          <path d="M12.25 14H0V0H12.25V14Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p363f1d80}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 p-0 top-[2.75px] w-[12.25px]"
      data-name="svg"
    >
      <Frame29 />
    </div>
  );
}

function I3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-4 top-2 w-[12.25px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg3 />
    </div>
  );
}

function Span1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[36.25px] top-2 w-[86.344px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[43px] not-italic text-[#ffffff] text-[14px] text-center top-[-0.1px] translate-x-[-50%] w-[86px]">
        <p className="block leading-[normal]">Add Workout</p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div
      className="absolute bg-indigo-600 h-9 left-0 rounded-md top-1 w-[138.594px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I3 />
      <Span1 />
    </div>
  );
}

function Span2() {
  return (
    <div
      className="absolute bg-red-500 left-[19.75px] rounded-[9999px] size-4 top-[-4px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[8.281px] not-italic text-[#ffffff] text-[12px] text-center top-[-0.72px] translate-x-[-50%] w-2">
        <p className="block leading-[normal]">3</p>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="h-[18px] relative shrink-0 w-[15.75px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 18"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_4_1791)">
            <path
              d={svgPaths.p30ddd0c0}
              fill="var(--fill-0, #4B5563)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_1791">
            <path d="M0 0H15.75V18H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame31() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-2 overflow-clip p-0 top-[12.25px] w-[15.75px]"
      data-name="Frame"
    >
      <Frame30 />
    </div>
  );
}

function Button17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-0 top-0 w-[31.75px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span2 />
      <Frame31 />
    </div>
  );
}

function Div100() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-[154.594px] top-0 w-[31.75px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button17 />
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

function Div101() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[84.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-800 text-left top-[-0.1px] w-[84px]">
        <p className="block leading-[normal]">Alex Morgan</p>
      </div>
    </div>
  );
}

function Div102() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-0 top-5 w-[84.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-[-0.72px] w-[70px]">
        <p className="block leading-[normal]">Pro Member</p>
      </div>
    </div>
  );
}

function Div103() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-11 top-0 w-[84.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div101 />
      <Div102 />
    </div>
  );
}

function Div104() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[202.344px] top-1 w-[128.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Img />
      <Div103 />
    </div>
  );
}

function Div105() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-[1045.31px] top-2.5 w-[330.688px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button16 />
      <Div100 />
      <Div104 />
    </div>
  );
}

function Div106() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-8 top-0 w-[1376px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div99 />
      <Nav />
      <Div105 />
    </div>
  );
}

function Div107() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-0 top-0 w-[1440px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div106 />
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
      <Div107 />
    </div>
  );
}

function Body() {
  return (
    <div
      className="bg-gray-50 h-[1126px] relative shrink-0 w-[1440px]"
      data-name="body"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div96 />
      <Header />
    </div>
  );
}

export default function Calendar() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-lg size-full"
      data-name="Calendar"
    >
      <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative size-full">
        <Body />
      </div>
      <div className="absolute border-2 border-[#ced4da] border-solid inset-0 pointer-events-none rounded-lg" />
    </div>
  );
}