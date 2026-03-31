import { useEffect, useState } from 'react';

export interface FeeBreakdown {
  theoryOnly: number;
  practical: number;
  both: number;
}

export type FeeStructure = Record<string, FeeBreakdown>;

const FEES_STORAGE_KEY = 'lashawnFees';
const FEES_UPDATED_EVENT = 'lashawn-fees-updated';

const createDrivingFee = (both: number): FeeBreakdown => ({
  theoryOnly: Math.round(both * 0.4),
  practical: Math.round(both * 0.7),
  both
});

export const DEFAULT_FEES: FeeStructure = {
  A1: createDrivingFee(10000),
  A2: createDrivingFee(12000),
  A3: createDrivingFee(10000),
  B1: createDrivingFee(16000),
  B2: createDrivingFee(16000),
  B3: createDrivingFee(20000),
  C: createDrivingFee(19000),
  C1: createDrivingFee(22000),
  CE: createDrivingFee(26000),
  D1: createDrivingFee(24000),
  D2: createDrivingFee(28000),
  D3: createDrivingFee(32000),
  E: createDrivingFee(35000),
  F: createDrivingFee(18000),
  G1: createDrivingFee(12000),
  G2: createDrivingFee(14000),
  G3: createDrivingFee(15000),
  G4: createDrivingFee(16000),
  G5: createDrivingFee(14000),
  G6: createDrivingFee(13000),
  G7: createDrivingFee(13000),
  G8: createDrivingFee(14000),
  G9: createDrivingFee(15000),
  G10: createDrivingFee(16000),
  G11: createDrivingFee(14000),
  G12: createDrivingFee(15000),
  'Microsoft Office Suite': {
    theoryOnly: 0,
    practical: 0,
    both: 8000
  },
  'Basic IT & Networking': {
    theoryOnly: 0,
    practical: 0,
    both: 10000
  },
  'First Aid Training': {
    theoryOnly: 0,
    practical: 0,
    both: 5000
  },
  'Basic Mechanics': {
    theoryOnly: 0,
    practical: 0,
    both: 7000
  },
  'KRA PIN Registration': {
    theoryOnly: 0,
    practical: 0,
    both: 500
  },
  'HELB Application Assistance': {
    theoryOnly: 0,
    practical: 0,
    both: 800
  },
  'eCitizen Service Support': {
    theoryOnly: 0,
    practical: 0,
    both: 500
  },
  'Driving License Renewal': {
    theoryOnly: 0,
    practical: 0,
    both: 1000
  }
};

function hasWindow() {
  return typeof window !== 'undefined';
}

function normalizeFeeValue(value: Partial<FeeBreakdown> | undefined, fallback: FeeBreakdown): FeeBreakdown {
  const theoryOnly = Number(value?.theoryOnly);
  const practical = Number(value?.practical);
  const both = Number(value?.both);

  return {
    theoryOnly: Number.isFinite(theoryOnly) ? theoryOnly : fallback.theoryOnly,
    practical: Number.isFinite(practical) ? practical : fallback.practical,
    both: Number.isFinite(both) ? both : fallback.both
  };
}

function mergeWithDefaults(raw: unknown): FeeStructure {
  const parsed = raw && typeof raw === 'object' ? (raw as Record<string, Partial<FeeBreakdown>>) : {};

  return Object.fromEntries(
    Object.entries(DEFAULT_FEES).map(([key, defaultValue]) => [
      key,
      normalizeFeeValue(parsed[key], defaultValue)
    ])
  );
}

export function getStoredFees(): FeeStructure {
  if (!hasWindow()) {
    return DEFAULT_FEES;
  }

  const raw = window.localStorage.getItem(FEES_STORAGE_KEY);
  if (!raw) {
    return DEFAULT_FEES;
  }

  try {
    return mergeWithDefaults(JSON.parse(raw));
  } catch {
    return DEFAULT_FEES;
  }
}

export function saveFees(fees: FeeStructure) {
  if (!hasWindow()) {
    return;
  }

  const normalizedFees = mergeWithDefaults(fees);
  window.localStorage.setItem(FEES_STORAGE_KEY, JSON.stringify(normalizedFees));
  window.dispatchEvent(new CustomEvent(FEES_UPDATED_EVENT, { detail: normalizedFees }));
}

export function useFeeStructure() {
  const [fees, setFees] = useState<FeeStructure>(() => getStoredFees());

  useEffect(() => {
    const syncFees = () => {
      setFees(getStoredFees());
    };

    window.addEventListener('storage', syncFees);
    window.addEventListener(FEES_UPDATED_EVENT, syncFees);

    return () => {
      window.removeEventListener('storage', syncFees);
      window.removeEventListener(FEES_UPDATED_EVENT, syncFees);
    };
  }, []);

  return fees;
}
