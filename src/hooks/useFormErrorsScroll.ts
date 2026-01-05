import { ScrollView, View } from 'react-native';
import { FieldErrors, FieldValues } from 'react-hook-form';

type ErrorRef = React.RefObject<View | null> | null;

interface ICustomErrorHandler<T extends FieldValues> {
  (errors: FieldErrors<T>): ErrorRef | null;
}

type IErrorOptions<T extends FieldValues> = Partial<
  Record<keyof T, ErrorRef | ICustomErrorHandler<T>>
>;

interface IParams<T extends FieldValues> {
  options: IErrorOptions<T>;
  scrollViewRef: React.RefObject<ScrollView | null>;
}

export const useFormErrorsScroll = <T extends FieldValues>({
  options,
  scrollViewRef,
}: IParams<T>) => {
  const findFirstErrorSectionRef = (errors: FieldErrors<T>): ErrorRef => {
    for (const key in options) {
      const errorValue = errors[key as keyof T];
      if (!errorValue) continue;

      const option = options[key];

      // Якщо це функція-обробник, викликаємо її
      if (typeof option === 'function') {
        const result = option(errors);
        if (result) return result;
        continue;
      }

      // Якщо це простий ref, перевіряємо помилки
      if (option) {
        // Перевіряємо просту помилку
        if (
          errorValue &&
          typeof errorValue === 'object' &&
          'message' in errorValue
        ) {
          return option;
        }

        // Перевіряємо помилки масиву (ageGroups[0], ageGroups[1], тощо)
        if (Array.isArray(errorValue)) {
          for (let i = 0; i < errorValue.length; i++) {
            if (errorValue[i]) {
              return option; // Повертаємо базовий ref для масиву
            }
          }
        } else if (typeof errorValue === 'object' && errorValue !== null) {
          // Перевіряємо помилки як об'єкт з числовими ключами
          const errorObj = errorValue as Record<string, any>;
          for (const nestedKey in errorObj) {
            const index = parseInt(nestedKey, 10);
            if (!isNaN(index) && errorObj[nestedKey]) {
              return option; // Повертаємо базовий ref для масиву
            }
          }

          // Перевіряємо помилки на рівні масиву (message, root.message)
          if ('message' in errorObj || errorObj.root?.message) {
            return option;
          }
        }
      }
    }
    return null;
  };

  const scrollToErrorSection = (viewRef: React.RefObject<View | null>) => {
    if (!viewRef.current || !scrollViewRef.current) return;

    // Try measureLayout first (more accurate)
    try {
      viewRef.current.measureLayout(
        scrollViewRef.current as any,
        (_x, y) => {
          scrollViewRef.current?.scrollTo({
            y: Math.max(0, y - 20), // Add some offset from top, ensure non-negative
            animated: true,
          });
        },
        () => {
          // Fallback: use measureInWindow
          viewRef.current?.measureInWindow((_x, y, _width, _height) => {
            scrollViewRef.current?.scrollTo({
              y: Math.max(0, y - 100), // Account for header and offset
              animated: true,
            });
          });
        },
      );
    } catch {
      // Final fallback: use measureInWindow
      viewRef.current.measureInWindow((_x, y, _width, _height) => {
        scrollViewRef.current?.scrollTo({
          y: Math.max(0, y - 100),
          animated: true,
        });
      });
    }
  };

  const onScrollToErrorSection = (errors: FieldErrors<T>) => {
    const errorTarget = findFirstErrorSectionRef(errors);
    errorTarget && scrollToErrorSection(errorTarget);
  };

  return { onScrollToErrorSection };
};
