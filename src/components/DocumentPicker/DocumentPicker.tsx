import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  pick,
  types,
  isErrorWithCode,
  errorCodes,
} from '@react-native-documents/picker';
import RNFS from 'react-native-fs';

import { ICONS } from '@assets';
import { If } from '@components';
import { AppText } from '@ui';

import { DocumentPickerProps, PickedDocument } from './types';
import { styles } from './styles';

export const DocumentPicker = ({
  placeholder = 'Upload Document',
  description,
  icon,
  titleIcon,
  iconSize = 28,
  titleIconSize = 20,
  selectedDocumentName,
  documentTypes = [types.pdf, types.doc],
  style,
  onDocumentSelect,
  onDocumentRemove,
}: DocumentPickerProps) => {
  // const [selectedDocument, setSelectedDocument] =
  //   useState<PickedDocument | null>(null);

  const handlePickDocument = async () => {
    try {
      const [result] = await pick({
        type: documentTypes,
      });

      if (result) {
        const fileUri = result.uri;
        const mimeType = result.type ?? 'application/octet-stream';

        // Read file immediately while the temporary URI is still accessible.
        // On iOS, document picker URIs can become stale after some time,
        // so we persist the content as a data URI right away.
        const base64Content = await RNFS.readFile(fileUri, 'base64');
        const dataUri = `data:${mimeType};base64,${base64Content}`;

        const document: PickedDocument = {
          uri: dataUri,
          name: result.name ?? 'Document',
          type: mimeType,
          size: result.size ?? undefined,
        };
        onDocumentSelect?.(document);
      }
    } catch (err) {
      if (isErrorWithCode(err) && err.code !== errorCodes.OPERATION_CANCELED) {
        console.error('Document picker error:', err);
      }
    }
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handlePickDocument}
        style={[styles.container, style]}
      >
        <View style={styles.textWrapper}>
          <AppText
            renderIf={!!selectedDocumentName}
            typography="bold_14"
            color="main"
          >
            {selectedDocumentName}
          </AppText>

          <AppText
            renderIf={!selectedDocumentName && !!placeholder}
            typography="bold_14"
            color="main"
          >
            {placeholder}
          </AppText>

          <If condition={!!titleIcon && !selectedDocumentName}>
            <SvgXml
              xml={titleIcon!}
              width={titleIconSize}
              height={titleIconSize}
            />
          </If>
        </View>

        <If condition={!!selectedDocumentName}>
          <TouchableOpacity onPress={onDocumentRemove} hitSlop={10}>
            <SvgXml xml={ICONS.closeIcon('main')} width={16} height={16} />
          </TouchableOpacity>
        </If>

        <If condition={!!icon && !selectedDocumentName}>
          <SvgXml xml={icon!} width={iconSize} height={iconSize} />
        </If>
      </TouchableOpacity>

      <If condition={!!description && !selectedDocumentName}>
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
