'use server';

import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import type { FormState } from '@/app/utils/formSchema/hospital/reservationStatus';
import { FormSchema } from '@/app/utils/formSchema/hospital/reservationStatus';
import { ADMIN_HOSPIALS_DETAIL_PATH } from '@/utils/routes';
import { updateHospitalReservationStatus } from './form.api';

const UpdateHospitalReservationStatusForm = FormSchema.omit({});

export async function updateHospitalReservationStatusAction(
  _prevState: FormState,
  formData: FormData,
) {
  const validatedFields = UpdateHospitalReservationStatusForm.safeParse({
    hospitalId: formData.get('hospitalId'),
    required: formData.get('required'),
    reservable: formData.get('reservable'),
    remark: formData.get('remark'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        '予約形態の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { hospitalId, required, reservable, remark } = validatedFields.data;

  try {
    await updateHospitalReservationStatus({
      hospitalId,
      required,
      reservable,
      remark,
    });
  } catch {
    return {
      message:
        '予約形態の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  setFlashMessage({
    message: `予約形態を更新しました。`,
    type: 'notice',
  });
  redirect(ADMIN_HOSPIALS_DETAIL_PATH(hospitalId));
}
