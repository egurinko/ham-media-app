import { Box, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { FileUploader as ReactDragDropFileUploader } from 'react-drag-drop-files';
import { ImageIcon } from '@/components/atoms/assets/ImageIcon';
import type { FC } from 'react';

type Props = {
  image: File | null;
  handleFileChange: (file: File) => void;
};

const FileUploader: FC<Props> = ({ image, handleFileChange }) => (
  <>
    <ReactDragDropFileUploader
      handleChange={handleFileChange}
      hoverTitle="ドロップしてください"
      types={['JPG', 'JPEG', 'PNG', 'GIF']}
    >
      <Box
        sx={{
          borderColor: 'border.gray',
          borderStyle: 'solid',
          borderWidth: 1,
          borderRadius: 4,
          p: 4,
        }}
        _hover={{
          opacity: 0.7,
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.gray',
            p: 4,
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ImageIcon width={90} height={70} />
          <Text fontSize="xl">ファイルを選択するかドロップしてください</Text>
          <Text fontSize="md">フォーマットはJPG/JPEG/PNG/GIF</Text>
        </Box>
      </Box>
    </ReactDragDropFileUploader>
    <Text mt={2}>
      {image ? (
        <>
          ファイル名: {image.name}
          <img
            src={URL.createObjectURL(image)}
            alt="アップロードするファイル"
          />
        </>
      ) : (
        'ファイルは選択されていません'
      )}
    </Text>
  </>
);

const Memoed = memo(FileUploader);

export { Memoed as FileUploader };
