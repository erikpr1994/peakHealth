import { useState } from 'react';

export function useTrainerAndClub() {
  const [hasTrainer, setHasTrainer] = useState(false);
  const [isClubMember, setIsClubMember] = useState(true);

  const handleToggleTrainer = () => {
    setHasTrainer(!hasTrainer);
  };

  const handleToggleClubMembership = () => {
    setIsClubMember(!isClubMember);
  };

  return {
    hasTrainer,
    isClubMember,
    handleToggleTrainer,
    handleToggleClubMembership
  };
}