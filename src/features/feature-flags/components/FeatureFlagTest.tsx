import React from "react";
import { useFeatureFlags } from "../contexts/FeatureFlagContext";
import { FeatureFlag } from "./FeatureFlag";
import { FEATURE_FLAGS, USER_TYPES, USER_GROUPS } from "../lib/config";

export function FeatureFlagTest() {
  const {
    flags,
    userTypes,
    userGroups,
    isLoading,
    isEnabled,
    hasUserType,
    isInGroup,
    refreshFlags,
  } = useFeatureFlags();

  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Feature Flag System</h2>
        <p>Loading feature flags...</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Feature Flag System Test</h2>
        <button
          onClick={refreshFlags}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      {/* Feature Flags Status */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Feature Flags Status:</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(flags).map(([name, flag]) => (
            <div
              key={name}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span className="font-mono">{name}</span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  flag.isEnabled
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {flag.isEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* User Types */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">User Types:</h3>
        <div className="flex flex-wrap gap-2">
          {userTypes.map((type) => (
            <span
              key={type.typeName}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
            >
              {type.displayName}
            </span>
          ))}
          {userTypes.length === 0 && (
            <span className="text-gray-500 text-sm">
              No user types assigned
            </span>
          )}
        </div>
      </div>

      {/* User Groups */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">User Groups:</h3>
        <div className="flex flex-wrap gap-2">
          {userGroups.map((group) => (
            <span
              key={group.groupName}
              className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm"
            >
              {group.displayName}
            </span>
          ))}
          {userGroups.length === 0 && (
            <span className="text-gray-500 text-sm">
              No user groups assigned
            </span>
          )}
        </div>
      </div>

      {/* Feature Flag Examples */}
      <div className="space-y-4">
        <h3 className="text-md font-medium">Feature Flag Examples:</h3>

        {/* Advanced Analytics Dashboard */}
        <FeatureFlag name={FEATURE_FLAGS.ADVANCED_ANALYTICS_DASHBOARD}>
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <h4 className="font-medium text-green-800">
              Advanced Analytics Dashboard
            </h4>
            <p className="text-sm text-green-700">
              This feature is enabled for you!
            </p>
          </div>
        </FeatureFlag>

        {/* Beta Features */}
        <FeatureFlag
          name={FEATURE_FLAGS.BETA_FEATURES}
          fallback={
            <div className="p-3 bg-gray-50 border border-gray-200 rounded">
              <h4 className="font-medium text-gray-800">Beta Features</h4>
              <p className="text-sm text-gray-600">
                This feature is not available for your account.
              </p>
            </div>
          }
        >
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            <h4 className="font-medium text-blue-800">Beta Features</h4>
            <p className="text-sm text-blue-700">
              You have access to beta features!
            </p>
          </div>
        </FeatureFlag>

        {/* Premium Workouts */}
        <FeatureFlag
          name={FEATURE_FLAGS.PREMIUM_WORKOUTS}
          fallback={
            <div className="p-3 bg-gray-50 border border-gray-200 rounded">
              <h4 className="font-medium text-gray-800">Premium Workouts</h4>
              <p className="text-sm text-gray-600">
                Upgrade to premium to access exclusive workouts.
              </p>
            </div>
          }
        >
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
            <h4 className="font-medium text-yellow-800">Premium Workouts</h4>
            <p className="text-sm text-yellow-700">
              Access to exclusive premium workout routines!
            </p>
          </div>
        </FeatureFlag>

        {/* Trainer Tools */}
        <FeatureFlag
          name={FEATURE_FLAGS.TRAINER_TOOLS}
          fallback={
            <div className="p-3 bg-gray-50 border border-gray-200 rounded">
              <h4 className="font-medium text-gray-800">Trainer Tools</h4>
              <p className="text-sm text-gray-600">
                This feature is only available for trainers and
                physiotherapists.
              </p>
            </div>
          }
        >
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded">
            <h4 className="font-medium text-indigo-800">Trainer Tools</h4>
            <p className="text-sm text-indigo-700">
              Access to advanced trainer tools and features!
            </p>
          </div>
        </FeatureFlag>

        {/* Notification System */}
        <FeatureFlag
          name={FEATURE_FLAGS.NOTIFICATION_SYSTEM_FEATURE}
          fallback={
            <div className="p-3 bg-gray-50 border border-gray-200 rounded">
              <h4 className="font-medium text-gray-800">Notification System</h4>
              <p className="text-sm text-gray-600">
                The notification system is currently disabled.
              </p>
            </div>
          }
        >
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
            <h4 className="font-medium text-emerald-800">
              Notification System
            </h4>
            <p className="text-sm text-emerald-700">
              Real-time notifications are enabled! 🔔
            </p>
          </div>
        </FeatureFlag>
      </div>

      {/* User Type Checks */}
      <div className="mt-6 p-3 bg-gray-50 rounded">
        <h3 className="text-md font-medium mb-2">User Type Checks:</h3>
        <div className="space-y-1 text-sm">
          <div>
            Is Trainer: {hasUserType(USER_TYPES.TRAINER) ? "Yes" : "No"}
          </div>
          <div>Is Physio: {hasUserType(USER_TYPES.PHYSIO) ? "Yes" : "No"}</div>
          <div>Is Admin: {hasUserType(USER_TYPES.ADMIN) ? "Yes" : "No"}</div>
          <div>
            Is Regular: {hasUserType(USER_TYPES.REGULAR) ? "Yes" : "No"}
          </div>
        </div>
      </div>

      {/* User Group Checks */}
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <h3 className="text-md font-medium mb-2">User Group Checks:</h3>
        <div className="space-y-1 text-sm">
          <div>Is Beta User: {isInGroup(USER_GROUPS.BETA) ? "Yes" : "No"}</div>
          <div>
            Is Premium User: {isInGroup(USER_GROUPS.PREMIUM) ? "Yes" : "No"}
          </div>
          <div>
            Has Early Access:{" "}
            {isInGroup(USER_GROUPS.EARLY_ACCESS) ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </div>
  );
}
