import svgPaths from "./svg-ga10wnr6ur";
import imgImg from "figma:asset/410c340aa057242400c608368f918307cdd72438.png";

function Div() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-14 left-8 top-6 w-[1216px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-0 not-italic text-[24px] text-gray-800 text-left top-[-4.76px] w-[175px]">
        <p className="block leading-[32px]">Create Routine</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-500 text-left top-[31.12px] w-[280px]">
        <p className="block leading-[24px]">
          Design your custom training program
        </p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[546px]"
      data-name="label"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[-0.1px] w-[94px]">
        <p className="block leading-[normal]">Routine Name</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[42px] left-0 rounded-md top-7 w-[546px]"
      data-name="input"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[42px] justify-center leading-[0] left-3 not-italic text-[#adaebc] text-[16px] text-left top-[21px] translate-y-[-50%] w-36">
        <p className="block leading-[24px]">Enter routine name</p>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[70px] left-0 top-0 w-[546px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[546px]"
      data-name="label"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[-0.2px] w-[115px]">
        <p className="block leading-[normal]">Duration (weeks)</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute left-[514px] size-6 top-2" data-name="Frame">
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
      className="absolute bg-[#ffffff] h-10 left-0 rounded-md top-7 w-[546px]"
      data-name="select"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-10 justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden text-[#000000] text-[16px] text-left text-nowrap top-5 translate-y-[-50%] w-16">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          4 weeks
        </p>
      </div>
      <Frame />
    </div>
  );
}

function Div2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[70px] left-[570px] top-0 w-[546px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Label1 />
      <Select />
    </div>
  );
}

function Label2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[546px]"
      data-name="label"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[-0.1px] w-[100px]">
        <p className="block leading-[normal]">Difficulty Level</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute left-[514px] size-6 top-2" data-name="Frame">
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
      className="absolute bg-[#ffffff] h-10 left-0 rounded-md top-7 w-[546px]"
      data-name="select"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-10 justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden text-[#000000] text-[16px] text-left text-nowrap top-5 translate-y-[-50%] w-[68px]">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          Beginner
        </p>
      </div>
      <Frame1 />
    </div>
  );
}

function Div3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[68px] left-0 top-[94px] w-[546px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Label2 />
      <Select1 />
    </div>
  );
}

function Label3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[582.072px] top-[93.824px] w-[546px]"
      data-name="label"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[-10px] not-italic text-[14px] text-gray-700 text-left top-0 w-[72px]">
        <p className="block leading-[normal]">Objectives</p>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div
      className="absolute bg-[#ffffff] h-12 left-[570.072px] rounded-md top-[121.824px] w-[546px]"
      data-name="textarea"
    >
      <div className="h-12 overflow-clip relative w-[546px]">
        <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-3 not-italic text-[#adaebc] text-[16px] text-left top-2 w-[526px]">
          <p className="block leading-[24px]">Describe your objective...</p>
        </div>
      </div>
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
    </div>
  );
}

function Div4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[162px] left-[25px] top-[77px] w-[1116px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div1 />
      <Div2 />
      <Div3 />
      <Label3 />
      <Textarea />
    </div>
  );
}

function Label4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[1116px]"
      data-name="label"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[-0.1px] w-[77px]">
        <p className="block leading-[normal]">Description</p>
      </div>
    </div>
  );
}

function Textarea1() {
  return (
    <div
      className="absolute bg-[#ffffff] h-20 left-0 rounded-md top-7 w-[1116px]"
      data-name="textarea"
    >
      <div className="h-20 overflow-clip relative w-[1116px]">
        <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-20 leading-[0] left-3 not-italic text-[#adaebc] text-[16px] text-left top-2 w-44">
          <p className="block leading-[24px]">Describe your routine...</p>
        </div>
      </div>
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
    </div>
  );
}

function Div5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[114px] left-[25px] top-[263px] w-[1116px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Label4 />
      <Textarea1 />
    </div>
  );
}

function Div6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[402px] left-[25px] rounded-lg top-[25px] w-[1166px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-[25px] not-italic text-[18px] text-gray-800 text-left top-[24.08px] w-[147px]">
        <p className="block leading-[28px]">Routine Settings</p>
      </div>
      <Div4 />
      <Div5 />
    </div>
  );
}

function Frame2() {
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

function Svg() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-3.5"
      data-name="svg"
    >
      <Frame2 />
    </div>
  );
}

function I() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-4 top-2 w-3.5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg />
    </div>
  );
}

function Span() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[38px] top-2 w-[98.672px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[49.5px] not-italic text-[#ffffff] text-[16px] text-center top-[0.56px] translate-x-[-50%] w-[99px]">
        <p className="block leading-[normal]">Add Workout</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div
      className="absolute bg-indigo-600 h-10 left-[1013.33px] rounded-md top-0 w-[152.672px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I />
      <Span />
    </div>
  );
}

function Div7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-0 top-0 w-[1166px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[18px] text-gray-800 text-left top-[5.36px] w-[86px]">
        <p className="block leading-[28px]">Workouts</p>
      </div>
      <Button />
    </div>
  );
}

function Input1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 rounded top-0 w-[242px]"
      data-name="input"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-1 not-italic text-[16px] text-gray-800 text-left top-0 w-40">
        <p className="block leading-[24px]">Full Body Strength A</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-3 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 12"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_494)">
            <path
              d={svgPaths.p2b2f8600}
              fill="var(--fill-0, #1D4ED8)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_494">
            <path d="M0 0H10.5V12H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3 items-center justify-center left-0 p-0 top-[1.5px] w-[10.5px]"
      data-name="svg"
    >
      <Frame3 />
    </div>
  );
}

