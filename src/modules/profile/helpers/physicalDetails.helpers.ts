import {
  hairColourOptions,
  eyeColourOptions,
  hairStyleOptions,
  facialAttributesOptions,
  bodyAttributesOptions,
  tattooSpotOptions,
  skinToneOptions,
} from '../constants/physicalDetails.constants';

export interface RawPhysicalDetail {
  label: string;
  value: string;
  color?: string;
}

export interface DisplayPhysicalDetail {
  label: string;
  value: string;
  color?: string;
}

type OptionWithLabel = { label: string; value: string };
type SkinToneOption = OptionWithLabel & { hex: string };

const LABEL_TO_OPTIONS: Record<string, OptionWithLabel[]> = {
  Hair: hairColourOptions,
  Eyes: eyeColourOptions,
  Hairstyle: hairStyleOptions,
  'Skin Colour': skinToneOptions as OptionWithLabel[],
  'Facial Attributes': facialAttributesOptions,
  'Body Attributes': bodyAttributesOptions,
  Tattoos: tattooSpotOptions,
};

const RAW_LABELS_PASSTHROUGH = ['Height', 'Build', 'Pregnancy'];

function getDisplayLabelForValue(
  options: OptionWithLabel[],
  rawValue: string,
): string {
  const normalized = rawValue.trim().toLowerCase();
  const option = options.find(
    opt => String(opt.value).toLowerCase() === normalized,
  );
  return option?.label ?? rawValue;
}

function getDisplayForMultiValue(
  options: OptionWithLabel[],
  rawValue: string,
): string {
  return rawValue
    .split(',')
    .map(part => getDisplayLabelForValue(options, part.trim()))
    .join(', ');
}

export function formatPhysicalDetailForDisplay(
  raw: RawPhysicalDetail,
): DisplayPhysicalDetail {
  const { label, value } = raw;

  if (RAW_LABELS_PASSTHROUGH.includes(label) || !value) {
    const passValue = value || raw.value;
    if (label === 'Height' || label === 'Build') {
      const num = Number(passValue);
      const formatted =
        !Number.isNaN(num) && Number.isFinite(num)
          ? num % 1 === 0
            ? String(num)
            : String(Number(passValue).toFixed(1))
          : passValue;
      return { ...raw, value: formatted };
    }
    return { ...raw, value: passValue };
  }

  if (label === 'Skin Colour') {
    const skinOpts = skinToneOptions as SkinToneOption[];
    const normalized = value.trim().toLowerCase();
    const option = skinOpts.find(
      opt => String(opt.value).toLowerCase() === normalized,
    );
    return {
      label,
      value: option?.label ?? value,
      color: option?.hex,
    };
  }

  const options = LABEL_TO_OPTIONS[label];
  if (!options) {
    return { ...raw };
  }

  const hasMultiple = value.includes(',');
  const displayValue = hasMultiple
    ? getDisplayForMultiValue(options, value)
    : getDisplayLabelForValue(options, value);

  return {
    label,
    value: displayValue,
  };
}

export function formatPhysicalDetailsForDisplay(
  rawDetails: RawPhysicalDetail[],
): DisplayPhysicalDetail[] {
  return rawDetails.map(formatPhysicalDetailForDisplay);
}
