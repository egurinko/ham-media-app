'use server';

import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import type { FormState } from '@/app/utils/formSchema/hospital/nightServiceOption';
import { FormSchema } from '@/app/utils/formSchema/hospital/nightServiceOption';
import { ADMIN_HOSPIALS_DETAIL_PATH } from '@/utils/routes';
import { updateHospitalNightServiceOption } from './form.api';

const UpdateHospitalNightServiceOptionForm = FormSchema.omit({});

export async function updateHospitalNightServiceOptionAction(
  _prevState: FormState,
  formData: FormData,
) {
  const validatedFields = UpdateHospitalNightServiceOptionForm.safeParse({
    hospitalId: formData.get('hospitalId'),
    status: formData.get('status'),
    remark: formData.get('remark'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        '夜間営業の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { hospitalId, status, remark } = validatedFields.data;

  try {
    await updateHospitalNightServiceOption({
      hospitalId,
      status,
      remark,
    });
  } catch {
    return {
      message:
        '夜間営業の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  setFlashMessage({
    message: `夜間営業を更新しました。`,
    type: 'notice',
  });
  redirect(ADMIN_HOSPIALS_DETAIL_PATH(hospitalId));
}
