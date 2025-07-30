import svgPaths from "./svg-tgetvjh75e";
import imgImg from "figma:asset/531ff4801200af9f1f5fed2d6e6f84533ac5deeb.png";
import imgImg1 from "figma:asset/410c340aa057242400c608368f918307cdd72438.png";

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
          <g clipPath="url(#clip0_3_1122)">
            <path
              d={svgPaths.p3a537480}
              fill="var(--fill-0, #6B7280)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_1122">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-3.5"
      data-name="Frame"
    >
      <Frame />
    </div>
  );
}

function Div() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-[208.469px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame1 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-[22px] not-italic text-[24px] text-gray-800 text-left top-[-4.76px] w-[188px]">
        <p className="block leading-[32px]">Exercise Details</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-3 relative shrink-0 w-[7.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 8 12"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_1107)">
            <path
              d={svgPaths.p2dae2800}
              fill="var(--fill-0, #9CA3AF)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_1107">
            <path d="M0 0H7.5V12H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3 items-center justify-center left-[80.313px] overflow-clip p-0 top-[5.5px] w-[7.5px]"
      data-name="Frame"
    >
      <Frame2 />
    </div>
  );
}

function Div1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-9 w-[208.469px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-500 text-left top-[-0.88px] w-[72px]">
        <p className="block leading-[24px]">Exercises</p>
      </div>
      <Frame3 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[95.813px] not-italic text-[16px] text-indigo-600 text-left top-[-0.88px] w-[94px]">
        <p className="block leading-[24px]">Bench Press</p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[60px] left-0 top-0 w-[208.469px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div />
      <Div1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_1119)">
            <path
              d={svgPaths.p35413000}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_1119">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[17px] overflow-clip p-0 size-4 top-[13px]"
      data-name="Frame"
    >
      <Frame4 />
    </div>
  );
}

function Button() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-0 rounded-md top-0 w-[92.969px]"
      data-name="button"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md" />
      <Frame5 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[59px] not-italic text-[16px] text-center text-gray-700 top-[8.12px] translate-x-[-50%] w-9">
        <p className="block leading-[24px]">Print</p>
      </div>
    </div>
  );
}

function Div3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[42px] left-[1123.03px] top-[9px] w-[92.969px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button />
    </div>
  );
}

function Div4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[60px] left-8 top-8 w-[1216px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div2 />
      <Div3 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-5 relative shrink-0 w-[25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 25 20"
      >
        <g id="Frame">
          <path d="M25 20H0V0H25V20Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p1d310c00}
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
      className="absolute box-border content-stretch flex flex-row h-5 items-center justify-center left-0 p-0 top-[1.5px] w-[25px]"
      data-name="svg"
    >
      <Frame6 />
    </div>
  );
}

function I() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-3 top-3.5 w-[25px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg />
    </div>
  );
}

function Div5() {
  return (
    <div
      className="absolute bg-indigo-600 h-[52px] left-0 rounded-md top-0 w-[49px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I />
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-4 relative shrink-0 w-5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_1110)">
            <path
              d={svgPaths.p1b4569c0}
              fill="var(--fill-0, #6B7280)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_1110">
            <path d="M0 0H20V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-5"
      data-name="Frame"
    >
      <Frame7 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="h-4 relative shrink-0 w-[18px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_1116)">
            <path
              d={svgPaths.p1e351580}
              fill="var(--fill-0, #FACC15)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_1116">
            <path d="M0 0H18V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-[97.875px] overflow-clip p-0 top-1 w-[18px]"
      data-name="Frame"
    >
      <Frame9 />
    </div>
  );
}

function Div6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-0 top-9 w-[242.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-12 leading-[0] left-6 not-italic text-[16px] text-gray-500 text-left top-[-0.88px] w-[58px]">
        <p className="block leading-[24px]">Popular</p>
      </div>
      <Frame8 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-12 leading-[0] left-[119.875px] not-italic text-[16px] text-gray-500 text-left top-[-1.36px] w-[124px]">
        <p className="block leading-[24px]">4.8 (124 ratings)</p>
      </div>
      <Frame10 />
    </div>
  );
}

function Div7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[60px] left-0 top-0 w-[242.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-0 not-italic text-[24px] text-gray-800 text-left top-[-4.44px] w-[146px]">
        <p className="block leading-[32px]">Bench Press</p>
      </div>
      <Div6 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-4 relative shrink-0 w-3" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_1113)">
            <path
              d={svgPaths.p1e661200}
              fill="var(--fill-0, #6B7280)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_1113">
            <path d="M0 0H12V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-2 overflow-clip p-0 top-3 w-3"
      data-name="Frame"
    >
      <Frame11 />
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-0 rounded-[9999px] top-0 w-7"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Frame12 />
    </div>
  );
}

