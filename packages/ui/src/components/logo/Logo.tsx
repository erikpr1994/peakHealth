import React from 'react';
import { cn } from '../../utils';
import { LOGO_ICON_DATA } from './logo-assets';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  width = 200,
  height = 60,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1024 306.532"
      className={cn('peakhealth-logo', className)}
      xmlns="http://www.w3.org/2000/svg"
      data-testid="logo"
    >
      <g id="logo-group">
        <g id="logo-center" transform="translate(0 0)">
          <g
            id="title"
            style={{
              fontStyle: 'normal',
              fontWeight: 300,
              fontSize: '72px',
              lineHeight: 1,
              fontFamily: 'Montserrat Light Alt1',
              fontVariantLigatures: 'none',
              textAlign: 'center',
              textAnchor: 'middle',
            }}
            transform="translate(0 0)"
          >
            <path
              id="path437828"
              style={{
                fontStyle: 'normal',
                fontWeight: 300,
                fontSize: '72px',
                lineHeight: 1,
                fontFamily: 'Montserrat Light Alt1',
                fontVariantLigatures: 'none',
                textAlign: 'center',
                textAnchor: 'middle',
              }}
              d="m 297.11937,-45.864 c -3.59999,-3.024 -8.568,-4.536 -14.904,-4.536 h -18.072 v 3.312 h 18.072 c 5.328,0 9.432,1.224 12.312,3.6 2.808,2.376 4.248,5.76 4.248,10.08 0,4.392 -1.44,7.776 -4.248,10.08 -2.88,2.376 -6.984,3.528 -12.312,3.528 h -18.072 V 0 h 3.67201 v -16.488 h 14.39999 c 6.336,0 11.30401,-1.44 14.904,-4.464 3.60001,-3.024 5.40001,-7.128 5.40001,-12.456 0,-5.256 -1.8,-9.432 -5.40001,-12.456 z"
              strokeWidth="0"
              strokeLinejoin="miter"
              strokeMiterlimit="2"
              fill="#5282fc"
              stroke="#5282fc"
              transform="translate(0 306.532) translate(244.63113183664916 54.536) scale(0.91) translate(-264.14337 50.4)"
            />
            <path
              id="path437830"
              style={{
                fontStyle: 'normal',
                fontWeight: 300,
                fontSize: '72px',
                lineHeight: 1,
                fontFamily: 'Montserrat Light Alt1',
                fontVariantLigatures: 'none',
                textAlign: 'center',
                textAnchor: 'middle',
              }}
              d="m 347.525,-27.216 h -32.616 v 3.24 h 32.616 z m 0,-23.184 h -32.616 v 3.312 h 32.616 z M 314.909,-3.312 V 0 h 32.616 v -3.312 z"
              strokeWidth="0"
              strokeLinejoin="miter"
              strokeMiterlimit="2"
              fill="#5282fc"
              stroke="#5282fc"
              transform="translate(0 306.532) translate(299.92785513664916 54.536) scale(0.91) translate(-314.909 50.4)"
            />
            <path
              id="path437834"
              style={{
                fontStyle: 'normal',
                fontWeight: 300,
                fontSize: '72px',
                lineHeight: 1,
                fontFamily: 'Montserrat Light Alt1',
                fontVariantLigatures: 'none',
                textAlign: 'center',
                textAnchor: 'middle',
              }}
              d="M 428.885,-24.84 450.557,0 h 4.464 L 431.333,-27.504 453.509,-50.4 h -4.464 L 417.581,-18 v -32.4 h -3.672 V 0 h 3.672 v -13.248 z"
              strokeWidth="0"
              strokeLinejoin="miter"
              strokeMiterlimit="2"
              fill="#5282fc"
              stroke="#5282fc"
              transform="translate(0 306.532) translate(409.9862181633507 54.536) scale(0.91) translate(-413.909 50.4)"
            />
            <path
              id="path437836"
              style={{
                fontStyle: 'normal',
                fontWeight: 300,
                fontSize: '72px',
                lineHeight: 1,
                fontFamily: 'Montserrat Light Alt1',
                fontVariantLigatures: 'none',
                textAlign: 'center',
                textAnchor: 'middle',
              }}
              d="m 524.1365,-50.4 h -3.672 v 23.184 h -33.696 V -50.4 h -3.672 V 0 h 3.672 v -23.976 h 33.696 V 0 h 3.672 z"
              strokeWidth="0"
              strokeLinejoin="miter"
              strokeMiterlimit="2"
              fill="#5282fc"
              stroke="#5282fc"
              transform="translate(0 306.532) translate(482.0468431633507 54.536) scale(0.91) translate(-483.0965 50.4)"
            />
            <path
              id="path437838"
              style={{
                fontStyle: 'normal',
                fontWeight: 300,
                fontSize: '72px',
                lineHeight: 1,
                fontFamily: 'Montserrat Light Alt1',
                fontVariantLigatures: 'none',
                textAlign: 'center',
                textAnchor: 'middle',
              }}
              d="m 574.35312,-27.216 h -32.616 v 3.24 h 32.616 z m 0,-23.184 h -32.616 v 3.312 h 32.616 z m -32.616,47.088 V 0 h 32.616 v -3.312 z"
              strokeWidth="0"
              strokeLinejoin="miter"
              strokeMiterlimit="2"
              fill="#5282fc"
              stroke="#5282fc"
              transform="translate(0 306.532) translate(544.5098073633508 54.536) scale(0.91) translate(-541.73712 50.4)"
            />
            <path
              id="path437840"
              style={{
                fontStyle: 'normal',
                fontWeight: 300,
                fontSize: '72px',
                lineHeight: 1,
                fontFamily: 'Montserrat Light Alt1',
                fontVariantLigatures: 'none',
                textAlign: 'center',
                textAnchor: 'middle',
              }}
              d="m 608.4035,-50.4 h -3.672 L 581.5475,0 h 3.96 L 606.5315,-46.368 627.6275,0 h 3.96 z"
              strokeWidth="0"
              strokeLinejoin="miter"
              strokeMiterlimit="2"
              fill="#5282fc"
              stroke="#5282fc"
              transform="translate(0 306.532) translate(589.8372531633509 54.536) scale(0.91) translate(-581.5475 50.4)"
            />
            <path
              id="path437842"
              style={{
                fontStyle: 'normal',
                fontWeight: 300,
                fontSize: '72px',
                lineHeight: 1,
                fontFamily: 'Montserrat Light Alt1',
                fontVariantLigatures: 'none',
                textAlign: 'center',
                textAnchor: 'middle',
              }}
              d="M 640.73712,-50.4 V 0 h 32.688 V -3.312 H 644.40913 V -50.4 Z"
              strokeWidth="0"
              strokeLinejoin="miter"
              strokeMiterlimit="2"
              fill="#5282fc"
              stroke="#5282fc"
              transform="translate(0 306.532) translate(652.7998073633509 54.536) scale(0.91) translate(-640.73712 50.4)"
            />
            <path
              id="path437844"
              style={{
                fontStyle: 'normal',
                fontWeight: 300,
                fontSize: '72px',
                lineHeight: 1,
                fontFamily: 'Montserrat Light Alt1',
                fontVariantLigatures: 'none',
                textAlign: 'center',
                textAnchor: 'middle',
              }}
              d="M 687.932,-47.088 V 0 h 3.672 v -47.088 h 18.144 V -50.4 h -39.96 v 3.312 z"
              strokeWidth="0"
              strokeLinejoin="miter"
              strokeMiterlimit="2"
              fill="#5282fc"
              stroke="#5282fc"
              transform="translate(0 306.532) translate(688.3361081633509 54.536) scale(0.91) translate(-669.788 50.4)"
            />
            <path
              id="path437846"
              style={{
                fontStyle: 'normal',
                fontWeight: 300,
                fontSize: '72px',
                lineHeight: 1,
                fontFamily: 'Montserrat Light Alt1',
                fontVariantLigatures: 'none',
                textAlign: 'center',
                textAnchor: 'middle',
              }}
              d="m 759.824,-50.4 h -3.672 v 23.184 H 722.456 V -50.4 h -3.672 V 0 h 3.672 v -23.976 h 33.696 V 0 h 3.672 z"
              strokeWidth="0"
              strokeLinejoin="miter"
              strokeMiterlimit="2"
              fill="#5282fc"
              stroke="#5282fc"
              transform="translate(0 306.532) translate(742.0224681633508 54.536) scale(0.91) translate(-718.784 50.4)"
            />
          </g>
          <image
            xlinkHref={LOGO_ICON_DATA}
            id="icon"
            x="354"
            y="-51"
            width="52.774869109947645"
            height="52.774869109947645"
            transform="translate(0 306.532) translate(345.2553009366492 54.536) scale(0.91) translate(-354.71938 50.4)"
          />
        </g>
      </g>
    </svg>
  );
};
