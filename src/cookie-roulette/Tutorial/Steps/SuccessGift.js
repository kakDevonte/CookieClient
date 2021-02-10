import React, {useEffect} from 'react';

function SuccessGift({tutorial, store}) {
  useEffect(() => {
    const from = store.user.data.sex === 1 ? '5' : '1';

    tutorial.closeShadowLayer();
    store.chat.sendLocalMessage(from, 'Привет! Спасибо за подарок, очень приятно :)', store.user.id);

    setTimeout(() => {
      tutorial.setStep('openTalk');
    }, 3000);
  }, []);

  return (
    <div />
  );
}

export default SuccessGift;