function I1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-2 top-1 w-[10.5px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg1 />
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute bg-blue-100 h-6 left-0 rounded top-0 w-[98.484px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <I1 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[56.5px] not-italic text-[12px] text-blue-700 text-center top-[3.28px] translate-x-[-50%] w-[68px]">
        <p className="block leading-[normal]">Week 1, 3, 5</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute bg-gray-200 h-6 left-[106.484px] rounded top-0 w-[61.781px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[31px] not-italic text-[12px] text-center text-gray-700 top-[3.28px] translate-x-[-50%] w-[46px]">
        <p className="block leading-[normal]">Monday</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 size-3" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 12"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_521)">
            <path
              d={svgPaths.p1b4d6df0}
              fill="var(--fill-0, #15803D)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_521">
            <path d="M0 0H12V12H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-3 top-[1.5px]"
      data-name="svg"
    >
      <Frame4 />
    </div>
  );
}

function I2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-2 top-1 w-3"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg2 />
    </div>
  );
}

function Button3() {
  return (
    <div
      className="absolute bg-green-100 h-6 left-[176.266px] rounded top-0 w-[80.547px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <I2 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-12 not-italic text-[12px] text-center text-green-700 top-[3.28px] translate-x-[-50%] w-12">
        <p className="block leading-[normal]">9:00 AM</p>
      </div>
    </div>
  );
}

function Div8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[254px] top-0 w-[256.812px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Div9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-1 w-[510.812px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Input1 />
      <Div8 />
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
          <g clipPath="url(#clip0_1_533)">
            <path
              d={svgPaths.p7d3c080}
              fill="var(--fill-0, #6B7280)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_533">
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
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-1 overflow-clip p-0 size-4 top-2"
      data-name="Frame"
    >
      <Frame5 />
    </div>
  );
}

function Button4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-6"
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
          <g clipPath="url(#clip0_1_536)">
            <path
              d={svgPaths.p1fc99280}
              fill="var(--fill-0, #6B7280)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_536">
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
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-1 overflow-clip p-0 top-2 w-3.5"
      data-name="Frame"
    >
      <Frame7 />
    </div>
  );
}

function Button5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-9 top-0 w-[22px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame8 />
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
          <path d="M16 16H0V0H16V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p10900d80}
            fill="var(--fill-0, #6B7280)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-1 overflow-clip p-0 size-4 top-2"
      data-name="Frame"
    >
      <Frame9 />
    </div>
  );
}

function Button6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[70px] top-0 w-6"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame10 />
    </div>
  );
}

function Div10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[1038px] top-0 w-[94px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Div11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-4 top-4 w-[1132px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div9 />
      <Div10 />
    </div>
  );
}

function Div12() {
  return (
    <div
      className="absolute bg-gray-50 h-[65px] left-px rounded-tl-[8px] rounded-tr-[8px] top-px w-[1164px]"
      data-name="div"
    >
      <div className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px]" />
      <Div11 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_476)">
            <path
              d={svgPaths.pb3c1600}
              fill="var(--fill-0, #EA580C)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_476">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-[5.5px] w-3.5"
      data-name="Frame"
    >
      <Frame11 />
    </div>
  );
}

function Frame13() {
  return (
    <div
      className="absolute left-[108px] size-[15px] top-1.5"
      data-name="Frame"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 15 15"
      >
        <g id="Frame">
          <path
            clipRule="evenodd"
            d={svgPaths.pb703280}
            fill="var(--fill-0, #C2410C)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Select2() {
  return (
    <div
      className="absolute bg-orange-100 h-[27px] left-[102.072px] rounded top-[-0.176px] w-[130px]"
      data-name="select"
    >
      <div className="absolute border border-orange-300 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[27px] justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden text-[12px] text-left text-nowrap text-orange-700 top-[13.5px] translate-y-[-50%] w-[88px]">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          Warm-up
        </p>
      </div>
      <Frame13 />
    </div>
  );
}

function Div13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[27px] left-3 top-3 w-[189.812px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame12 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[22px] not-italic text-[16px] text-left text-orange-800 top-[0.62px] w-[71px]">
        <p className="block leading-[24px]">Warm-up</p>
      </div>
      <Select2 />
    </div>
  );
}

function Frame14() {
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
            fill="var(--fill-0, #EA580C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3.5"
      data-name="Frame"
    >
      <Frame14 />
    </div>
  );
}

function Button7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[1104px] top-[13.5px] w-3.5"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame15 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="h-3.5 relative shrink-0 w-[17.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_458)">
            <path
              d={svgPaths.pc107780}
              fill="var(--fill-0, #4338CA)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_458">
            <path d="M0 0H17.5V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 p-0 top-[1.75px] w-[17.5px]"
      data-name="svg"
    >
      <Frame16 />
    </div>
  );
}

function I3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[17px] left-3 top-[5px] w-[17.5px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg3 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="h-3.5 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 14"
      >
        <g id="Frame">
          <path d="M10.5 14H0V0H10.5V14Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p18a65c00}
            fill="var(--fill-0, #4338CA)"
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
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 p-0 top-[1.75px] w-[10.5px]"
      data-name="svg"
    >
      <Frame17 />
    </div>
  );
}

function I4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[17px] left-[184px] top-[5px] w-[10.5px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg4 />
    </div>
  );
}

function Span1() {
  return (
    <div
      className="absolute bg-indigo-100 h-7 left-[259.072px] rounded-[9999px] top-[10.824px] w-[205px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <I3 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[33px] not-italic text-[14px] text-indigo-700 text-left top-1 w-[138px]">
        <p className="block leading-[normal]">Warm-up the body</p>
      </div>
      <I4 />
    </div>
  );
}

function Div14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-px top-px w-[1130px]"
      data-name="div"
    >
      <div className="absolute border-[0px_0px_1px] border-orange-200 border-solid inset-0 pointer-events-none" />
      <Div13 />
      <Button7 />
      <Span1 />
    </div>
  );
}

function Frame18() {
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
            d={svgPaths.p5d54b40}
            fill="var(--fill-0, #9CA3AF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame19() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-2.5"
      data-name="Frame"
    >
      <Frame18 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="h-4 relative shrink-0 w-2.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 10 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_470)">
            <path
              d={svgPaths.p708cf80}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_470">
            <path d="M0 0H10V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-2.5"
      data-name="svg"
    >
      <Frame20 />
    </div>
  );
}

function I5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[11px] top-1 w-2.5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg5 />
    </div>
  );
}

