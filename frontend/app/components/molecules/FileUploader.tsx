import { memo } from 'react';
import { FileUploader as ReactDragDropFileUploader } from 'react-drag-drop-files';
import { Typography } from '@/app/components/atoms/Typography';
import ImageSvg from '@/assets/image.svg';
import { Icon } from '@/app/components/atoms/Icon';
import type { FC } from 'react';
import { flex } from '@/styled/patterns';

type Props = {
  image: File | null;
  required: boolean;
  handleFileChange: (file: File) => void;
};

const FileUploader: FC<Props> = ({ image, required, handleFileChange }) => (
  <>
    <ReactDragDropFileUploader
      required={required}
      handleChange={handleFileChange}
      hoverTitle="ドロップしてください"
      types={['JPG', 'JPEG', 'PNG', 'GIF']}
      name="file"
    >
      <div
        className={flex({
          flexDirection: 'column',
          alignItems: 'center',
          borderColor: 'outline.main',
          borderWidth: 'thin',
          p: 'md',
          borderRadius: 'sm',
          _hover: {
            cursor: 'pointer',
            opacity: 0.8,
          },
        })}
      >
        <Icon
          source={<ImageSvg width="90" height="70" />}
          width="90px"
          height="70px"
        />
        <Typography variant="body1">
          ファイルを選択するかドロップしてください
        </Typography>
        <Typography variant="body2">フォーマットはJPG/JPEG/PNG/GIF</Typography>
      </div>
    </ReactDragDropFileUploader>
    <Typography variant="body1">
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
    </Typography>
  </>
);

const Memoed = memo(FileUploader);

export { Memoed as FileUploader };
