import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  pick,
  types,
  isErrorWithCode,
  errorCodes,
} from '@react-native-documents/picker';

import { ICONS } from '@assets';
import { If } from '@components';
import { AppText } from '@ui';

import { DocumentPickerProps, PickedDocument } from './types';
import { styles } from './styles';

export const DocumentPicker = ({
  title = 'Upload Document',
  description,
  icon,
  titleIcon,
  iconSize = 28,
  titleIconSize = 20,
  onDocumentSelect,
  documentTypes = [types.pdf, types.doc],
  style,
}: DocumentPickerProps) => {
  const [selectedDocument, setSelectedDocument] =
    useState<PickedDocument | null>(null);

  const handlePickDocument = async () => {
    try {
      const [result] = await pick({
        type: documentTypes,
      });

      if (result) {
        const document: PickedDocument = {
          uri: result.uri,
          name: result.name ?? 'Document',
          type: result.type ?? undefined,
          size: result.size ?? undefined,
        };
        setSelectedDocument(document);
        onDocumentSelect?.(document);
      }
    } catch (err) {
      if (isErrorWithCode(err) && err.code !== errorCodes.OPERATION_CANCELED) {
        console.error('Document picker error:', err);
      }
    }
  };

  const handleRemoveDocument = () => {
    setSelectedDocument(null);
    onDocumentSelect?.(null);
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handlePickDocument}
        style={[styles.container, style]}
      >
        <View style={styles.textWrapper}>
          <AppText typography="bold_14" color="main">
            {selectedDocument ? selectedDocument.name : title}
          </AppText>

          <If condition={!!titleIcon && !selectedDocument}>
            <SvgXml
              xml={titleIcon!}
              width={titleIconSize}
              height={titleIconSize}
            />
          </If>

          <If condition={!!selectedDocument}>
            <TouchableOpacity
              onPress={handleRemoveDocument}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <SvgXml xml={ICONS.closeIcon('main')} width={16} height={16} />
            </TouchableOpacity>
          </If>
        </View>

        <If condition={!!icon}>
          <SvgXml xml={icon!} width={iconSize} height={iconSize} />
        </If>
      </TouchableOpacity>

      <If condition={!!description && !selectedDocument}>
        <AppText
          typography="medium_12"
          color="gray_primary"
          margin={{ top: 10 }}
        >
          {description}
        </AppText>
      </If>
    </View>
  );
};
