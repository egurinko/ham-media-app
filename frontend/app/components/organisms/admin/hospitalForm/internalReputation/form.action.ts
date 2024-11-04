'use server';

import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import type { FormState } from '@/app/utils/formSchema/hospital/internalReputation';
import { FormSchema } from '@/app/utils/formSchema/hospital/internalReputation';
import { ADMIN_HOSPIALS_DETAIL_PATH } from '@/utils/routes';
import { updateHospitalInternalReputation } from './form.api';

const UpdateHospitalInternalReputationForm = FormSchema.omit({});

export async function updateHospitalInternalReputationAction(
  _prevState: FormState,
  formData: FormData,
) {
  const validatedFields = UpdateHospitalInternalReputationForm.safeParse({
    hospitalId: formData.get('hospitalId'),
    star: formData.get('star'),
    remark: formData.get('remark'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        '内部評価の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { hospitalId, star, remark } = validatedFields.data;

  try {
    await updateHospitalInternalReputation({
      hospitalId,
      star,
      remark,
    });
  } catch {
    return {
      message:
        '内部評価の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  setFlashMessage({
    message: `内部評価を更新しました。`,
    type: 'notice',
  });
  redirect(ADMIN_HOSPIALS_DETAIL_PATH(hospitalId));
}