function Frame13() {
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
            d={svgPaths.p366d0c80}
            fill="var(--fill-0, #6B7280)"
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
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-2 overflow-clip p-0 top-3 w-3.5"
      data-name="Frame"
    >
      <Frame13 />
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-9 rounded-[9999px] top-0 w-[30px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Frame14 />
    </div>
  );
}

function Div8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[613.656px] top-0 w-[66px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Div9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[60px] left-0 top-0 w-[679.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div7 />
      <Div8 />
    </div>
  );
}

function Span() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[17px] left-[62.563px] top-4 w-[32.766px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[16.5px] not-italic text-[14px] text-center text-gray-500 top-[-1.1px] translate-x-[-50%] w-[33px]">
        <p className="block leading-[normal]">Type</p>
      </div>
    </div>
  );
}

function P() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-3 top-9 w-[133.906px]"
      data-name="p"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[67.609px] not-italic text-[16px] text-center text-gray-800 top-[0.56px] translate-x-[-50%] w-[67px]">
        <p className="block leading-[normal]">Strength</p>
      </div>
    </div>
  );
}

function Div10() {
  return (
    <div
      className="absolute bg-gray-50 h-[72px] left-0 rounded-lg top-0 w-[157.906px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Span />
      <P />
    </div>
  );
}

function Span1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[17px] left-[43.703px] top-4 w-[70.516px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[35.5px] not-italic text-[14px] text-center text-gray-500 top-[-1.1px] translate-x-[-50%] w-[71px]">
        <p className="block leading-[normal]">Equipment</p>
      </div>
    </div>
  );
}

function P1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-3 top-9 w-[133.922px]"
      data-name="p"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[66.594px] not-italic text-[16px] text-center text-gray-800 top-[0.56px] translate-x-[-50%] w-[110px]">
        <p className="block leading-[normal]">Barbell, Bench</p>
      </div>
    </div>
  );
}

function Div11() {
  return (
    <div
      className="absolute bg-gray-50 h-[72px] left-[173.906px] rounded-lg top-0 w-[157.922px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Span1 />
      <P1 />
    </div>
  );
}

function Span2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[17px] left-[49.297px] top-4 w-[59.297px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[29.5px] not-italic text-[14px] text-center text-gray-500 top-[-1.1px] translate-x-[-50%] w-[59px]">
        <p className="block leading-[normal]">Difficulty</p>
      </div>
    </div>
  );
}

function P2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-3 top-9 w-[133.906px]"
      data-name="p"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[67.766px] not-italic text-[16px] text-center text-gray-800 top-[0.56px] translate-x-[-50%] w-[98px]">
        <p className="block leading-[normal]">Intermediate</p>
      </div>
    </div>
  );
}

function Div12() {
  return (
    <div
      className="absolute bg-gray-50 h-[72px] left-[347.828px] rounded-lg top-0 w-[157.906px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Span2 />
      <P2 />
    </div>
  );
}

function Span3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[17px] left-[42.953px] top-4 w-[72px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-9 not-italic text-[14px] text-center text-gray-500 top-[-1.1px] translate-x-[-50%] w-[72px]">
        <p className="block leading-[normal]">Mechanics</p>
      </div>
    </div>
  );
}

function P3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-3 top-9 w-[133.922px]"
      data-name="p"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[67.297px] not-italic text-[16px] text-center text-gray-800 top-[0.56px] translate-x-[-50%] w-[85px]">
        <p className="block leading-[normal]">Compound</p>
      </div>
    </div>
  );
}

function Div13() {
  return (
    <div
      className="absolute bg-gray-50 h-[72px] left-[521.734px] rounded-lg top-0 w-[157.922px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Span3 />
      <P3 />
    </div>
  );
}

function Div14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[72px] left-0 top-[84px] w-[679.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div10 />
      <Div11 />
      <Div12 />
      <Div13 />
    </div>
  );
}

function Div15() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[118px] left-0 top-[180px] w-[679.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-0 not-italic text-[18px] text-gray-800 text-left top-[-0.92px] w-[101px]">
        <p className="block leading-[28px]">Description</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[78px] leading-[0] left-0 not-italic text-[16px] text-gray-700 text-left top-[41.64px] w-[677px]">
        <p className="block leading-[26px]">{`The bench press is a compound exercise that targets the chest, shoulders, and triceps. It's one of the most popular strength training exercises and is essential for building upper body strength.`}</p>
      </div>
    </div>
  );
}

function Span4() {
  return (
    <div
      className="absolute bg-indigo-100 h-8 left-0 rounded-[9999px] top-0 w-[63.219px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-3 not-italic text-[14px] text-indigo-700 text-left top-[5.9px] w-10">
        <p className="block leading-[normal]">Chest</p>
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div
      className="absolute bg-indigo-100 h-8 left-[71.219px] rounded-[9999px] top-0 w-[91.703px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-3 not-italic text-[14px] text-indigo-700 text-left top-[5.9px] w-[68px]">
        <p className="block leading-[normal]">Shoulders</p>
      </div>
    </div>
  );
}

