'use client';

import { createListCollection } from '@ark-ui/react';
import { useState, useActionState } from 'react';
import { Select } from '@/app/components/atoms';
import { Alert } from '@/app/components/atoms/Alert';
import { Icon } from '@/app/components/atoms/Icon';
import { Input } from '@/app/components/atoms/Input';
import { InputLabel } from '@/app/components/atoms/InputLabel';
import { SubmitButton } from '@/app/components/atoms/SubmitButton';
import { Tag } from '@/app/components/atoms/Tag';
import { Textarea } from '@/app/components/atoms/Textarea';
import { Typography } from '@/app/components/atoms/Typography';
import { ErrorMessages } from '@/app/components/molecules/ErrorMessages';
import { FileUploader } from '@/app/components/molecules/FileUploader';
import type { State } from '@/app/utils/formSchema/product';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { Zoom } from '@/app/components/atoms/Zoom';
import { css } from '@/styled/css';
import { stack } from '@/styled/patterns';
import type { FC } from 'react';

type Props = {
  handleSubmit: (prevState: State, formData: FormData) => Promise<State>;
  initialProduct: {
    id?: string;
    name: string;
    remark: string;
    url: string;
    makerId: string;
    productTagIds: string[];
  };
  submitLabel: string;
  makers: { value: string; label: string }[];
  productTags: { value: string; label: string }[];
};

export const ProductForm: FC<Props> = ({
  handleSubmit,
  initialProduct,
  submitLabel,
  makers,
  productTags,
}) => {
  const initialState: State = { message: '', errors: {} };
  const [state, dispatch] = useActionState(handleSubmit, initialState);
  const [name, setName] = useState(initialProduct.name);
  const [remark, setRemark] = useState(initialProduct.remark);
  const [image, setImage] = useState<File | null>(null);
  const [makerIds, setMakerIds] = useState([initialProduct.makerId]);
  const [productTagIds, setProductTagIds] = useState(
    initialProduct.productTagIds,
  );

  return (
    <form
      className={css({
        display: 'flex',
        flexDir: 'column',
        gap: 'lg',
        width: '100%',
      })}
      action={dispatch}
    >
      {state.message && <Alert visual="error">{state.message}</Alert>}
      <input type="hidden" name="id" value={initialProduct.id} />
      <input type="hidden" name="makerId" value={makerIds[0]} />
      <Select.Root
        positioning={{ sameWidth: true }}
        collection={createListCollection({ items: makers })}
        onValueChange={(details) => setMakerIds(details.value)}
        value={makerIds}
        name="makerId"
        className={css({ w: { base: '45%', sm: '200px' } })}
        required
      >
        <Select.Label>
          メーカー<Tag>必須</Tag>
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder=""></Select.ValueText>
            <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {makers.map((maker) => (
              <Select.Item key={maker.value} item={maker}>
                <Select.ItemText>{maker.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <Icon source={<CheckIcon />} width={15} height={15} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      <div className={stack()}>
        <InputLabel htmlFor="name">
          商品名 <Tag>必須</Tag>
        </InputLabel>
        <Input
          id="name"
          name="name"
          required={true}
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby="name-error"
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name && <ErrorMessages messages={state.errors.name} />}
        </div>
      </div>
      <div className={stack()}>
        <InputLabel htmlFor="remark">備考</InputLabel>
        <Textarea
          id="remark"
          name="remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          aria-describedby="remark-error"
        />
        <div id="remark-error" aria-live="polite" aria-atomic="true">
          {state.errors?.remark && (
            <ErrorMessages messages={state.errors.remark} />
          )}
        </div>
      </div>
      <div className={stack()}>
        <InputLabel htmlFor="file">
          商品画像 {!!initialProduct.id ? null : <Tag>必須</Tag>}
        </InputLabel>
        <FileUploader
          handleFileChange={(file) => setImage(file)}
          image={image}
          required={!!initialProduct.id ? false : true}
        />
        <div id="file-error" aria-live="polite" aria-atomic="true">
          {state.errors?.file && <ErrorMessages messages={state.errors.file} />}
        </div>
        {initialProduct.url !== '' && (
          <>
            <Typography variant="body1">元画像</Typography>
            <Zoom>
              <img
                src={initialProduct.url}
                alt={initialProduct.name}
                width="80"
                height="80"
                style={{
                  objectFit: 'contain',
                  width: '80px',
                  height: '80px',
                }}
              />
            </Zoom>
          </>
        )}
      </div>
      {productTagIds.map((id) => (
        <input
          key={id}
          type="hidden"
          name={`productTagIds[${id}]`}
          value={id}
        />
      ))}
      <Select.Root
        positioning={{ sameWidth: true }}
        collection={createListCollection({ items: productTags })}
        onValueChange={(details) => setProductTagIds(details.value)}
        value={productTagIds}
        name="productTagIds[i]"
        className={css({ w: { base: '45%', sm: '200px' } })}
        multiple
        required
      >
        <Select.Label>
          タグ<Tag>必須</Tag>
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder=""></Select.ValueText>
            <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {productTags.map((productTag) => (
              <Select.Item key={productTag.value} item={productTag}>
                <Select.ItemText>{productTag.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <Icon source={<CheckIcon />} width={15} height={15} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      <SubmitButton text={submitLabel} />
    </form>
  );
};
