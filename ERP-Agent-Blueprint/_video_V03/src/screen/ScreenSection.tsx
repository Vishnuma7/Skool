import React from 'react';
import {S1} from './S1';
import {S2} from './S2';
import {S3} from './S3';
import {S4} from './S4';
import {S5} from './S5';

export const ScreenSection: React.FC<{section: 1 | 2 | 3 | 4 | 5; starts: Record<string, number>}> = ({section, starts}) => {
  const S = {1: S1, 2: S2, 3: S3, 4: S4, 5: S5}[section];
  return <S starts={starts} />;
};