function Span6() {
  return (
    <div
      className="absolute bg-indigo-100 h-8 left-[170.922px] rounded-[9999px] top-0 w-[73.906px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-3 not-italic text-[14px] text-indigo-700 text-left top-[5.9px] w-[50px]">
        <p className="block leading-[normal]">Triceps</p>
      </div>
    </div>
  );
}

function Div16() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-10 w-[679.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span4 />
      <Span5 />
      <Span6 />
    </div>
  );
}

function Div17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[72px] left-0 top-[322px] w-[679.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-0 not-italic text-[18px] text-gray-800 text-left top-[-0.92px] w-[145px]">
        <p className="block leading-[28px]">Primary Muscles</p>
      </div>
      <Div16 />
    </div>
  );
}

function Div18() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[394px] left-[73px] top-0 w-[679.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div9 />
      <Div14 />
      <Div15 />
      <Div17 />
    </div>
  );
}

function Div19() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[394px] left-[25px] top-[25px] w-[752.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div5 />
      <Div18 />
    </div>
  );
}

function Div20() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[444px] left-0 rounded-xl top-0 w-[802.656px]"
      data-name="div"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div19 />
    </div>
  );
}

function Frame15() {
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
            fill="var(--fill-0, #4F46E5)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-5 items-center justify-center left-0 p-0 top-[1.5px] w-[15px]"
      data-name="svg"
    >
      <Frame15 />
    </div>
  );
}

function I1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-4 top-[18px] w-[15px]"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg1 />
    </div>
  );
}

function Button3() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.8)] h-[60px] left-[170.172px] rounded-[9999px] top-[95px] w-[47px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <I1 />
    </div>
  );
}

function Div21() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[250px] left-0 top-0 w-[387.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button3 />
    </div>
  );
}

function Img() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-[250px] left-0 top-0 w-[387.344px]"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg}')` }}
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Div22() {
  return (
    <div
      className="absolute bg-gray-100 h-[250px] left-px top-px w-[387.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div21 />
      <Img />
    </div>
  );
}

function Button4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[281.203px] top-0 w-[74.141px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[37px] not-italic text-[14px] text-center text-indigo-600 top-[-0.1px] translate-x-[-50%] w-[74px]">
        <p className="block leading-[normal]">Full Screen</p>
      </div>
    </div>
  );
}

function Div23() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-4 top-[108px] w-[355.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-[0.56px] w-[50px]">
        <p className="block leading-[16px]">3:45 min</p>
      </div>
      <Button4 />
    </div>
  );
}

function Div24() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-36 left-px top-[251px] w-[387.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-4 not-italic text-[16px] text-gray-800 text-left top-[14.88px] w-[164px]">
        <p className="block leading-[24px]">Demonstration Video</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-4 not-italic text-[14px] text-gray-600 text-left top-[52.6px] w-[347px]">
        <p className="block leading-[20px]">
          Watch this demonstration to ensure proper form and technique.
        </p>
      </div>
      <Div23 />
    </div>
  );
}

function Div25() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[444px] left-[826.656px] rounded-xl top-0 w-[389.344px]"
      data-name="div"
    >
      <div className="h-[444px] overflow-clip relative w-[389.344px]">
        <Div22 />
        <Div24 />
      </div>
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Section() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[444px] left-8 top-[124px] w-[1216px]"
      data-name="section"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div20 />
      <Div25 />
    </div>
  );
}

function H2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[25px] top-[25px] w-[1166px]"
      data-name="h2"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[20px] text-gray-800 text-left top-[-0.1px] w-[257px]">
        <p className="block leading-[normal]">Step-by-Step Instructions</p>
      </div>
    </div>
  );
}

function Span7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[16.547px] top-2 w-[6.906px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-0 not-italic text-[16px] text-indigo-600 text-left top-[0.56px] w-2">
        <p className="block leading-[normal]">1</p>
      </div>
    </div>
  );
}

function Div26() {
  return (
    <div
      className="absolute bg-indigo-100 left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Span7 />
    </div>
  );
}

function Div27() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-14 top-0 w-[823.109px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-gray-800 text-left top-[-0.88px] w-32">
        <p className="block leading-[24px]">Starting Position</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-700 text-left top-[27.12px] w-[824px]">
        <p className="block leading-[24px]">
          Lie flat on the bench with your feet planted firmly on the floor. Your
          eyes should be directly under the barbell.
        </p>
      </div>
    </div>
  );
}

function Div28() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-0 top-0 w-[1166px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div26 />
      <Div27 />
    </div>
  );
}

function Span8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[14.953px] top-2 w-[10.078px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-0 not-italic text-[16px] text-indigo-600 text-left top-[0.56px] w-[11px]">
        <p className="block leading-[normal]">2</p>
      </div>
    </div>
  );
}

function Div29() {
  return (
    <div
      className="absolute bg-indigo-100 left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Span8 />
    </div>
  );
}

