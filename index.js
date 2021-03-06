/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-gtm',

  contentFor: function(type, config) {
    var config = config['ember-cli-gtm'];
    var appId = config && config.appId;
    var previewParam = (config && config.envId) ? `&gtm_preview=env-${config.envId}` : '';
    var authParam = (config && config.authId) ? `&gtm_auth=${config.authId}` : '';

    if (type === 'head' && appId) {
      return "\
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\
        'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '" + authParam + previewParam + "&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);\
        })(window,document,'script','dataLayer','" + appId + "');</script>"
    }

    if (type === 'body' && appId) {
      return "\
        <noscript><iframe src='https://www.googletagmanager.com/ns.html?id=" + appId + authParam + previewParam + "&gtm_cookies_win=x'\
        height='0' width='0' style='display:none;visibility:hidden'></iframe></noscript>"
    }
  }
};
