'use client';

import { useParams, useRouter } from 'next/navigation';

import ExerciseDetail from '@/features/exercises/ExerciseDetail';
import { Modal } from '@peakhealth/ui';

const ExerciseVariantModalPage = (): React.ReactElement => {
  const { exerciseId, variantId } = useParams();
  const router = useRouter();

  const handleClose = (): void => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <ExerciseDetail
        exerciseId={exerciseId as string}
        variantId={variantId as string}
        showVariants={false}
      />
    </Modal>
  );
};

export default ExerciseVariantModalPage;
