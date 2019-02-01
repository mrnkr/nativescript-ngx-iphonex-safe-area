declare const java: any;
declare const android: any;

function getContext() {
  let ctx = java.lang.Class.forName("android.app.AppGlobals").getMethod("getInitialApplication", null).invoke(null, null);
  if (ctx) { return ctx; }

  return java.lang.Class.forName("android.app.ActivityThread").getMethod("currentApplication", null).invoke(null, null);
}

export function getDeviceName(): string {
  const betterModel = android.provider.Settings.Secure.getString(getContext().getContentResolver(), "bluetooth_name");

  if (betterModel) {
    return betterModel.toString();
  } else {
    return getModel();
  }
}

export function getModel(): string {
  return android.os.Build.MODEL;
}

export function getScreenOrientation(): string {
  const context = getContext();
  const metrics = new android.util.DisplayMetrics();

  const orientation = context.getSystemService(android.content.Context.WINDOW_SERVICE).getDefaultDisplay().getOrientation();

  if (orientation % 2 === 0) {
    return 'portrait';
  }

  return 'landscape';
}
