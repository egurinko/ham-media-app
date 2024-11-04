'use server';

import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import type { FormState } from '@/app/utils/formSchema/hospital/certificationOption';
import { FormSchema } from '@/app/utils/formSchema/hospital/certificationOption';
import { ADMIN_HOSPIALS_DETAIL_PATH } from '@/utils/routes';
import { updateHospitalCertificationOption } from './form.api';

const UpdateHospitalCertificationOptionForm = FormSchema.omit({});

export async function updateHospitalCertificationOptionAction(
  _prevState: FormState,
  formData: FormData,
) {
  const validatedFields = UpdateHospitalCertificationOptionForm.safeParse({
    hospitalId: formData.get('hospitalId'),
    nichijuRegistered: formData.get('nichijuRegistered'),
    jsavaRegistered: formData.get('jsavaRegistered'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '認定の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { hospitalId, nichijuRegistered, jsavaRegistered } =
    validatedFields.data;

  try {
    await updateHospitalCertificationOption({
      hospitalId,
      nichijuRegistered,
      jsavaRegistered,
    });
  } catch {
    return {
      message: '認定の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  setFlashMessage({
    message: `認定を更新しました。`,
    type: 'notice',
  });
  redirect(ADMIN_HOSPIALS_DETAIL_PATH(hospitalId));
}
