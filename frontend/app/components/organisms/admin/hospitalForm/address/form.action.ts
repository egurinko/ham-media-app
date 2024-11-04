'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { setFlashMessage } from '@/app/utils/flashMessage';
import type { FormState } from '@/app/utils/formSchema/hospital/address';
import { FormSchema } from '@/app/utils/formSchema/hospital/address';
import { ADMIN_HOSPIALS_DETAIL_PATH } from '@/utils/routes';
import { updateHospitalAddress } from './form.api';

const UpdateHospitalAddressForm = FormSchema.omit({});

export async function updateHospitalAddressAction(
  _prevState: FormState,
  formData: FormData,
) {
  const validatedFields = UpdateHospitalAddressForm.safeParse({
    hospitalId: formData.get('hospitalId'),
    prefectureId: formData.get('prefectureId'),
    address: formData.get('address'),
    phoneNumber: formData.get('phoneNumber'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        '住所情報の更新に失敗しました。エラーメッセージを確認してください。',
    };
  }

  const { hospitalId, phoneNumber, prefectureId, address } =
    validatedFields.data;

  try {
    await updateHospitalAddress({
      hospitalId,
      address,
      phoneNumber,
      prefectureId,
    });
  } catch {
    return {
      message: '住所情報の更新に失敗しました。',
    };
  }

  const cookieStore = await cookies();
  setFlashMessage(cookieStore, {
    message: `住所情報を更新しました。`,
    type: 'notice',
  });
  redirect(ADMIN_HOSPIALS_DETAIL_PATH(hospitalId));
}
