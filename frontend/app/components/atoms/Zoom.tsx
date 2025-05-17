import { memo } from 'react';
import MediumZoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import type { FC } from 'react';

const Zoom: FC<NoProps> = ({ children }) => <MediumZoom>{children}</MediumZoom>;

const Memoed = memo(Zoom);

export { Memoed as Zoom };