function Div15() {
  return (
    <div
      className="absolute bg-gray-800 left-[22px] rounded-md size-8 top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I5 />
    </div>
  );
}

function Input2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[66px] rounded top-1 w-[242px]"
      data-name="input"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-1 not-italic text-[16px] text-gray-800 text-left top-0 w-[153px]">
        <p className="block leading-[24px]">Dynamic Stretching</p>
      </div>
    </div>
  );
}

function Div16() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-[308px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame19 />
      <Div15 />
      <Input2 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="h-3.5 relative shrink-0 w-[12.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_503)">
            <path
              d={svgPaths.p38632e00}
              fill="var(--fill-0, #6B7280)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_503">
            <path d="M0 0H12.25V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame22() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 overflow-clip p-0 top-[2.75px] w-[12.25px]"
      data-name="Frame"
    >
      <Frame21 />
    </div>
  );
}

function Button8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0.5 w-[55.188px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame22 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[36.25px] not-italic text-[14px] text-center text-gray-500 top-[-0.1px] translate-x-[-50%] w-10">
        <p className="block leading-[normal]">Notes</p>
      </div>
    </div>
  );
}

function Frame23() {
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
            fill="var(--fill-0, #6B7280)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame24() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-1"
      data-name="Frame"
    >
      <Frame23 />
    </div>
  );
}

function Button9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[63.188px] top-0 w-1"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame24 />
    </div>
  );
}

function Div17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[996.812px] top-1 w-[67.188px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Div18() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[17px] top-[17px] w-[1064px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div16 />
      <Div17 />
    </div>
  );
}

function Label5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[524px]"
      data-name="label"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[-0.1px] w-[73px]">
        <p className="block leading-[normal]">Rest Timer</p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute left-[495px] size-[21px] top-2" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 21 21"
      >
        <g id="Frame">
          <path
            clipRule="evenodd"
            d={svgPaths.p1a6425c0}
            fill="var(--fill-0, black)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Select3() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[37px] left-0 rounded-md top-6 w-[524px]"
      data-name="select"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden size-[37px] text-[#000000] text-[14px] text-left text-nowrap top-[18.5px] translate-y-[-50%]">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          00:15
        </p>
      </div>
      <Frame25 />
    </div>
  );
}

function Div19() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[61px] left-0 top-0 w-[524px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Label5 />
      <Select3 />
    </div>
  );
}

function Label6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[524px]"
      data-name="label"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[-0.1px] w-[60px]">
        <p className="block leading-[normal]">Set Type</p>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="absolute left-[495px] size-[21px] top-2" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 21 21"
      >
        <g id="Frame">
          <path
            clipRule="evenodd"
            d={svgPaths.p1a6425c0}
            fill="var(--fill-0, black)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Select4() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[37px] left-0 rounded-md top-6 w-[524px]"
      data-name="select"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[37px] justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden text-[#000000] text-[14px] text-left text-nowrap top-[18.5px] translate-y-[-50%] w-[33px]">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          Reps
        </p>
      </div>
      <Frame26 />
    </div>
  );
}

function Div20() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[61px] left-[540px] top-0 w-[524px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Label6 />
      <Select4 />
    </div>
  );
}

function Div21() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[61px] left-[17px] top-[65px] w-[1064px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div19 />
      <Div20 />
    </div>
  );
}

function Label7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[1064px]"
      data-name="label"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[-0.1px] w-[30px]">
        <p className="block leading-[normal]">Sets</p>
      </div>
    </div>
  );
}

function Span2() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-0 rounded-md top-[3px] w-[30.094px]"
      data-name="span"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[8.016px] not-italic text-[14px] text-gray-600 text-left top-[5.9px] w-3.5">
        <p className="block leading-[normal]">W</p>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[38px] left-[42.094px] rounded-md top-0 w-[997.906px]"
      data-name="input"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[38px] justify-center leading-[0] left-3 not-italic text-[#adaebc] text-[16px] text-left top-[19px] translate-y-[-50%] w-[29px]">
        <p className="block leading-[24px]">30s</p>
      </div>
    </div>
  );
}

function Frame27() {
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
            d={svgPaths.pf5d1f80}
            fill="var(--fill-0, #9CA3AF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame28() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3"
      data-name="Frame"
    >
      <Frame27 />
    </div>
  );
}

function Button10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[1052px] top-[7px] w-3"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame28 />
    </div>
  );
}

function Div22() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-0 top-0 w-[1064px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span2 />
      <Input3 />
      <Button10 />
    </div>
  );
}

function Span3() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-0 rounded-md top-[3px] w-[30.094px]"
      data-name="span"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[12.141px] not-italic text-[14px] text-gray-600 text-left top-[5.9px] w-[7px]">
        <p className="block leading-[normal]">1</p>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[38px] left-[42.094px] rounded-md top-0 w-[997.906px]"
      data-name="input"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[38px] justify-center leading-[0] left-3 not-italic text-[#adaebc] text-[16px] text-left top-[19px] translate-y-[-50%] w-[29px]">
        <p className="block leading-[24px]">45s</p>
      </div>
    </div>
  );
}

function Frame29() {
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
            d={svgPaths.pf5d1f80}
            fill="var(--fill-0, #9CA3AF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame30() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3"
      data-name="Frame"
    >
      <Frame29 />
    </div>
  );
}

function Button11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[1052px] top-[7px] w-3"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame30 />
    </div>
  );
}

function Div23() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-0 top-[46px] w-[1064px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span3 />
      <Input4 />
      <Button11 />
    </div>
  );
}

function Span4() {
  return (
    <div
      className="absolute bg-gray-100 h-8 left-0 rounded-md top-[3px] w-[30.094px]"
      data-name="span"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[10.719px] not-italic text-[14px] text-gray-600 text-left top-[5.9px] w-[9px]">
        <p className="block leading-[normal]">2</p>
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[38px] left-[42.094px] rounded-md top-0 w-[997.906px]"
      data-name="input"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[38px] justify-center leading-[0] left-3 not-italic text-[#adaebc] text-[16px] text-left top-[19px] translate-y-[-50%] w-[29px]">
        <p className="block leading-[24px]">60s</p>
      </div>
    </div>
  );
}

function Frame31() {
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
            d={svgPaths.pf5d1f80}
            fill="var(--fill-0, #9CA3AF)"
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
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3"
      data-name="Frame"
    >
      <Frame31 />
    </div>
  );
}

