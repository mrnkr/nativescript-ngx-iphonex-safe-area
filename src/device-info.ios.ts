declare const NSString: any;
declare const NSProcessInfo: any;
declare const UIDevice: any;
declare const UIInterfaceOrientation: any;

function iOSProperty(_this, property) {
  if (typeof property === 'function') {
    return property.call(_this);
  } else {
    return property;
  }
}

export function getModel(): string {
  const _SYS_NAMELEN = 256;
  const buffer = interop.alloc(5 * _SYS_NAMELEN);
  uname(buffer);

  let _machine = NSString.stringWithUTF8String(buffer.add(_SYS_NAMELEN * 4)).toString();

  // Get machine name for Simulator
  if (_machine === 'x86_64' || _machine === 'i386') {
      let env = iOSProperty(NSProcessInfo, NSProcessInfo.processInfo).environment;
      _machine = env.objectForKey('SIMULATOR_MODEL_IDENTIFIER');
  }

  return  _machine;
}

export function getDeviceName(): string {
  let name = getModel();

  switch (getModel()) {
    // region iPhone's
    case 'iPhone1,1':
      name = 'iPhone';
      break;
    case 'iPhone1,2':
      name = 'iPhone3G';
      break;
    case 'iPhone2,1':
      name = 'iPhone3GS';
      break;
    case 'iPhone3,1':
    case 'iPhone3,2':
    case 'iPhone3,3':
      name = 'iPhone4';
      break;
    case 'iPhone4,1':
      name = 'iPhone4S';
      break;
    case 'iPhone5,1':
    case 'iPhone5,2':
      name = 'iPhone5';
      break;
    case 'iPhone5,3':
    case 'iPhone5,4':
      name = 'iPhone5C';
      break;
    case 'iPhone6,1':
    case 'iPhone6,2':
      name = 'iPhone5S';
      break;
    case 'iPhone7,1':
      name = 'iPhone6Plus';
      break;
    case 'iPhone7,2':
      name = 'iPhone6';
      break;
    case 'iPhone8,1':
      name = 'iPhone6S';
      break;
    case 'iPhone8,2':
      name = 'iPhone6SPlus';
      break;
    case 'iPhone8,4':
      name = 'iPhoneSE';
      break;
    case 'iPhone9,1':
    case 'iPhone9,3':
      name = 'iPhone7';
      break;
    case 'iPhone9,2':
    case 'iPhone9,4':
      name = 'iPhone7Plus';
      break;
    case 'iPhone10,1':
    case 'iPhone10,4':
      name = 'iPhone8';
      break;
    case 'iPhone10,2':
    case 'iPhone10,5':
      name = 'iPhone8Plus';
      break;
    case 'iPhone10,3':
    case 'iPhone10,6':
      name = 'iPhoneX';
      break;
    // endregion iPhone

    /// region iPad's
    case 'iPad1,1':
      name = 'iPad';
      break;
    case 'iPad2,1':
    case 'iPad2,2':
    case 'iPad2,3':
    case 'iPad2,4':
      name = 'iPad 2';
      break;
    case 'iPad2,5':
    case 'iPad2,6':
    case 'iPad2,7':
      name = 'iPad Mini 1';
      break;
    case 'iPad3,1':
    case 'iPad3,2':
    case 'iPad3,3':
      name = 'iPad 3';
      break;
    case 'iPad3,4':
    case 'iPad3,5':
    case 'iPad3,6':
      name = 'iPad 4';
      break;
    case 'iPad4,1':
    case 'iPad4,2':
    case 'iPad4,3':
      name = 'iPad Air';
      break;
    case 'iPad5,3':
    case 'iPad5,4':
      name = 'iPad Air 2';
      break;
    case 'iPad4,4':
    case 'iPad4,5':
    case 'iPad4,6':
      name = 'iPad Mini 2';
      break;
    case 'iPad4,7':
    case 'iPad4,8':
    case 'iPad4,9':
      name = 'iPad Mini 3';
      break;
    case 'iPad5,1':
    case 'iPad5,2': 
      name = 'iPad Mini 4'; 
      break;
    case 'iPad6,3':
    case 'iPad6,4': 
      name = 'iPad 9.7 Pro'; 
      break;
    case 'iPad6,7':
    case 'iPad6,8': 
      name = 'iPad 12.9 Pro';
      break;
    case 'iPad7,1':
    case 'iPad7,2':
      name = 'iPad 12.9 Pro 2';
      break;

    case 'iPad7,3':
    case 'iPad7,4':
      name = 'iPad 10.5 Pro';
      break;

    case 'iPad6,11':
    case 'iPad6,12': 
      name = 'iPad 5'; 
      break;
    /// endregion iPad

    /// region iPod's
    case 'iPod1,1':
      name = 'iPod 1G';
      break;
    case 'iPod2,1':
      name = 'iPod 2G';
      break;
    case 'iPod3,1':
      name = 'iPod 3G';
      break;
    case 'iPod4,1':
      name = 'iPod 4G';
      break;
    case 'iPod5,1':
      name = 'iPod 5G';
      break;
    case 'iPod7,1':
      name = 'iPod 6G';
      break;
    // endregion
  }

  return name;
}

export function getScreenOrientation(): string {
  const orientation = iOSProperty(UIDevice, UIDevice.currentDevice).orientation;

  switch (orientation) {
    case UIInterfaceOrientation.Portrait:
    case UIInterfaceOrientation.PortraitUpsideDown:
      return 'portrait';
    case UIInterfaceOrientation.LandscapeLeft:
    case UIInterfaceOrientation.LandscapeRight:
      return 'landscape';
    default:
      return 'portrait';
  }
}
