
import FingerprintJS from '@fingerprintjs/fingerprintjs';


export const getBrowserId = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId || '';
};

// export const getDeviceName = () => `${plate.os} - ${plate.name}`;
// export const getBrowserVersion = () => plate.version;