function Div30() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-14 top-0 w-[853.5px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-gray-800 text-left top-[-0.88px] w-8">
        <p className="block leading-[24px]">Grip</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-700 text-left top-[27.12px] w-[856px]">
        <p className="block leading-[24px]">
          Grip the barbell with hands slightly wider than shoulder-width apart.
          Wrap your thumbs around the bar for safety.
        </p>
      </div>
    </div>
  );
}

function Div31() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-0 top-[76px] w-[1166px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div29 />
      <Div30 />
    </div>
  );
}

function Span9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[14.828px] top-2 w-[10.328px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-0 not-italic text-[16px] text-indigo-600 text-left top-[0.56px] w-[11px]">
        <p className="block leading-[normal]">3</p>
      </div>
    </div>
  );
}

function Div32() {
  return (
    <div
      className="absolute bg-indigo-100 left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Span9 />
    </div>
  );
}

function Div33() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-14 top-0 w-[879.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-gray-800 text-left top-[-0.88px] w-[122px]">
        <p className="block leading-[24px]">Lowering Phase</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-700 text-left top-[27.12px] w-[880px]">
        <p className="block leading-[24px]">
          Lower the bar slowly and under control to your mid-chest. Keep your
          elbows at approximately a 45-75 degree angle.
        </p>
      </div>
    </div>
  );
}

function Div34() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-0 top-[152px] w-[1166px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div32 />
      <Div33 />
    </div>
  );
}

function Span10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[14.578px] top-2 w-[10.828px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-0 not-italic text-[16px] text-indigo-600 text-left top-[0.56px] w-[11px]">
        <p className="block leading-[normal]">4</p>
      </div>
    </div>
  );
}

function Div35() {
  return (
    <div
      className="absolute bg-indigo-100 left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Span10 />
    </div>
  );
}

function Div36() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-14 top-0 w-[879.797px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-gray-800 text-left top-[-0.88px] w-[118px]">
        <p className="block leading-[24px]">Pressing Phase</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-700 text-left top-[27.12px] w-[880px]">
        <p className="block leading-[24px]">
          Push the bar back up to the starting position by extending your arms.
          Focus on pushing through your chest muscles.
        </p>
      </div>
    </div>
  );
}

function Div37() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-0 top-[228px] w-[1166px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div35 />
      <Div36 />
    </div>
  );
}

function Span11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[15.016px] top-2 w-[9.953px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-0 not-italic text-[16px] text-indigo-600 text-left top-[0.56px] w-[11px]">
        <p className="block leading-[normal]">5</p>
      </div>
    </div>
  );
}

function Div38() {
  return (
    <div
      className="absolute bg-indigo-100 left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Span11 />
    </div>
  );
}

function Div39() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-14 top-0 w-[539.375px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-gray-800 text-left top-[-0.88px] w-[74px]">
        <p className="block leading-[24px]">Breathing</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-700 text-left top-[27.12px] w-[538px]">
        <p className="block leading-[24px]">
          Inhale during the lowering phase and exhale during the pressing phase.
        </p>
      </div>
    </div>
  );
}

function Div40() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[52px] left-0 top-[304px] w-[1166px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div38 />
      <Div39 />
    </div>
  );
}

function Div41() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[356px] left-[25px] top-[77px] w-[1166px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div28 />
      <Div31 />
      <Div34 />
      <Div37 />
      <Div40 />
    </div>
  );
}

function Section1() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[458px] left-8 rounded-xl top-[600px] w-[1216px]"
      data-name="section"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <H2 />
      <Div41 />
    </div>
  );
}

function Div42() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-[25px] top-[25px] w-[1166px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[20px] text-gray-800 text-left top-[-2.2px] w-[82px]">
        <p className="block leading-[28px]">Variants</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[1112.23px] not-italic text-[14px] text-indigo-600 text-left top-[2.8px] w-[54px]">
        <p className="block leading-[20px]">View All</p>
      </div>
    </div>
  );
}

function Img1() {
  return (
    <div
      className="absolute bg-[#f0f0f0] box-border content-stretch flex flex-col items-center justify-center left-0 p-0 top-0 w-[370.656px]"
      data-name="img"
    >
      <div className="absolute border-0 border-dashed border-gray-200 inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[normal] not-italic relative shrink-0 text-[#999999] text-[12px] text-center text-nowrap whitespace-pre">
        <p className="block mb-0">IMG</p>
        <p className="block">370.65625×160</p>
      </div>
    </div>
  );
}

function Div43() {
  return (
    <div
      className="absolute bg-gray-100 h-40 left-px top-px w-[370.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Img1 />
    </div>
  );
}

function Span12() {
  return (
    <div
      className="absolute bg-indigo-100 h-6 left-0 rounded top-0 w-[125.109px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-2 not-italic text-[12px] text-indigo-700 text-left top-[3.28px] w-[109px]">
        <p className="block leading-[normal]">Upper Chest Focus</p>
      </div>
    </div>
  );
}

