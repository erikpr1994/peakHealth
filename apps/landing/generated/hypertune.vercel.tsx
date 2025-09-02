/* eslint-disable */

import { encryptFlagValues, decryptOverrides } from 'flags';
import { FlagValues } from 'flags/react';
import { cookies } from 'next/headers';
import { flag } from 'flags/next';
import {
  getOverrideFromOverridesList,
  DeepPartial,
  ObjectValue,
  Value,
} from 'hypertune';
import * as hypertuneTypes from './hypertune';
import getHypertune from '../src/lib/hypertune/getHypertune';

export async function getVercelOverride(): Promise<DeepPartial<hypertuneTypes.Source> | null> {
  const overridesCookieValue = (await cookies()).get(
    'vercel-flag-overrides'
  )?.value;

  if (!overridesCookieValue) {
    return null;
  }

  const decryptedOverrides = await decryptOverrides(overridesCookieValue);
  if (!decryptedOverrides) {
    return null;
  }

  return getOverrideFromOverridesList(
    Object.entries(decryptedOverrides) as [
      flagPath: string,
      value: Value | null,
    ][]
  );
}

export async function VercelFlagValues({
  flagValues,
}: {
  flagValues: hypertuneTypes.Root;
}): Promise<React.ReactElement> {
  const flattenedFlagValues = Object.fromEntries(
    getVercelFlagValuesEntries('', flagValues)
  );

  const encryptedFlagValues = await encryptFlagValues(flattenedFlagValues);
  return <FlagValues values={encryptedFlagValues} />;
}

function getVercelFlagValuesEntries(
  keyPrefix: string,
  sourceObject: ObjectValue
): [string, Value][] {
  return Object.entries(sourceObject).flatMap(([flagKey, flagValue]) => {
    if (flagKey.startsWith('__') || Array.isArray(flagValue)) {
      return [];
    }

    if (typeof flagValue !== 'object') {
      return [[`${keyPrefix}${flagKey}`, flagValue]];
    }
    return getVercelFlagValuesEntries(`${keyPrefix}${flagKey}.`, flagValue);
  });
}

export const routinesV2Flag = flag<boolean>({
  key: 'routinesV2',
  defaultValue: false,
  origin:
    'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3EroutinesV2',
  options: [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ],

  async decide(params) {
    const hypertune = await getHypertune(params);
    return hypertune.routinesV2({ fallback: false });
  },
});

export const trainerAndClubsFlag = flag<boolean>({
  key: 'trainerAndClubs',
  defaultValue: false,
  origin:
    'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3EtrainerAndClubs',
  options: [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ],

  async decide(params) {
    const hypertune = await getHypertune(params);
    return hypertune.trainerAndClubs({ fallback: false });
  },
});

export const suggestionsFlag = flag<boolean>({
  key: 'suggestions',
  defaultValue: false,
  origin:
    'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Esuggestions',
  options: [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ],

  async decide(params) {
    const hypertune = await getHypertune(params);
    return hypertune.suggestions({ fallback: false });
  },
});

export const performanceFlag = flag<boolean>({
  key: 'performance',
  defaultValue: false,
  origin:
    'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Eperformance',
  options: [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ],

  async decide(params) {
    const hypertune = await getHypertune(params);
    return hypertune.performance({ fallback: false });
  },
});

export const healthFlag = flag<boolean>({
  key: 'health',
  defaultValue: false,
  origin:
    'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Ehealth',
  options: [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ],

  async decide(params) {
    const hypertune = await getHypertune(params);
    return hypertune.health({ fallback: false });
  },
});

export const gymsFlag = flag<boolean>({
  key: 'gyms',
  defaultValue: false,
  origin:
    'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Egyms',
  options: [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ],

  async decide(params) {
    const hypertune = await getHypertune(params);
    return hypertune.gyms({ fallback: false });
  },
});

export const equipmentFlag = flag<boolean>({
  key: 'equipment',
  defaultValue: false,
  origin:
    'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Eequipment',
  options: [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ],

  async decide(params) {
    const hypertune = await getHypertune(params);
    return hypertune.equipment({ fallback: false });
  },
});

export const calendarFlag = flag<boolean>({
  key: 'calendar',
  defaultValue: false,
  origin:
    'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Ecalendar',
  options: [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ],

  async decide(params) {
    const hypertune = await getHypertune(params);
    return hypertune.calendar({ fallback: false });
  },
});

export const runningFlag = flag<boolean>({
  key: 'running',
  defaultValue: false,
  origin:
    'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Erunning',
  options: [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ],

  async decide(params) {
    const hypertune = await getHypertune(params);
    return hypertune.running({ fallback: false });
  },
});

export const roadmapFlag = flag<boolean>({
  key: 'roadmap',
  defaultValue: false,
  origin:
    'https://app.hypertune.com/projects/6203/main/draft/logic?selected_field_path=root%3Eroadmap',
  options: [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ],

  async decide(params) {
    const hypertune = await getHypertune(params);
    return hypertune.roadmap({ fallback: false });
  },
});
