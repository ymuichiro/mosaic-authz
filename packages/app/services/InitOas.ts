import { UserApi, Configuration as SystemRestConfiguration, ResponseError } from 'oas/types';

const oasConfig = new SystemRestConfiguration();
export const userApi = new UserApi(oasConfig);
export { ResponseError };