function Frame16() {
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
            d={svgPaths.p18af0c00}
            fill="var(--fill-0, #4F46E5)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame17() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3.5"
      data-name="Frame"
    >
      <Frame16 />
    </div>
  );
}

function Button5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[324.656px] top-0 w-3.5"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame17 />
    </div>
  );
}

function Div44() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-4 top-[76px] w-[338.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span12 />
      <Button5 />
    </div>
  );
}

function Div45() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[116px] left-px top-[161px] w-[370.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-4 not-italic text-[16px] text-gray-800 text-left top-[14.88px] w-[152px]">
        <p className="block leading-[24px]">Incline Bench Press</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-4 not-italic text-[14px] text-gray-600 text-left top-[42.8px] w-[319px]">
        <p className="block leading-[20px]">
          Targets upper chest more than flat bench press.
        </p>
      </div>
      <Div44 />
    </div>
  );
}

function Div46() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[298px] left-0 rounded-lg top-0 w-[372.656px]"
      data-name="div"
    >
      <div className="h-[298px] overflow-clip relative w-[372.656px]">
        <Div43 />
        <Div45 />
      </div>
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
    </div>
  );
}

function Img2() {
  return (
    <div
      className="absolute bg-[#f0f0f0] box-border content-stretch flex flex-col items-center justify-center left-0 p-0 top-0 w-[370.672px]"
      data-name="img"
    >
      <div className="absolute border-0 border-dashed border-gray-200 inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[normal] not-italic relative shrink-0 text-[#999999] text-[12px] text-center text-nowrap whitespace-pre">
        <p className="block mb-0">IMG</p>
        <p className="block">370.671875×160</p>
      </div>
    </div>
  );
}

function Div47() {
  return (
    <div
      className="absolute bg-gray-100 h-40 left-px top-px w-[370.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Img2 />
    </div>
  );
}

function Span13() {
  return (
    <div
      className="absolute bg-indigo-100 h-6 left-0 rounded top-0 w-[124.844px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-2 not-italic text-[12px] text-indigo-700 text-left top-[3.28px] w-[109px]">
        <p className="block leading-[normal]">Lower Chest Focus</p>
      </div>
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
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p18af0c00}
            fill="var(--fill-0, #4F46E5)"
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
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3.5"
      data-name="Frame"
    >
      <Frame18 />
    </div>
  );
}

function Button6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[324.672px] top-0 w-3.5"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame19 />
    </div>
  );
}

function Div48() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-4 top-[76px] w-[338.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span13 />
      <Button6 />
    </div>
  );
}

function Div49() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[116px] left-px top-[161px] w-[370.672px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-4 not-italic text-[16px] text-gray-800 text-left top-[14.88px] w-[158px]">
        <p className="block leading-[24px]">Decline Bench Press</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-4 not-italic text-[14px] text-gray-600 text-left top-[42.8px] w-[316px]">
        <p className="block leading-[20px]">
          Targets lower chest more than flat bench press.
        </p>
      </div>
      <Div48 />
    </div>
  );
}

function Div50() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[298px] left-[396.656px] rounded-lg top-0 w-[372.672px]"
      data-name="div"
    >
      <div className="h-[298px] overflow-clip relative w-[372.672px]">
        <Div47 />
        <Div49 />
      </div>
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
    </div>
  );
}

function Img3() {
  return (
    <div
      className="absolute bg-[#f0f0f0] box-border content-stretch flex flex-col items-center justify-center left-0 p-0 top-0 w-[370.656px]"
      data-name="img"
    >
      <div className="absolute border-0 border-dashed border-gray-200 inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[normal] not-italic relative shrink-0 text-[#999999] text-[12px] text-center text-nowrap whitespace-pre">
        <p className="block mb-0">IMG</p>
        <p className="block">370.65625×160</p>
      </div>
    </div>
  );
}

function Div51() {
  return (
    <div
      className="absolute bg-gray-100 h-40 left-px top-px w-[370.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Img3 />
    </div>
  );
}

function Span14() {
  return (
    <div
      className="absolute bg-indigo-100 h-6 left-0 rounded top-0 w-[105.922px]"
      data-name="span"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-2 not-italic text-[12px] text-indigo-700 text-left top-[3.28px] w-[90px]">
        <p className="block leading-[normal]">Stabilizer Focus</p>
      </div>
    </div>
  );
}

function Frame20() {
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
            d={svgPaths.p18af0c00}
            fill="var(--fill-0, #4F46E5)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame21() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-1 w-3.5"
      data-name="Frame"
    >
      <Frame20 />
    </div>
  );
}

function Button7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[324.656px] top-0 w-3.5"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame21 />
    </div>
  );
}

function Div52() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-4 top-24 w-[338.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span14 />
      <Button7 />
    </div>
  );
}

