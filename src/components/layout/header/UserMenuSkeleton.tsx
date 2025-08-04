import React from 'react';

const UserMenuSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-24 rounded-md bg-gray-300 animate-pulse" />
      <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse" />
    </div>
  );
};

export default UserMenuSkeleton;