function Button12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[1052px] top-[7px] w-3"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame32 />
    </div>
  );
}

function Div24() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-0 top-[92px] w-[1064px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span4 />
      <Input5 />
      <Button12 />
    </div>
  );
}

function Div25() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[130px] left-0 top-7 w-[1064px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div22 />
      <Div23 />
      <Div24 />
    </div>
  );
}

function Div26() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[158px] left-[17px] top-[142px] w-[1064px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Label7 />
      <Div25 />
    </div>
  );
}

function Frame33() {
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
            fill="var(--fill-0, #4B5563)"
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
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-[495.641px] overflow-clip p-0 top-[11.75px] w-[12.25px]"
      data-name="Frame"
    >
      <Frame33 />
    </div>
  );
}

function Button13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-[17px] rounded-md top-[316px] w-[1064px]"
      data-name="button"
    >
      <div className="absolute border border-dashed border-gray-300 inset-0 pointer-events-none rounded-md" />
      <Frame34 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[542.391px] not-italic text-[14px] text-center text-gray-600 top-[8.9px] translate-x-[-50%] w-[53px]">
        <p className="block leading-[normal]">Add Set</p>
      </div>
    </div>
  );
}

function Div27() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[371px] left-4 rounded-lg top-4 w-[1098px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div18 />
      <Div21 />
      <Div26 />
      <Button13 />
    </div>
  );
}

function Div28() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[403px] left-px top-[53px] w-[1130px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div27 />
    </div>
  );
}

function Frame35() {
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
            fill="var(--fill-0, #4F46E5)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-[5.5px] w-5"
      data-name="Frame"
    >
      <Frame35 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="absolute left-[83px] size-[15px] top-1.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 15 15"
      >
        <g id="Frame">
          <path
            clipRule="evenodd"
            d={svgPaths.pb703280}
            fill="var(--fill-0, #4338CA)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Select5() {
  return (
    <div
      className="absolute bg-indigo-100 h-[27px] left-[142.281px] rounded top-0 w-[106px]"
      data-name="select"
    >
      <div className="absolute border border-indigo-300 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[27px] justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden text-[12px] text-indigo-700 text-left text-nowrap top-[13.5px] translate-y-[-50%] w-[41px]">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          Normal
        </p>
      </div>
      <Frame37 />
    </div>
  );
}

function Div29() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[27px] left-3 top-3 w-[248.281px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame36 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-7 not-italic text-[16px] text-indigo-800 text-left top-[0.62px] w-[106px]">
        <p className="block leading-[24px]">Main Workout</p>
      </div>
      <Select5 />
    </div>
  );
}

function Frame38() {
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
            fill="var(--fill-0, #4F46E5)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame39() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3.5"
      data-name="Frame"
    >
      <Frame38 />
    </div>
  );
}

function Button14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[1102px] top-[13.5px] w-3.5"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame39 />
    </div>
  );
}

function Div30() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-px top-px w-[1128px]"
      data-name="div"
    >
      <div className="absolute border-[0px_0px_1px] border-indigo-200 border-solid inset-0 pointer-events-none" />
      <Div29 />
      <Button14 />
    </div>
  );
}

function Frame40() {
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
            d={svgPaths.p5d54b40}
            fill="var(--fill-0, #9CA3AF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame41() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-2.5"
      data-name="Frame"
    >
      <Frame40 />
    </div>
  );
}

function Frame42() {
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

function Svg6() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-5"
      data-name="svg"
    >
      <Frame42 />
    </div>
  );
}

function I6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-1.5 top-1 w-5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg6 />
    </div>
  );
}

function Div31() {
  return (
    <div
      className="absolute bg-gray-800 left-[22px] rounded-md size-8 top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I6 />
    </div>
  );
}

function Input6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[66px] rounded top-1 w-[242px]"
      data-name="input"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-1 not-italic text-[16px] text-gray-800 text-left top-0 w-[104px]">
        <p className="block leading-[24px]">Barbell Squat</p>
      </div>
    </div>
  );
}

function Div32() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-[308px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame41 />
      <Div31 />
      <Input6 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="h-3.5 relative shrink-0 w-[12.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_503)">
            <path
              d={svgPaths.p38632e00}
              fill="var(--fill-0, #6B7280)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_503">
            <path d="M0 0H12.25V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame44() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 overflow-clip p-0 top-[2.75px] w-[12.25px]"
      data-name="Frame"
    >
      <Frame43 />
    </div>
  );
}

function Button15() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0.5 w-[55.188px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame44 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[36.25px] not-italic text-[14px] text-center text-gray-500 top-[-0.1px] translate-x-[-50%] w-10">
        <p className="block leading-[normal]">Notes</p>
      </div>
    </div>
  );
}

function Frame45() {
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
            fill="var(--fill-0, #6B7280)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame46() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-1"
      data-name="Frame"
    >
      <Frame45 />
    </div>
  );
}

function Button16() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[63.188px] top-0 w-1"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame46 />
    </div>
  );
}

function Div33() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[994.812px] top-1 w-[67.188px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button15 />
      <Button16 />
    </div>
  );
}

function Div34() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[17px] top-[17px] w-[1062px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div32 />
      <Div33 />
    </div>
  );
}

function Label8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[1062px]"
      data-name="label"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[-0.1px] w-[73px]">
        <p className="block leading-[normal]">Rest Timer</p>
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <div className="absolute left-[1033px] size-[21px] top-2" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 21 21"
      >
        <g id="Frame">
          <path
            clipRule="evenodd"
            d={svgPaths.p1a6425c0}
            fill="var(--fill-0, black)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Select6() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[37px] left-0 rounded-md top-7 w-[1062px]"
      data-name="select"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden size-[37px] text-[#000000] text-[14px] text-left text-nowrap top-[18.5px] translate-y-[-50%]">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          00:15
        </p>
      </div>
      <Frame47 />
    </div>
  );
}

