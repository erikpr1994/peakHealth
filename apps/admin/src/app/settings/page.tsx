export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <h1>System Settings</h1>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-muted-foreground">
          Configure system settings and platform preferences.
        </p>
      </div>
    </div>
  );
}
