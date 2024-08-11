// 'use client';

// import { profileSchema } from '@/validators/auth/profile.validator';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Controller, useForm } from 'react-hook-form';
// import { z } from 'zod';
// import Input from '../atoms/input';
// import InputContainer from '../atoms/InputContainer';
// import Label from '../atoms/label';
// import PasswordContainer from '../atoms/PasswordContainer';
// import PhoneForm from '../molecules/form/PhoneForm';
// import InputField from '../molecules/InputField';
// import ProfileChangeForm from './profileChangeForm';
// import SelectFormBox from './selectFormBox';

// const trackOptions = [
//   { value: 'track1', label: '트랙 1' },
//   { value: 'track2', label: '트랙 2' },
//   // 추가 옵션...
// ];

// const ProfileModal = ({ type, onClose, onSubmit }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<z.infer<typeof profileSchema>>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       originPassword: '',
//       newPassword: '',
//       passwordConfirm: '',
//       phone: '',
//       trackRole: '',
//       trackName: '',
//       period: '',
//     },
//   });
//   console.log('1');
//   const handleFormSubmit = async (data: z.infer<typeof profileSchema>) => {
//     console.log('Form submission triggered');
//     try {
//       console.log('Data:', data);
//       await onSubmit(type, data);
//       console.log('Submission successful');
//       onClose();
//     } catch (error) {
//       console.error('업데이트 오류:', error);
//     }
//   };
//   const renderContent = (type) => {
//     switch (type) {
//       case 'password':
//         return (
//           <ProfileChangeForm
//             label="비밀번호 변경하기"
//             onSubmit={handleSubmit(handleFormSubmit)}
//             onClose={onClose}
//           >
//             <section>
//               <InputContainer>
//                 <InputField>
//                   <Label htmlFor="originPassword">현재 비밀번호</Label>
//                   <Input
//                     {...register('originPassword')}
//                     placeholder="현재 비밀번호 입력"
//                     type="text"
//                     className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
//                   />
//                 </InputField>
//               </InputContainer>
//               {errors.originPassword?.message}
//             </section>
//             <section>
//               <PasswordContainer>
//                 <InputField variant="secondary">
//                   <Label htmlFor="newPassword">새 비밀번호</Label>
//                   <Input
//                     {...register('newPassword')}
//                     type="text"
//                     placeholder="6자 이상, 숫자와 영문자 조합"
//                     className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
//                   />
//                 </InputField>
//                 <div className="border" />
//                 <Input
//                   {...register('passwordConfirm')}
//                   type="text"
//                   placeholder="비밀번호 재입력"
//                   className="my-[28px] h-[20px] w-[320px] bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
//                 />
//               </PasswordContainer>
//               <span>{errors.passwordConfirm?.message}</span>
//             </section>
//           </ProfileChangeForm>
//         );
//       case 'phone':
//         return (
//           <ProfileChangeForm
//             label="휴대폰 변경"
//             onSubmit={handleSubmit(handleFormSubmit)}
//             onClose={onClose}
//           >
//             <p className="text-center">
//               휴대폰 번호 변경을 위해 인증이 필요해요
//             </p>
//             <PhoneForm register={register} />
//           </ProfileChangeForm>
//         );
//       case 'role':
//         return (
//           <ProfileChangeForm
//             label="권한 수정 요청 페이지 입니다."
//             onSubmit={handleSubmit(handleFormSubmit)}
//             onClose={onClose}
//           >
//             <Controller
//               name="trackName"
//               control={control}
//               render={({ field: { onChange, value } }) => (
//                 <SelectFormBox
//                   className="w-[360px]"
//                   options={trackOptions}
//                   label="트랙"
//                   onSelect={onChange}
//                   value={value || ''} // 기본 값 설정
//                 />
//               )}
//             />{' '}
//             <InputContainer>
//               <InputField>
//                 <Label htmlFor="period">기수</Label>
//                 <Input
//                   {...register('period')}
//                   placeholder="*1기라면 '1'만 작성해주세요"
//                   className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
//                 />
//               </InputField>
//             </InputContainer>
//           </ProfileChangeForm>
//         );
//       default:
//         return null;
//     }
//   };
//   return <div className="modal">{renderContent(type)}</div>;
// };

// export default ProfileModal;