function Div35() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[65px] left-[17px] top-[65px] w-[1062px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Label8 />
      <Select6 />
    </div>
  );
}

function Label9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-[3.5px] w-[26.641px]"
      data-name="label"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-[-0.1px] w-[27px]">
        <p className="block leading-[normal]">SET</p>
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="absolute left-[93px] size-[15px] top-1.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 15 15"
      >
        <g id="Frame">
          <path
            clipRule="evenodd"
            d={svgPaths.pb703280}
            fill="var(--fill-0, #4B5563)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Select7() {
  return (
    <div
      className="absolute bg-gray-100 h-[27px] left-[946px] rounded-md top-0 w-[116px]"
      data-name="select"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[27px] justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden text-[14px] text-gray-600 text-left text-nowrap top-[13.5px] translate-y-[-50%] w-9">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          REPS
        </p>
      </div>
      <Frame48 />
    </div>
  );
}

function Div36() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[27px] left-0 top-0 w-[1062px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Label9 />
      <Select7 />
    </div>
  );
}

function Span5() {
  return (
    <div
      className="absolute bg-[#ffffff] left-[9px] rounded-md size-8 top-3"
      data-name="span"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[8.969px] not-italic text-[14px] text-gray-600 text-left top-[5.9px] w-3.5">
        <p className="block leading-[normal]">W</p>
      </div>
    </div>
  );
}

function Input7() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[38px] left-[483px] rounded-md top-[9px] w-24"
      data-name="input"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[38px] leading-[0] left-[9px] not-italic text-[#000000] text-[16px] text-center top-1.5 translate-x-[-50%] w-[18px]">
        <p className="block leading-[24px]">10</p>
      </div>
    </div>
  );
}

function Frame49() {
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
            d={svgPaths.pf5d1f80}
            fill="var(--fill-0, #9CA3AF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame50() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-2.5 overflow-clip p-0 top-2 w-3"
      data-name="Frame"
    >
      <Frame49 />
    </div>
  );
}

function Button17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[1021px] size-8 top-3"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame50 />
    </div>
  );
}

function Div37() {
  return (
    <div
      className="absolute bg-gray-50 h-14 left-0 rounded-lg top-0 w-[1062px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Span5 />
      <Input7 />
      <Button17 />
    </div>
  );
}

function Span6() {
  return (
    <div
      className="absolute bg-[#ffffff] left-[9px] rounded-md size-8 top-3"
      data-name="span"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[13.094px] not-italic text-[14px] text-gray-600 text-left top-[5.9px] w-[7px]">
        <p className="block leading-[normal]">1</p>
      </div>
    </div>
  );
}

function Input8() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[38px] left-[483px] rounded-md top-[9px] w-24"
      data-name="input"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[38px] leading-[0] left-[17.5px] not-italic text-[#000000] text-[16px] text-center top-1.5 translate-x-[-50%] w-[35px]">
        <p className="block leading-[24px]">8-12</p>
      </div>
    </div>
  );
}

function Frame51() {
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
            d={svgPaths.pf5d1f80}
            fill="var(--fill-0, #9CA3AF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame52() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-2.5 overflow-clip p-0 top-2 w-3"
      data-name="Frame"
    >
      <Frame51 />
    </div>
  );
}

function Button18() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[1021px] size-8 top-3"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame52 />
    </div>
  );
}

function Div38() {
  return (
    <div
      className="absolute bg-gray-50 h-14 left-0 rounded-lg top-16 w-[1062px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Span6 />
      <Input8 />
      <Button18 />
    </div>
  );
}

function Span7() {
  return (
    <div
      className="absolute bg-[#ffffff] left-[9px] rounded-md size-8 top-3"
      data-name="span"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[11.672px] not-italic text-[14px] text-gray-600 text-left top-[5.9px] w-[9px]">
        <p className="block leading-[normal]">2</p>
      </div>
    </div>
  );
}

function Input9() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[38px] left-[483px] rounded-md top-[9px] w-24"
      data-name="input"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[38px] leading-[0] left-[17.5px] not-italic text-[#000000] text-[16px] text-center top-1.5 translate-x-[-50%] w-[35px]">
        <p className="block leading-[24px]">8-12</p>
      </div>
    </div>
  );
}

function Frame53() {
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
            d={svgPaths.pf5d1f80}
            fill="var(--fill-0, #9CA3AF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame54() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-2.5 overflow-clip p-0 top-2 w-3"
      data-name="Frame"
    >
      <Frame53 />
    </div>
  );
}

function Button19() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[1021px] size-8 top-3"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame54 />
    </div>
  );
}

function Div39() {
  return (
    <div
      className="absolute bg-gray-50 h-14 left-0 rounded-lg top-32 w-[1062px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Span7 />
      <Input9 />
      <Button19 />
    </div>
  );
}

function Span8() {
  return (
    <div
      className="absolute bg-[#ffffff] left-[9px] rounded-md size-8 top-[23px]"
      data-name="span"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[11.609px] not-italic text-[14px] text-gray-600 text-left top-[5.9px] w-2.5">
        <p className="block leading-[normal]">3</p>
      </div>
    </div>
  );
}

function Span9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[60px] left-[483px] top-[9px] w-24"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[48.063px] not-italic text-[16px] text-center text-gray-700 top-[6.56px] translate-x-[-50%] w-[19px]">
        <p className="block leading-[normal]">To</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[48.422px] not-italic text-[16px] text-center text-gray-700 top-[30.56px] translate-x-[-50%] w-[52px]">
        <p className="block leading-[normal]">Failure</p>
      </div>
    </div>
  );
}

function Frame55() {
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
            d={svgPaths.pf5d1f80}
            fill="var(--fill-0, #9CA3AF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame56() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-2.5 overflow-clip p-0 top-2 w-3"
      data-name="Frame"
    >
      <Frame55 />
    </div>
  );
}

