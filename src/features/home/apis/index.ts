import moment from 'moment';
import { ROOT_URL, LOGIN, APP_NAME, APP_TYPE, APP_VERSION, DEVICE_TYPE } from '../../../constants/endpoint_constant';
// @ts-ignore
import sha1 from 'sha1';
import { getBrowserId } from '../../../utils/helpers';
import HttpRequest from '../../../utils/http-request';

export const loginDirect = async ({ email, password }: { email: string, password: string }) => {
    const browserId = await getBrowserId();
    const isPWA = window.matchMedia("(display-mode: standalone)").matches;

    const params = {
        device_id: browserId,
        os_version: "18.5",
        device_type: DEVICE_TYPE,
        use_fcm: true,
        gps_adid: '',
        device_name: "iOS 18.5 - Safari",
        adid: '',
        application: APP_NAME,
        applicaton_type: APP_TYPE,
        login_time: moment().utc().format('YYYYMMDDHHmmss'),
        notify_token: '',
        api: LOGIN,
        application_version: APP_VERSION,
        idfa: '',
        is_pwa: isPWA,
        email: email,
        pwd: sha1(password),
    };

    try {
        const response = await HttpRequest.post(ROOT_URL, params);
        if ((response as any).code === 0) {
            return response.data;
        } else {
            throw new Error(`Login failed: ${response.data.message}`);
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const fetchAllGift = async ({ req_user_id, token }: { req_user_id: string, token: string }) => {
    const params = {
        api: "get_all_gift",
        language: "en",
        req_user_id,
        token
    }
    try {
        const response = await HttpRequest.post(ROOT_URL, params);
        if ((response as any).code === 0) {
            console.log("responde fetch all gift :", response);
            return response.data;
        } else {
            throw new Error(`Login failed: ${response.data.message}`);
        }
    } catch (error) {
        throw error;
    }


}

