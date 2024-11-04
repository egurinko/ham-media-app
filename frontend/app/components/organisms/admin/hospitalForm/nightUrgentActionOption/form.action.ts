'use server';

import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import type { FormState } from '@/app/utils/formSchema/hospital/nightUrgentActionOption';
import { FormSchema } from '@/app/utils/formSchema/hospital/nightUrgentActionOption';
import { ADMIN_HOSPIALS_DETAIL_PATH } from '@/utils/routes';
import { updateHospitalNightUrgentActionOption } from './form.api';

const UpdateHospitalNightUrgentActionOptionForm = FormSchema.omit({});

export async function updateHospitalNightUrgentActionOptionAction(
  _prevState: FormState,
  formData: FormData,
) {
  const validatedFields = UpdateHospitalNightUrgentActionOptionForm.safeParse({
    hospitalId: formData.get('hospitalId'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        '緊急夜間営業の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { hospitalId, status } = validatedFields.data;

  try {
    await updateHospitalNightUrgentActionOption({
      hospitalId,
      status,
    });
  } catch {
    return {
      message:
        '緊急夜間営業の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  setFlashMessage({
    message: `緊急夜間営業を更新しました。`,
    type: 'notice',
  });
  redirect(ADMIN_HOSPIALS_DETAIL_PATH(hospitalId));
}