function Button20() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[1021px] size-8 top-[23px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame56 />
    </div>
  );
}

function Div40() {
  return (
    <div
      className="absolute bg-gray-50 h-[78px] left-0 rounded-lg top-48 w-[1062px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Span8 />
      <Span9 />
      <Button20 />
    </div>
  );
}

function Div41() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[270px] left-0 top-[35px] w-[1062px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div37 />
      <Div38 />
      <Div39 />
      <Div40 />
    </div>
  );
}

function Div42() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[305px] left-[17px] top-[146px] w-[1062px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div36 />
      <Div41 />
    </div>
  );
}

function Frame57() {
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
            fill="var(--fill-0, #4B5563)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame58() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-[494.641px] overflow-clip p-0 top-[11.75px] w-[12.25px]"
      data-name="Frame"
    >
      <Frame57 />
    </div>
  );
}

function Button21() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-[17px] rounded-md top-[467px] w-[1062px]"
      data-name="button"
    >
      <div className="absolute border border-dashed border-gray-300 inset-0 pointer-events-none rounded-md" />
      <Frame58 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[541.391px] not-italic text-[14px] text-center text-gray-600 top-[8.9px] translate-x-[-50%] w-[53px]">
        <p className="block leading-[normal]">Add Set</p>
      </div>
    </div>
  );
}

function Div43() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[522px] left-4 rounded-lg top-4 w-[1096px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div34 />
      <Div35 />
      <Div42 />
      <Button21 />
    </div>
  );
}

function Div44() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[554px] left-px top-[53px] w-[1128px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div43 />
    </div>
  );
}

function Frame59() {
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
            d={svgPaths.p3ad83b00}
            fill="var(--fill-0, #16A34A)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame60() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 overflow-clip p-0 size-4 top-[5.5px]"
      data-name="Frame"
    >
      <Frame59 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="absolute left-[74px] size-[15px] top-1.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 15 15"
      >
        <g id="Frame">
          <path
            clipRule="evenodd"
            d={svgPaths.pb703280}
            fill="var(--fill-0, #15803D)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Select8() {
  return (
    <div
      className="absolute bg-green-100 h-[27px] left-[116.688px] rounded top-0 w-[97px]"
      data-name="select"
    >
      <div className="absolute border border-green-300 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[27px] justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden text-[12px] text-green-700 text-left text-nowrap top-[13.5px] translate-y-[-50%] w-[41px]">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          Normal
        </p>
      </div>
      <Frame61 />
    </div>
  );
}

function Div45() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[27px] left-3 top-3 w-[213.688px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame60 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-6 not-italic text-[16px] text-green-800 text-left top-[0.62px] w-[85px]">
        <p className="block leading-[24px]">Cool-down</p>
      </div>
      <Select8 />
    </div>
  );
}

function Frame62() {
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
            fill="var(--fill-0, #16A34A)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame63() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3.5"
      data-name="Frame"
    >
      <Frame62 />
    </div>
  );
}

function Button22() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[1100px] top-[13.5px] w-3.5"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame63 />
    </div>
  );
}

function Div46() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-px top-px w-[1126px]"
      data-name="div"
    >
      <div className="absolute border-[0px_0px_1px] border-green-200 border-solid inset-0 pointer-events-none" />
      <Div45 />
      <Button22 />
    </div>
  );
}

function Frame64() {
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
            d={svgPaths.p5d54b40}
            fill="var(--fill-0, #9CA3AF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame65() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-2.5"
      data-name="Frame"
    >
      <Frame64 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="h-4 relative shrink-0 w-[18px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 16"
      >
        <g id="Frame">
          <path d="M18 16H0V0H18V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p2532fb00}
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
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-[18px]"
      data-name="svg"
    >
      <Frame66 />
    </div>
  );
}

function I7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[7px] top-1 w-[18px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg7 />
    </div>
  );
}

function Div47() {
  return (
    <div
      className="absolute bg-gray-800 left-[22px] rounded-md size-8 top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I7 />
    </div>
  );
}

function Input10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[66px] rounded top-1 w-[242px]"
      data-name="input"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-1 not-italic text-[16px] text-gray-800 text-left top-0 w-[130px]">
        <p className="block leading-[24px]">Static Stretching</p>
      </div>
    </div>
  );
}

function Div48() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-[308px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame65 />
      <Div47 />
      <Input10 />
    </div>
  );
}

function Frame67() {
  return (
    <div className="h-3.5 relative shrink-0 w-[12.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_503)">
            <path
              d={svgPaths.p38632e00}
              fill="var(--fill-0, #6B7280)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_503">
            <path d="M0 0H12.25V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame68() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 overflow-clip p-0 top-[2.75px] w-[12.25px]"
      data-name="Frame"
    >
      <Frame67 />
    </div>
  );
}

function Button23() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0.5 w-[55.188px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame68 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[36.25px] not-italic text-[14px] text-center text-gray-500 top-[-0.1px] translate-x-[-50%] w-10">
        <p className="block leading-[normal]">Notes</p>
      </div>
    </div>
  );
}

function Frame69() {
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
            fill="var(--fill-0, #6B7280)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame70() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-1"
      data-name="Frame"
    >
      <Frame69 />
    </div>
  );
}

function Button24() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[63.188px] top-0 w-1"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame70 />
    </div>
  );
}

function Div49() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[992.812px] top-1 w-[67.188px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button23 />
      <Button24 />
    </div>
  );
}

function Div50() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[17px] top-[17px] w-[1060px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div48 />
      <Div49 />
    </div>
  );
}

function Div51() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[66px] left-4 rounded-lg top-4 w-[1094px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div50 />
    </div>
  );
}

function Div52() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[98px] left-px top-[53px] w-[1126px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div51 />
    </div>
  );
}

