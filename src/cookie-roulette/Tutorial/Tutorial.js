import './css/tutorial.css';

import React from 'react';
import {inject, observer} from "mobx-react";
import TutorialWindow from "./Window";

function Tutorial() {
  return (
    <section className="tutorial-screen sbg-bottle">
      <TutorialWindow />
    </section>
  );
}

export default inject('store')( observer(Tutorial) );