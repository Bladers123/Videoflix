export const environment = {
  production: false,  // Produktion

  BASE_URL: 'https://videoflix-api.tristan-gehring.com/api/',

  ENDPOINT_REGISTRATION: 'auth/registration/',
  ENDPOINT_LOGIN: 'auth/login/',
  ENDPOINT_USER: 'auth/user/',
  ENDPOINT_RECOVERY_PASSWORD: 'auth/recovery-password/',
  ENDPOINT_VERIFY: 'auth/verify/',

  ENDPOINT_PROFILE: 'profile/profile-list/',
  ENDPOINT_SUBPROFILE: 'profile/sub-profile-list/',

  ENDPOINT_VIDEO_FAVOURITE_NAME: 'video/favourite-name/',
  ENDPOINT_VIDEONAME: 'video/videoname/',
  ENDPOINT_VIDEO: 'video/',
  ENDPOINT_VIDEO_LIST: 'videos/',


  QUERY_PARAM_PROFILE: '?profile=',
  QUERY_PARAM_ID: '?id=',
};