function Div53() {
  return (
    <div
      className="absolute bg-[rgba(240,253,244,0.5)] h-[152px] left-px rounded-lg top-[607px] w-[1128px]"
      data-name="div"
    >
      <div className="absolute border border-green-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div46 />
      <Div52 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="h-4 relative shrink-0 w-[18px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 16"
      >
        <g id="Frame">
          <path d="M18 16H0V0H18V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p2b97cf00}
            fill="var(--fill-0, #4B5563)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame72() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[504.484px] overflow-clip p-0 top-4 w-[18px]"
      data-name="Frame"
    >
      <Frame71 />
    </div>
  );
}

function Button25() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-px rounded-lg top-[775px] w-[1128px]"
      data-name="button"
    >
      <div className="absolute border-2 border-dashed border-gray-300 inset-0 pointer-events-none rounded-lg" />
      <Frame72 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[577.484px] not-italic text-[16px] text-center text-gray-600 top-[12.56px] translate-x-[-50%] w-[94px]">
        <p className="block leading-[normal]">Add Section</p>
      </div>
    </div>
  );
}

function Div54() {
  return (
    <div
      className="absolute bg-[rgba(238,242,255,0.5)] h-[824px] left-px rounded-lg top-[456px] w-[1130px]"
      data-name="div"
    >
      <div className="absolute border border-indigo-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div30 />
      <Div44 />
      <Div53 />
      <Button25 />
    </div>
  );
}

function Div55() {
  return (
    <div
      className="absolute bg-[rgba(255,247,237,0.5)] h-[1281px] left-4 rounded-lg top-4 w-[1132px]"
      data-name="div"
    >
      <div className="absolute border border-orange-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div14 />
      <Div28 />
      <Div54 />
    </div>
  );
}

function Div56() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1313px] left-px top-[66px] w-[1164px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div55 />
    </div>
  );
}

function Frame73() {
  return (
    <div className="h-3.5 relative shrink-0 w-[17.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_458)">
            <path
              d={svgPaths.pc107780}
              fill="var(--fill-0, #4338CA)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_458">
            <path d="M0 0H17.5V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg8() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 p-0 top-[1.75px] w-[17.5px]"
      data-name="svg"
    >
      <Frame73 />
    </div>
  );
}

function I8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[17px] left-3 top-[5px] w-[17.5px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg8 />
    </div>
  );
}

function Frame74() {
  return (
    <div className="h-3.5 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 14"
      >
        <g id="Frame">
          <path d="M10.5 14H0V0H10.5V14Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p18a65c00}
            fill="var(--fill-0, #4338CA)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg9() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 p-0 top-[1.75px] w-[10.5px]"
      data-name="svg"
    >
      <Frame74 />
    </div>
  );
}

function I9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[17px] left-[93.984px] top-[5px] w-[10.5px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg9 />
    </div>
  );
}

function Span10() {
  return (
    <div
      className="absolute bg-indigo-100 h-[30px] left-0 rounded-[9999px] top-0 w-[120.422px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <I8 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[33.5px] not-italic text-[14px] text-indigo-700 text-left top-[3.9px] w-[58px]">
        <p className="block leading-[normal]">Strength</p>
      </div>
      <I9 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_455)">
            <path
              d={svgPaths.p3317a900}
              fill="var(--fill-0, #15803D)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_455">
            <path d="M0 0H14V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg10() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-3.5 top-[1.75px]"
      data-name="svg"
    >
      <Frame75 />
    </div>
  );
}

function I10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[17px] left-3 top-[5px] w-3.5"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg10 />
    </div>
  );
}

function Frame76() {
  return (
    <div className="h-3.5 relative shrink-0 w-[10.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 14"
      >
        <g id="Frame">
          <path d="M10.5 14H0V0H10.5V14Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p18a65c00}
            fill="var(--fill-0, #15803D)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg11() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 p-0 top-[1.75px] w-[10.5px]"
      data-name="svg"
    >
      <Frame76 />
    </div>
  );
}

function I11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[17px] left-[117.094px] top-[5px] w-[10.5px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg11 />
    </div>
  );
}

function Span11() {
  return (
    <div
      className="absolute bg-green-100 h-[30px] left-[124.484px] rounded-[9999px] top-0 w-[143.531px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <I10 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[30px] not-italic text-[14px] text-green-700 text-left top-[3.9px] w-[84px]">
        <p className="block leading-[normal]">Hypertrophy</p>
      </div>
      <I11 />
    </div>
  );
}

function Frame77() {
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
            fill="var(--fill-0, #6B7280)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame78() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-[13px] overflow-clip p-0 top-[7.75px] w-[12.25px]"
      data-name="Frame"
    >
      <Frame77 />
    </div>
  );
}

function Button26() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[30px] left-[272.078px] rounded-[9999px] top-0 w-[135.547px]"
      data-name="button"
    >
      <div className="absolute border border-dashed border-gray-300 inset-0 pointer-events-none rounded-[9999px]" />
      <Frame78 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[76.25px] not-italic text-[14px] text-center text-gray-500 top-[4.9px] translate-x-[-50%] w-[94px]">
        <p className="block leading-[normal]">Add Objective</p>
      </div>
    </div>
  );
}

function Div57() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[30px] left-0 top-0 w-[546px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span10 />
      <Span11 />
      <Button26 />
    </div>
  );
}

function Div58() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[30px] left-0 top-7 w-[546px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div57 />
    </div>
  );
}

function Div59() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[68px] left-[537.072px] top-[-13.176px] w-[546px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div58 />
    </div>
  );
}

function Div60() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1380px] left-0 rounded-lg top-16 w-[1166px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div12 />
      <Div56 />
      <Div59 />
    </div>
  );
}

function Div61() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1444px] left-[25px] top-[459px] w-[1166px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div7 />
      <Div60 />
    </div>
  );
}

function Div62() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[1928px] left-8 rounded-xl top-[104px] w-[1216px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div6 />
      <Div61 />
    </div>
  );
}

function Div63() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[2056px] left-20 top-[65px] w-[1280px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div />
      <Div62 />
    </div>
  );
}

function Frame79() {
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

function Frame80() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[9.25px] overflow-clip p-0 top-[6.25px] w-[13.5px]"
      data-name="Frame"
    >
      <Frame79 />
    </div>
  );
}

