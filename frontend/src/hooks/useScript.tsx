import { useEffect } from 'react';

const useScript = (show: String) => {
  console.log('ran');
  useEffect(() => {
    const script = document.createElement('script');

    script.src = '//widget.mixcloud.com/media/js/footerWidgetApi.js';
    script.async = true;
    script.innerHTML = `{"feed": ${show}}`;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useScript;
