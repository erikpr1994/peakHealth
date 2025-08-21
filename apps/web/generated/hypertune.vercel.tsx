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
import getHypertune from '@/lib/hypertune/getHypertune';

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