function Div53() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[136px] left-px top-[161px] w-[370.656px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-4 not-italic text-[16px] text-gray-800 text-left top-[15.12px] w-[174px]">
        <p className="block leading-[24px]">Dumbbell Bench Press</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-10 leading-[0] left-4 not-italic text-[14px] text-gray-600 text-left top-[44.6px] w-[296px]">
        <p className="block leading-[20px]">
          Allows greater range of motion and stabilizer engagement.
        </p>
      </div>
      <Div52 />
    </div>
  );
}

function Div54() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[298px] left-[793.328px] rounded-lg top-0 w-[372.656px]"
      data-name="div"
    >
      <div className="h-[298px] overflow-clip relative w-[372.656px]">
        <Div51 />
        <Div53 />
      </div>
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
    </div>
  );
}

function Div55() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[298px] left-[25px] top-[77px] w-[1166px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div46 />
      <Div50 />
      <Div54 />
    </div>
  );
}

function Section2() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[400px] left-8 rounded-xl top-[1090px] w-[1216px]"
      data-name="section"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div42 />
      <Div55 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="h-4 relative shrink-0 w-3" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_1086)">
            <path
              d={svgPaths.p2dac7d80}
              fill="var(--fill-0, #16A34A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_1086">
            <path d="M0 0H12V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-0.5 w-3"
      data-name="svg"
    >
      <Frame22 />
    </div>
  );
}

function I2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-2 top-2.5 w-3"
      data-name="i"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Svg2 />
    </div>
  );
}

function Div56() {
  return (
    <div
      className="absolute bg-green-100 h-10 left-0 rounded-md top-0 w-7"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I2 />
    </div>
  );
}

function Div57() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[25px] top-[25px] w-[546px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div56 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-10 not-italic text-[20px] text-gray-800 text-left top-[3.8px] w-[81px]">
        <p className="block leading-[28px]">Pro Tips</p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_1089)">
            <path
              d={svgPaths.p921bd00}
              fill="var(--fill-0, #22C55E)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_1089">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame24() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-3.5"
      data-name="Frame"
    >
      <Frame23 />
    </div>
  );
}

function Li() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-0 top-0 w-[546px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame24 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[22px] not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[433px]">
        <p className="block leading-[24px]">
          Keep your wrists straight and directly above your elbows.
        </p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_1089)">
            <path
              d={svgPaths.p921bd00}
              fill="var(--fill-0, #22C55E)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_1089">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame26() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-3.5"
      data-name="Frame"
    >
      <Frame25 />
    </div>
  );
}

function Li1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-0 top-10 w-[546px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame26 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-12 leading-[0] left-[22px] not-italic text-[16px] text-gray-700 text-left top-[0.24px] w-[505px]">
        <p className="block leading-[24px]">
          Maintain a slight arch in your lower back, but keep your butt on the
          bench.
        </p>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_1089)">
            <path
              d={svgPaths.p921bd00}
              fill="var(--fill-0, #22C55E)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_1089">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame28() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-3.5"
      data-name="Frame"
    >
      <Frame27 />
    </div>
  );
}

function Li2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-0 top-[100px] w-[546px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame28 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[22px] not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[405px]">
        <p className="block leading-[24px]">
          Drive through your feet for stability and added power.
        </p>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_1089)">
            <path
              d={svgPaths.p921bd00}
              fill="var(--fill-0, #22C55E)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_1089">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame30() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-3.5"
      data-name="Frame"
    >
      <Frame29 />
    </div>
  );
}

function Li3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-0 top-[140px] w-[546px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame30 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-12 leading-[0] left-[22px] not-italic text-[16px] text-gray-700 text-left top-[0.24px] w-[495px]">
        <p className="block leading-[24px]">{`Keep your shoulder blades retracted and "tucked" throughout the movement.`}</p>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_1089)">
            <path
              d={svgPaths.p921bd00}
              fill="var(--fill-0, #22C55E)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_1089">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame32() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-3.5"
      data-name="Frame"
    >
      <Frame31 />
    </div>
  );
}

function Li4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-0 top-[200px] w-[546px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame32 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-12 leading-[0] left-[22px] not-italic text-[16px] text-gray-700 text-left top-[0.24px] w-[497px]">
        <p className="block leading-[24px]">
          Focus on pushing yourself away from the bar, rather than pushing the
          bar away from you.
        </p>
      </div>
    </div>
  );
}

function Ul() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[248px] left-[25px] top-[81px] w-[546px]"
      data-name="ul"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Li />
      <Li1 />
      <Li2 />
      <Li3 />
      <Li4 />
    </div>
  );
}

function Section3() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[354px] left-0 rounded-xl top-0 w-[596px]"
      data-name="section"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div57 />
      <Ul />
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
          <g clipPath="url(#clip0_3_1101)">
            <path
              d={svgPaths.p1b500f00}
              fill="var(--fill-0, #DC2626)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_1101">
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
      <Frame33 />
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

