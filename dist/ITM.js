import * as React from 'react';
export var ITM = function (props) {
    var _a = props.itmNamePrefix, itmNamePrefix = _a === void 0 ? '_itm_' : _a, _b = props.dataLayerPrefix, dataLayerPrefix = _b === void 0 ? 'itm_dl1_' : _b, token = props.token, cid = props.cid, gid = props.gid;
    React.useEffect(function () {
        var itmTag = null;
        var gtmTag = null;
        var dataLayerName = dataLayerPrefix + cid;
        var createScriptTag = function (src) {
            var scripTag = document.createElement('script');
            scripTag.src = src;
            scripTag.async = true;
            scripTag.type = 'text/javascript';
            var scriptTop = document.getElementsByTagName('script')[0];
            scriptTop.parentNode.insertBefore(scripTag, scriptTop);
            return scripTag;
        };
        var loadGtm = function (data) {
            // @ts-ignore
            var gtmDataLayer = window[dl] = window[dl] || [];
            gtmDataLayer.push({
                'itm.auto_cid': cid,
                'itm.auto_im_api_token': token,
            });
            if (data)
                gtmDataLayer.push(data);
            gtmDataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js',
            });
            gtmTag = createScriptTag('//www.googletagmanager.com/gtm.js?id=' + gid + ((dataLayerName != 'dataLayer') ? ('&l=' + dataLayerName) : ''));
        };
        var itmCallbackName = itmNamePrefix + '_c' + cid;
        var itmCallback = function (callbackData) {
            var imid = callbackData.imid, imid_created = callbackData.imid_created, _a = callbackData.imuid, imuid = _a === void 0 ? '' : _a, _b = callbackData.meta, meta = _b === void 0 ? {} : _b;
            var segment_eids = ',' + callbackData.segment_eids + ',';
            loadGtm({
                imid: imid,
                imid_created: imid_created,
                imuid: imuid,
                segment_eids: segment_eids,
                meta: meta,
            });
        };
        // @ts-ignore
        window[itmCallbackName] = itmCallback;
        itmTag = document.createElement('script');
        itmTag.src = '//sync.im-apps.net/imid/segment?callback=' + itmCallbackName + '&token=' + token + '&need_created=True';
        return function () {
            var _a, _b;
            // @ts-ignore
            if (window[itmCallbackName])
                delete window[itmCallbackName];
            if (gtmTag === null || gtmTag === void 0 ? void 0 : gtmTag.parentElement)
                (_a = gtmTag === null || gtmTag === void 0 ? void 0 : gtmTag.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(gtmTag);
            if (itmTag === null || itmTag === void 0 ? void 0 : itmTag.parentElement)
                (_b = itmTag === null || itmTag === void 0 ? void 0 : itmTag.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(itmTag);
        };
    }, [location.href]);
    return React.createElement(React.Fragment, null);
};
