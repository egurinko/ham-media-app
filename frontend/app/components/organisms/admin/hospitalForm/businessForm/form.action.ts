'use server';

import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import type { FormState } from '@/app/utils/formSchema/hospital/businessForm';
import { FormSchema } from '@/app/utils/formSchema/hospital/businessForm';
import { ADMIN_HOSPIALS_DETAIL_PATH } from '@/utils/routes';
import { updateHospitalBusinessForm } from './form.api';

const UpdateHospitalBusinessFormForm = FormSchema.omit({});

export async function updateHospitalBusinessFormAction(
  _prevState: FormState,
  formData: FormData,
) {
  const validatedFields = UpdateHospitalBusinessFormForm.safeParse({
    hospitalId: formData.get('hospitalId'),
    businessHour: formData.get('businessHour'),
    closedDay: formData.get('closedDay'),
    insuranceEnabled: formData.get('insuranceEnabled'),
    remark: formData.get('remark'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        '営業形態の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { hospitalId, businessHour, closedDay, insuranceEnabled, remark } =
    validatedFields.data;

  try {
    await updateHospitalBusinessForm({
      hospitalId,
      businessHour,
      closedDay,
      insuranceEnabled,
      remark,
    });
  } catch {
    return {
      message:
        '営業形態の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  setFlashMessage({
    message: `営業形態を更新しました。`,
    type: 'notice',
  });
  redirect(ADMIN_HOSPIALS_DETAIL_PATH(hospitalId));
}
