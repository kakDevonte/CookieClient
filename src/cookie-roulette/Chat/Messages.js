import React, {useRef} from 'react';
import {inject, observer} from "mobx-react";

import Message from "./Message";

function Messages({store, messages}) {
  const container = useRef();

  const content = () => {
    const m = [];

    messages.forEach((value, key) => {
      m.push(<Message message={value} key={key} container={container.current} />);
    });

    return m;
  };

  return (
    <section className="messages" ref={container}>
      { content() }
    </section>
  );
}

export default inject('store')( observer(Messages) );