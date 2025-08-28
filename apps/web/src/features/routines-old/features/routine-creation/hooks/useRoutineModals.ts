import { useState, useCallback } from 'react';
import { ModalState, ModalType, ModalContext } from '../types/modal';

export const useRoutineModals = (): {
  modalState: ModalState;
  isModalOpen: (type: ModalType) => boolean;
  openModal: <T extends ModalType>(type: T, context: ModalContext[T]) => void;
  closeModal: () => void;
  getModalContext: <T extends ModalType>(type: T) => ModalContext[T] | null;
} => {
  const [modalState, setModalState] = useState<ModalState>({
    modal: null,
    context: null,
  });

  const isModalOpen = useCallback(
    (type: ModalType): boolean => {
      return modalState.modal === type;
    },
    [modalState.modal]
  );

  const openModal = useCallback(
    <T extends ModalType>(type: T, context: ModalContext[T]): void => {
      setModalState({
        modal: type,
        context,
      });
    },
    []
  );

  const closeModal = useCallback((): void => {
    setModalState({
      modal: null,
      context: null,
    });
  }, []);

  const getModalContext = useCallback(
    <T extends ModalType>(type: T): ModalContext[T] | null => {
      return modalState.modal === type
        ? (modalState.context as ModalContext[T])
        : null;
    },
    [modalState]
  );

  return {
    modalState,
    isModalOpen,
    openModal,
    closeModal,
    getModalContext,
  };
};
