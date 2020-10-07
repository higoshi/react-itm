import * as React from 'react';

interface IMSyncCallbackData {
  imid: string;
  imid_created: string;
  segment_eids: string[],
  imuid?: string;
  meta?: any;
}

interface GTMData {
  imid: string,
  imid_created: string,
  segment_eids: string,
  imuid: string,
  meta: any,
}

interface Props {
  itmNamePrefix?: string;
  dataLayerPrefix?: string;
  token: string;
  cid: number;
  gid: string,
}

export const ITM: React.FC<Props> = props => {
  const {
    itmNamePrefix = '_itm_',
    dataLayerPrefix = 'itm_dl1_',
    token,
    cid,
    gid,
  } = props;

  React.useEffect(() => {
    let itmTag: HTMLScriptElement | null;
    let gtmTag: HTMLScriptElement | null;
    const dataLayerName = dataLayerPrefix + cid;
    const createScriptTag = (src: string) => {
      const scripTag = document.createElement('script');
      scripTag.src = src;
      scripTag.async = true;
      scripTag.type = 'text/javascript';
      const scriptTop = document.getElementsByTagName('script')[0];
      scriptTop.parentNode.insertBefore(scripTag, scriptTop);

      return scripTag;
    };

    const loadGtm = function(data: GTMData) {
      // @ts-ignore
      const gtmDataLayer: {[key: string]: any}[] = window[dl] = window[dl] || [];
      gtmDataLayer.push({
        "itm.auto_cid": cid,
        "itm.auto_im_api_token": token,
      });
      if (data) gtmDataLayer.push(data);
      gtmDataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });

      console.log(data);

      gtmTag = createScriptTag("//www.googletagmanager.com/gtm.js?id=" + gid + ((dataLayerName != "dataLayer") ? ("&l=" + dataLayerName) : ""));
    };

    const itmCallbackName = itmNamePrefix + '_c' + cid;
    const itmCallback = (callbackData: IMSyncCallbackData) => {
      const {
        imid,
        imid_created,
        imuid = '',
        meta = {}
      } = callbackData;
      const segment_eids = ',' + callbackData.segment_eids + ',';

      loadGtm({
        imid,
        imid_created,
        imuid,
        segment_eids,
        meta,
      })
    }
    // @ts-ignore
    window[itmCallbackName] = itmCallback;

    itmTag = document.createElement('script');
    itmTag.src = "//sync.im-apps.net/imid/segment?callback=" + itmCallbackName + "&token=" + token + "&need_created=True";

    return () => {
      // @ts-ignore
      if (window['itmCallbackName']) delete itmCallbackName;
      if (gtmTag?.parentElement) gtmTag?.parentElement?.removeChild(gtmTag);
      if (itmTag?.parentElement) itmTag?.parentElement?.removeChild(itmTag);
    }
  }, [location.href]);

  return <></>;
}