function Div58() {
  return (
    <div
      className="absolute bg-red-100 h-10 left-0 rounded-md top-0 w-8"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <I3 />
    </div>
  );
}

function Div59() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[25px] top-[25px] w-[546px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div58 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-11 not-italic text-[20px] text-gray-800 text-left top-[3.8px] w-[182px]">
        <p className="block leading-[28px]">Common Mistakes</p>
      </div>
    </div>
  );
}

function Frame34() {
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
            fill="var(--fill-0, #EF4444)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame35() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-3"
      data-name="Frame"
    >
      <Frame34 />
    </div>
  );
}

function Li5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-0 top-0 w-[546px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame35 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-5 not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[431px]">
        <p className="block leading-[24px]">
          Bouncing the bar off your chest, which can lead to injury.
        </p>
      </div>
    </div>
  );
}

function Frame36() {
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
            fill="var(--fill-0, #EF4444)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame37() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-3"
      data-name="Frame"
    >
      <Frame36 />
    </div>
  );
}

function Li6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-0 top-10 w-[546px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame37 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-5 not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[414px]">
        <p className="block leading-[24px]">
          Lifting your butt off the bench, which reduces stability.
        </p>
      </div>
    </div>
  );
}

function Frame38() {
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
            fill="var(--fill-0, #EF4444)"
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
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-3"
      data-name="Frame"
    >
      <Frame38 />
    </div>
  );
}

function Li7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-0 top-20 w-[546px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame39 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-5 not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[500px]">
        <p className="block leading-[24px]">
          Flaring your elbows out too wide, which can strain your shoulders.
        </p>
      </div>
    </div>
  );
}

function Frame40() {
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
            fill="var(--fill-0, #EF4444)"
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
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-3"
      data-name="Frame"
    >
      <Frame40 />
    </div>
  );
}

function Li8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-0 top-[120px] w-[546px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame41 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-5 not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[519px]">
        <p className="block leading-[24px]">
          Not lowering the bar to chest level, which reduces the effectiveness.
        </p>
      </div>
    </div>
  );
}

function Frame42() {
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
            fill="var(--fill-0, #EF4444)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame43() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 overflow-clip p-0 top-2 w-3"
      data-name="Frame"
    >
      <Frame42 />
    </div>
  );
}

function Li9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-7 left-0 top-40 w-[546px]"
      data-name="li"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame43 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-5 not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[387px]">
        <p className="block leading-[24px]">
          Using too much weight and sacrificing proper form.
        </p>
      </div>
    </div>
  );
}

function Ul1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[188px] left-[25px] top-[81px] w-[546px]"
      data-name="ul"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Li5 />
      <Li6 />
      <Li7 />
      <Li8 />
      <Li9 />
    </div>
  );
}

function Section4() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[354px] left-[620px] rounded-xl top-0 w-[596px]"
      data-name="section"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div59 />
      <Ul1 />
    </div>
  );
}

function Div60() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[354px] left-8 top-[1522px] w-[1216px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Section3 />
      <Section4 />
    </div>
  );
}

function Button8() {
  return (
    <div
      className="absolute bg-indigo-600 h-10 left-[982.078px] rounded-md top-0 w-[183.922px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-md" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[92.5px] not-italic text-[#ffffff] text-[16px] text-center top-[8.56px] translate-x-[-50%] w-[153px]">
        <p className="block leading-[normal]">Create New Routine</p>
      </div>
    </div>
  );
}

function Div61() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[25px] top-[25px] w-[1166px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-0 not-italic text-[20px] text-gray-800 text-left top-[3.8px] w-[145px]">
        <p className="block leading-[28px]">Add to Routine</p>
      </div>
      <Button8 />
    </div>
  );
}

function Input() {
  return (
    <div
      className="absolute bg-[#ffffff] left-[324px] rounded-[1px] size-5 top-0.5"
      data-name="input"
    >
      <div className="absolute border-[#000000] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[1px]" />
    </div>
  );
}

function Div62() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[17px] top-[17px] w-[344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-gray-800 text-left top-[-0.88px] w-[129px]">
        <p className="block leading-[24px]">Upper Body Split</p>
      </div>
      <Input />
    </div>
  );
}

function Div63() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[90px] left-0 rounded-lg top-0 w-[378px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div62 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[17px] not-italic text-[14px] text-gray-600 text-left top-[51.8px] w-[188px]">
        <p className="block leading-[20px]">Mon, Wed, Fri • 12 exercises</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div
      className="absolute bg-[#ffffff] left-[324px] rounded-[1px] size-5 top-0.5"
      data-name="input"
    >
      <div className="absolute border-[#000000] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[1px]" />
    </div>
  );
}

function Div64() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[17px] top-[17px] w-[344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-gray-800 text-left top-[-0.88px] w-[72px]">
        <p className="block leading-[24px]">Push Day</p>
      </div>
      <Input1 />
    </div>
  );
}