function Div64() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[#4f46e5] left-0 rounded-md size-8 to-[#3730a3] top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame80 />
    </div>
  );
}

function Div65() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-1 w-[157.062px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div64 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-10 not-italic text-[20px] text-gray-800 text-left top-[0.08px] w-[118px]">
        <p className="block leading-[28px]">Peak Health</p>
      </div>
    </div>
  );
}

function Frame81() {
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
            d={svgPaths.p1906b80}
            fill="var(--fill-0, #374151)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame82() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[13px] overflow-clip p-0 top-3 w-3.5"
      data-name="Frame"
    >
      <Frame81 />
    </div>
  );
}

function Frame83() {
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
            fill="var(--fill-0, #374151)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame84() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[146.531px] overflow-clip p-0 top-3 w-5"
      data-name="Frame"
    >
      <Frame83 />
    </div>
  );
}

function Frame85() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_425)">
            <path
              d={svgPaths.p203b4600}
              fill="var(--fill-0, #4F46E5)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_425">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg12() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-4 top-1"
      data-name="svg"
    >
      <Frame85 />
    </div>
  );
}

function I12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-3 top-2 w-4"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg12 />
    </div>
  );
}

function Span12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-9 top-2 w-[66.563px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-indigo-600 text-left top-[0.56px] w-[67px]">
        <p className="block leading-[normal]">Routines</p>
      </div>
    </div>
  );
}

function Span13() {
  return (
    <div
      className="absolute bg-indigo-50 h-10 left-[258.844px] rounded-md top-0 w-[114.562px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I12 />
      <Span12 />
    </div>
  );
}

function Frame86() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_506)">
            <path
              d={svgPaths.p31ab3f00}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_506">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame87() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[390.406px] overflow-clip p-0 top-3 w-3.5"
      data-name="Frame"
    >
      <Frame86 />
    </div>
  );
}

function Frame88() {
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
            d={svgPaths.p1efa7f0}
            fill="var(--fill-0, #374151)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame89() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[509.547px] overflow-clip p-0 size-4 top-3"
      data-name="Frame"
    >
      <Frame88 />
    </div>
  );
}

function Nav() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[189.062px] top-0 w-[614.359px]"
      data-name="nav"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-12 leading-[0] left-9 not-italic text-[16px] text-gray-700 text-left top-[7.12px] w-[83px]">
        <p className="block leading-[24px]">Dashboard</p>
      </div>
      <Frame82 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-12 leading-[0] left-[170.531px] not-italic text-[16px] text-gray-700 text-left top-[7.12px] w-[72px]">
        <p className="block leading-[24px]">Exercises</p>
      </div>
      <Frame84 />
      <Span13 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-12 leading-[0] left-[413.406px] not-italic text-[16px] text-gray-700 text-left top-[7.12px] w-[69px]">
        <p className="block leading-[24px]">Calendar</p>
      </div>
      <Frame87 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-12 leading-[0] left-[533.547px] not-italic text-[16px] text-gray-700 text-left top-[7.12px] w-[70px]">
        <p className="block leading-[24px]">Statistics</p>
      </div>
      <Frame89 />
    </div>
  );
}

function Div66() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-0 top-3 w-[803.422px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div65 />
      <Nav />
    </div>
  );
}

function Frame90() {
  return (
    <div className="h-3.5 relative shrink-0 w-[12.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_419)">
            <path
              d={svgPaths.p15680000}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_419">
            <path d="M0 0H12.25V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame91() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-[16.938px] overflow-clip p-0 top-[11.75px] w-[12.25px]"
      data-name="Frame"
    >
      <Frame90 />
    </div>
  );
}

function Button27() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-0 rounded-md top-0 w-[78.891px]"
      data-name="button"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame91 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[49.688px] not-italic text-[14px] text-center text-gray-700 top-[8.9px] translate-x-[-50%] w-[33px]">
        <p className="block leading-[normal]">Back</p>
      </div>
    </div>
  );
}

function Frame92() {
  return (
    <div className="h-3.5 relative shrink-0 w-[12.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_482)">
            <path
              d={svgPaths.p17414af0}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_482">
            <path d="M0 0H12.25V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg13() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 p-0 top-[1.75px] w-[12.25px]"
      data-name="svg"
    >
      <Frame92 />
    </div>
  );
}

function I13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[17px] left-[15.938px] top-[9px] w-[12.25px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg13 />
    </div>
  );
}

function Button28() {
  return (
    <div
      className="absolute bg-indigo-600 h-9 left-[90.891px] rounded-md top-px w-[76.594px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I13 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[48.688px] not-italic text-[#ffffff] text-[14px] text-center top-[7.9px] translate-x-[-50%] w-[33px]">
        <p className="block leading-[normal]">Save</p>
      </div>
    </div>
  );
}

function Div67() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-4 top-0 w-[167.484px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button27 />
      <Button28 />
    </div>
  );
}

function Img() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat left-0 rounded-[9999px] size-8 top-0"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg}')` }}
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Div68() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-10 top-1.5 w-[84.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-800 text-left top-[-1.2px] w-[84px]">
        <p className="block leading-[20px]">Alex Morgan</p>
      </div>
    </div>
  );
}

function Div69() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[199.484px] top-[3px] w-[124.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Img />
      <Div68 />
    </div>
  );
}

function Div70() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-[892.172px] top-[13px] w-[323.828px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div67 />
      <Div69 />
    </div>
  );
}

function Div71() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-8 top-0 w-[1216px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div66 />
      <Div70 />
    </div>
  );
}

function Div72() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-20 top-0 w-[1280px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div71 />
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
      <Div72 />
    </div>
  );
}

function Body() {
  return (
    <div
      className="bg-gray-50 h-[2121px] relative shrink-0 w-[1440px]"
      data-name="body"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div63 />
      <Header />
    </div>
  );
}

export default function RoutineCreation() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-lg size-full"
      data-name="Routine creation"
    >
      <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative size-full">
        <Body />
      </div>
      <div className="absolute border-2 border-[#ced4da] border-solid inset-0 pointer-events-none rounded-lg" />
    </div>
  );
}