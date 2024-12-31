'use client';

import { useState, useActionState } from 'react';
import { Alert } from '@/app/components/atoms/Alert';
import { Icon } from '@/app/components/atoms/Icon';
import { IconButton } from '@/app/components/atoms/IconButton';
import { Input } from '@/app/components/atoms/Input';
import { SubmitButton } from '@/app/components/atoms/SubmitButton';
import { Typography } from '@/app/components/atoms/Typography';
import { ErrorMessages } from '@/app/components/molecules/ErrorMessages';
import type { State } from '@/app/utils/formSchema/productTags';
import PlusIcon from '@/assets/plus.svg';
import XmarkIcon from '@/assets/trash.svg';
import { css } from '@/styled/css';
import { stack } from '@/styled/patterns';
import { createProductTagsAction } from './index.action';
import type { FC } from 'react';

type Props = {
  productTagGroupId: number;
};

export const ProductTagsNewForm: FC<Props> = ({ productTagGroupId }) => {
  const initialState: State = { message: '', errors: { _errors: [] } };
  const [state, dispatch] = useActionState(
    createProductTagsAction,
    initialState,
  );
  const [productTags, setProductTags] = useState([{ name: '' }]);

  const handleNameChange = (newName: string, newIndex: number) => {
    const newProductTags = productTags.map((productTag, index) => {
      if (newIndex !== index) return productTag;
      return { ...productTag, name: newName };
    });
    setProductTags(newProductTags);
  };

  const handleRemoveProductTag = (removingIndex: number) => {
    setProductTags((prev) =>
      prev.filter((_productTag, i) => i !== removingIndex),
    );
  };

  const handleAddProductTag = () => {
    setProductTags([...productTags, { name: '' }]);
  };

  return (
    <form
      className={css({
        display: 'flex',
        flexDir: 'column',
        width: '100%',
      })}
      action={dispatch}
    >
      {state.message && <Alert visual="error">{state.message}</Alert>}
      <input type="hidden" name="productTagGroupId" value={productTagGroupId} />
      <Typography variant="body1">タグ名</Typography>
      <div className={stack()}>
        {productTags.map((productTag, i) => (
          <div key={i}>
            <div
              className={css({
                display: 'flex',
                gap: 'sm',
              })}
            >
              <Input
                id={`productTags[${i}].name`}
                name={`productTags[${i}].name`}
                required={true}
                fullWidth
                value={productTag.name}
                onChange={(e) => handleNameChange(e.target.value, i)}
                aria-describedby={`productTags[${i}].name-error`}
              />
              <IconButton
                visual="tonal"
                size="md"
                m="auto"
                onClick={() => handleRemoveProductTag(i)}
              >
                <Icon source={<XmarkIcon />} width="20px" height="20px" />
              </IconButton>
            </div>
            <div
              id={`productTags[${i}].name-error`}
              aria-live="polite"
              aria-atomic="true"
            >
              {!!state.errors?.productTags &&
                state.errors.productTags[i]?.name?._errors && (
                  <ErrorMessages
                    messages={state.errors.productTags[i].name._errors}
                  />
                )}
            </div>
          </div>
        ))}
        <IconButton
          visual="tonal"
          size="sm"
          m="auto"
          onClick={handleAddProductTag}
        >
          <Icon source={<PlusIcon />} width="15px" height="15px" />
        </IconButton>
      </div>
      <SubmitButton text="タグ追加" />
    </form>
  );
};