function Div65() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[90px] left-[394px] rounded-lg top-0 w-[378px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div64 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[17px] not-italic text-[14px] text-gray-600 text-left top-[51.8px] w-[145px]">
        <p className="block leading-[20px]">Tue, Sat • 8 exercises</p>
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <div className="h-3 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 12"
      >
        <g clipPath="url(#clip0_3_1080)" id="Frame">
          <path
            d={svgPaths.p258bd480}
            id="Vector"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.39076"
          />
        </g>
        <defs>
          <clipPath id="clip0_3_1080">
            <rect fill="white" height="12" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg4() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3 items-center justify-center left-[3.5px] p-0 top-1 w-3.5"
      data-name="svg"
    >
      <Frame44 />
    </div>
  );
}

function Input2() {
  return (
    <div
      className="absolute bg-[#0075ff] left-[324px] rounded-[1px] size-5 top-0.5"
      data-name="input"
    >
      <div className="absolute border-0 border-indigo-600 border-solid inset-0 pointer-events-none rounded-[1px]" />
      <Svg4 />
    </div>
  );
}

function Div66() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[17px] top-[17px] w-[344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-0 not-italic text-[16px] text-gray-800 text-left top-[-0.88px] w-24">
        <p className="block leading-[24px]">Chest Focus</p>
      </div>
      <Input2 />
    </div>
  );
}

function Div67() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[90px] left-[788px] rounded-lg top-0 w-[378px]"
      data-name="div"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <Div66 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[17px] not-italic text-[14px] text-gray-600 text-left top-[51.8px] w-[117px]">
        <p className="block leading-[20px]">Thu • 6 exercises</p>
      </div>
    </div>
  );
}

function Div68() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[90px] left-[25px] top-[89px] w-[1166px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div63 />
      <Div65 />
      <Div67 />
    </div>
  );
}

function Section5() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[204px] left-8 rounded-xl top-[1908px] w-[1216px]"
      data-name="section"
    >
      <div className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Div61 />
      <Div68 />
    </div>
  );
}

function Div69() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[2144px] left-20 top-[65px] w-[1280px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div4 />
      <Section />
      <Section1 />
      <Section2 />
      <Div60 />
      <Section5 />
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

function Div70() {
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

function Div71() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-[157.062px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div70 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-10 not-italic text-[20px] text-gray-800 text-left top-[0.08px] w-[118px]">
        <p className="block leading-[28px]">Peak Health</p>
      </div>
    </div>
  );
}

function Div72() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-4 w-[157.062px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div71 />
    </div>
  );
}

function Nav() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[354.438px] top-5 w-[486.344px]"
      data-name="nav"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-0 not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[83px]">
        <p className="block leading-[24px]">Dashboard</p>
      </div>
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[114.531px] not-italic text-[16px] text-indigo-600 text-left top-[-0.88px] w-[73px]">
        <p className="block leading-[24px]">Exercises</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[219.938px] not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[66px]">
        <p className="block leading-[24px]">Routines</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[317.391px] not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[69px]">
        <p className="block leading-[24px]">Calendar</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[417.531px] not-italic text-[16px] text-gray-700 text-left top-[-0.88px] w-[70px]">
        <p className="block leading-[24px]">Statistics</p>
      </div>
    </div>
  );
}

function Span15() {
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

function Frame47() {
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

function Frame48() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-5 items-center justify-center left-2 overflow-clip p-0 top-[11.5px] w-[17.5px]"
      data-name="Frame"
    >
      <Frame47 />
    </div>
  );
}

function Button9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-0 top-0 w-[33.5px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Span15 />
      <Frame48 />
    </div>
  );
}

function Img4() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat left-0 rounded-[9999px] size-8 top-0"
      data-name="img"
      style={{ backgroundImage: `url('${imgImg1}')` }}
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Div73() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-11 top-1 w-[84.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-800 text-left top-[1.8px] w-[84px]">
        <p className="block leading-[20px]">Alex Morgan</p>
      </div>
    </div>
  );
}

function Div74() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[49.5px] top-1.5 w-[128.344px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Img4 />
      <Div73 />
    </div>
  );
}

function Div75() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-[1038.16px] top-2.5 w-[177.844px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button9 />
      <Div74 />
    </div>
  );
}

function Div76() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-8 top-0 w-[1216px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div72 />
      <Nav />
      <Div75 />
    </div>
  );
}

function Div77() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-16 left-20 top-0 w-[1280px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div76 />
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
      <Div77 />
    </div>
  );
}

function Body() {
  return (
    <div
      className="bg-gray-50 h-[2209px] relative shrink-0 w-[1440px]"
      data-name="body"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Div69 />
      <Header />
    </div>
  );
}

export default function ExercisePage() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-lg size-full"
      data-name="Exercise page"
    >
      <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative size-full">
        <Body />
      </div>
      <div className="absolute border-2 border-[#ced4da] border-solid inset-0 pointer-events-none rounded-lg" />
    </div>
  );
}