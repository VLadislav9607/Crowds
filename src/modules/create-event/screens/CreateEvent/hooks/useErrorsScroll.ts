import { useFormErrorsScroll } from '@hooks';
import { useRef } from 'react';
import { FieldErrors } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { CreateEventFormData } from '../../../validation';

export const useErrorsScroll = () => {
  const ageGroupWidgetRefs = useRef<Map<number, React.RefObject<View | null>>>(
    new Map(),
  );

  const scrollViewRef = useRef<ScrollView | null>(null);
  const basicInfoSectionRef = useRef<View | null>(null);
  const dateTimeSectionRef = useRef<View | null>(null);
  const eventBriefSectionRef = useRef<View | null>(null);
  const visibilitySectionRef = useRef<View | null>(null);
  const agePeopleSectionRef = useRef<View | null>(null);
  const paymentSectionRef = useRef<View | null>(null);
  const otherInfoSectionRef = useRef<View | null>(null);

  const onScrollToAgeGroupsErrorSection = (
    errors: FieldErrors<CreateEventFormData>,
  ) => {
    const ageGroupErrors = errors.ageGroups;

    if (ageGroupErrors?.message || ageGroupErrors?.root?.message) {
      return agePeopleSectionRef;
    }

    if (Array.isArray(ageGroupErrors)) {
      for (let i = 0; i < ageGroupErrors.length; i++) {
        if (ageGroupErrors[i]) {
          const widgetRef = ageGroupWidgetRefs.current.get(i);
          if (widgetRef) {
            return widgetRef;
          }
        }
      }
    } else if (typeof ageGroupErrors === 'object' && ageGroupErrors !== null) {
      for (const key in ageGroupErrors) {
        const index = parseInt(key, 10);
        if (!isNaN(index) && ageGroupErrors[key]) {
          const widgetRef = ageGroupWidgetRefs.current.get(index);
          if (widgetRef) {
            return widgetRef;
          }
        }
      }
    }

    if (ageGroupErrors) {
      return agePeopleSectionRef;
    }

    return null;
  };

  const { onScrollToErrorSection } = useFormErrorsScroll<CreateEventFormData>({
    options: {
      title: basicInfoSectionRef,
      category: basicInfoSectionRef,
      location: basicInfoSectionRef,
      startAt: dateTimeSectionRef,
      endAt: dateTimeSectionRef,
      eventBrief: eventBriefSectionRef,
      visibility: visibilitySectionRef,
      ageGroups: onScrollToAgeGroupsErrorSection,
      paymentMode: paymentSectionRef,
      paymentAmount: paymentSectionRef,
      tags: basicInfoSectionRef,
      ndaDocument: otherInfoSectionRef,
    },
    scrollViewRef,
  });

  return {
    onScrollToErrorSection,
    scrollViewRef,
    ageGroupWidgetRefs,
    basicInfoSectionRef,
    dateTimeSectionRef,
    eventBriefSectionRef,
    visibilitySectionRef,
    agePeopleSectionRef,
    paymentSectionRef,
    otherInfoSectionRef,
  };
};
